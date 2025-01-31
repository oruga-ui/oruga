import path from "path";
import * as fs from "fs";
import { type SafeDocgenCLIConfig } from "vue-docgen-cli/lib/config";
import { getThemePath, Themes, type ThemeConfig } from "../themes-helper";

export const docsRegex = "/* @docs */";

export function getVariablesFromContent(content: string) {
    const docs = content.substring(
        content.indexOf(docsRegex) + docsRegex.length,
        content.lastIndexOf(docsRegex),
    );

    return docs
        .replace(/(\r\n|\n|\r)/gm, "")
        .split(";")
        .filter((d) => !!d);
}

export function renderer(config: SafeDocgenCLIConfig, name: string): string {
    const renderThemeVariables = (theme: ThemeConfig): string => {
        const noStyle = `<p>The theme does not have any custom variables for this component.</p>`;
        const componentPath = getThemePath(
            theme,
            config.cwd,
            `/scss/components/${name}`,
        );
        const componentDefaultsPath = getThemePath(
            theme,
            config.cwd,
            `/scss/component-defaults/${name}`,
        );

        if (!componentPath && !componentDefaultsPath) return noStyle;

        let cssContent = "";
        let defaultsContent = "";

        try {
            const cssFile = path.resolve(config.cwd, componentPath);
            cssContent = fs.readFileSync(cssFile, "utf8");
        } catch (e) {
            // Log errors but allow the process to continue. We expect every component to have a scss file, but docs should render even if none is found
            console.error(e);
        }

        try {
            const defaultsFile = path.resolve(
                config.cwd,
                componentDefaultsPath,
            );
            defaultsContent = fs.readFileSync(defaultsFile, "utf8");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            // Swallow error and move on. We expect some components will not have defaults.
        }

        if (
            !cssContent.includes(docsRegex) &&
            !defaultsContent.includes(docsRegex)
        )
            return noStyle;

        const variables = [
            ...getVariablesFromContent(cssContent),
            ...getVariablesFromContent(defaultsContent),
        ];

        return `
| SASS Variable  | Default |
| -------------- | ------- |
${variables
    .filter((variable) => variable.indexOf("@deprecated") < 0)
    .map((variable) => {
        const keyValue = variable.split(":");
        const varName = keyValue[0].trim();
        const varValue = keyValue[1].replace("!default", "").trim();
        return `| ${varName} | ${varValue} |`;
    })
    .join("\n")}


See ➜ 📄 [Full scss file](${theme.src}/scss/components/${name})
`;
    };

    return `
## Sass variables

${Themes.map(
    (theme) =>
        `<div class="${theme.key}">

> Current theme ➜ _[${theme.label}](${theme.git})_

${renderThemeVariables(theme)}
</div>
`,
).join("")}
`;
}

export default renderer;

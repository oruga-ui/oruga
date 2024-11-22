import path from "path";
import * as fs from "fs";
import { type SafeDocgenCLIConfig } from "vue-docgen-cli/lib/config";
import { getThemePath, Themes, type ThemeConfig } from "../themes-helper";

export function renderer(config: SafeDocgenCLIConfig, name: string): string {
    const renderThemeVariables = (theme: ThemeConfig): string => {
        const noStyle = `<p>The theme does not have any custom variables for this component.</p>`;
        const componentPath = getThemePath(
            theme,
            config.cwd,
            `/scss/components/${name}`,
        );
        if (!componentPath) return noStyle;

        const cssFile = path.resolve(config.cwd, componentPath);
        const content = fs.readFileSync(cssFile, "utf8");
        const docsRegex = "/* @docs */";

        if (!content.includes(docsRegex)) return noStyle;

        const docs = content.substring(
            content.indexOf(docsRegex) + docsRegex.length,
            content.lastIndexOf(docsRegex),
        );

        const variables = docs
            .replace(/(\r\n|\n|\r)/gm, "")
            .split(";")
            .filter((d) => !!d);

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

    return `## Sass variables

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

import path from "path";
import * as fs from "fs";
import { type SafeDocgenCLIConfig } from "vue-docgen-cli/lib/config";
import { Themes, type ThemeConfig } from "../themes";
import { getThemePath } from "../themes-helper";

const docsRegex = "/* @docs */";

/** files with variables for a component */
const variablePaths = (name: string): string[] => [
    `/scss/components/${name}`,
    `/scss/component-defaults/${name}`,
];

function getVariablesFromContent(content: string): string[] {
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

        // define all files with variables for a component
        const paths = variablePaths(name);

        const files: string[] = paths
            // get the theme file by path
            .map((filePath) => getThemePath(theme, config.cwd, filePath))
            // remove non existing paths
            .filter((p) => !!p)
            // load file content for path
            .map((filePath) => {
                try {
                    const cssFile = path.resolve(config.cwd, filePath);
                    return fs.readFileSync(cssFile, "utf8");
                } catch (e) {
                    // Log errors but allow the process to continue.
                    // We expect every component to have a scss file, but docs should render even if none is found.
                    console.error(e);
                    return "";
                }
            })
            // remove files without docs string
            .filter((content) => content.includes(docsRegex));

        // check if component has variables
        if (!files.length) return noStyle;

        // extract variables from file content
        const variables = files.flatMap(getVariablesFromContent);

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

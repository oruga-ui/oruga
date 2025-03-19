import * as fs from "fs";
import path from "path";

import { Themes, type ThemeConfig } from "../themes";

/** files with variables for a component */
const variablePaths = (): string[] => [
    "/scss/utils/_variables.scss",
    "/scss/variables/_variables.scss",
    "/scss/variables/_derived-defaults.scss",
    "/scss/variables/_initial-defaults.scss",
];

export function getThemePath(
    theme: ThemeConfig,
    cwd: string,
    suffix: string,
): string {
    // local package node_module path
    let filePath = path.resolve(cwd, `./node_modules/${theme.path}${suffix}`);
    if (fs.existsSync(filePath)) return filePath;
    // root node_module path
    filePath = path.resolve(cwd, `./../../node_modules/${theme.path}${suffix}`);
    if (fs.existsSync(filePath)) return filePath;
    // return empty path
    return "";
}

export function createThemeDocs(cwd: string): void {
    Themes.forEach((theme) => {
        // define all files with variables for a component
        const paths = variablePaths();

        const files: string[] = paths
            // get the theme file by path
            .map((filePath) => getThemePath(theme, cwd, filePath))
            // remove non existing paths
            .filter((p) => !!p)
            // load file content for path
            .map((filePath) => {
                try {
                    const cssFile = path.resolve(cwd, filePath);
                    return fs.readFileSync(cssFile, "utf8");
                } catch (e) {
                    // Log errors but allow the process to continue.
                    // We expect every component to have a scss file, but docs should render even if none is found.
                    console.error(e);
                    return "";
                }
            });

        // check if no files are found
        if (!files.length) {
            const noStyle = `<p>The theme does not have any custom variables for this component.</p>`;

            // write markdown doc file for the theme
            fs.writeFileSync(`./themes/${theme.key}.md`, noStyle);
            return;
        }

        const lines: string[] = files
            // split file into lines and combine them
            .map((content: string): string[] =>
                content
                    // split file
                    .split(/(\r\n|\n|\r)/gm)
                    // remove commands and empty rows
                    .filter(
                        (d) =>
                            !d.match(/(?:@use|@forward|\*{2}|\*{1}\s|\/\*)/) &&
                            !d.match(/(\r\n|\n|\r)/),
                    ),
            )
            .flatMap((lines: string[]) => {
                // remove starting empty lines
                while (lines[0] == "") lines.shift();
                // remove ending empty lines
                while (lines[lines.length - 1] == "") lines.pop();

                return lines;
            });

        // create markdown file
        const md = `<div class="${theme.key}">

> Current theme ➜ _[${theme.label}](${theme.git})_

\`\`\`scss
${lines.join("\n")}
\`\`\`

See ➜ 📄 [SCSS files](${theme.src}/scss/)
</div>
`;
        // write markdown doc file for the theme
        fs.writeFileSync(`./themes/${theme.key}.md`, md);
    });
}

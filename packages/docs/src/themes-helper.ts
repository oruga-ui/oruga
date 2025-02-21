import * as fs from "fs";
import path from "path";

import themes from "./themes.json";
import type { ThemeConfig } from "./types";
export type { ThemeConfig };

const Themes = themes as ThemeConfig[];
export { Themes };

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
        // get the variable file path
        let componentPath = getThemePath(
            theme,
            cwd,
            "/scss/utils/_variables.scss",
        );
        if (!componentPath)
            componentPath = getThemePath(
                theme,
                cwd,
                "/scss/components/utils/_variables.scss",
            );

        // check if no file path is found
        if (!componentPath) {
            const noStyle = `<p>The theme does not have any custom variables for this component.</p>`;

            // write markdown doc file for the theme
            fs.writeFileSync(`./themes/${theme.key}.md`, noStyle);
            return;
        }

        const cssFile = path.resolve(componentPath);
        const content = fs.readFileSync(cssFile, "utf8");
        const file = content
            // split file
            .split(/(\r\n|\n|\r)/gm)
            // remove commands and empty rows
            .filter(
                (d) =>
                    !d.match(/(?:@use|\*{2}|\*{1}\s|\/\*)/) &&
                    !d.match(/(\r\n|\n|\r)/),
            );
        // remove starting empty lines
        while (file[0] == "") file.shift();
        // remove ending empty lines
        while (file[file.length - 1] == "") file.pop();

        // create markdown file
        const md = `<div class="${theme.key}">

> Current theme ➜ _[${theme.label}](${theme.git})_

\`\`\`scss
${file.join("\n")}
\`\`\`

See ➜ 📄 [SCSS files](${theme.src}/scss/)
</div>
`;
        // write markdown doc file for the theme
        fs.writeFileSync(`./themes/${theme.key}.md`, md);
    });
}

// The file is not designed to run directly. `cwd` should be project root.
import fs from "fs";
import path from "path";
import process from "process";

import { getComponents, fileExist } from "../packages/docs/src/utils.ts";

const __dirname = process.cwd();

const componentDirectory = "./packages/oruga/src/components";

function generateComponentsType(module: string, file: string): void {
    if (!fileExist(path.resolve(__dirname, componentDirectory)))
        throw new Error("Path not exist: " + componentDirectory);

    const globalComponents = getComponents(componentDirectory);

    const components = {};
    globalComponents
        // add global "O" prefix
        .map((dir) => "O" + dir)
        // add type declaration
        .forEach((key) => {
            components[key] = `(typeof import("${module}"))["${key}"];`;
        });

    const lines = Object.entries(components)
        .filter(([name]) => components[name])
        .map(([name, v]) => {
            if (!/^\w+$/.test(name)) {
                name = `'${name}'`;
            }
            return `${name}: ${v}`;
        });

    const code = `// Auto generated component declarations
declare module "vue" {
    export interface GlobalComponents {
        ${lines.join(`
        `)}
    }
}
export {};
`;

    fs.writeFileSync(path.resolve(__dirname, file), code, "utf-8");

    console.log(`File '${file}' generated.`);
}

// generate export types volar file
generateComponentsType("@oruga-ui/oruga-next", "./packages/oruga/volar.d.ts");
// generate main package types volar file
generateComponentsType(
    "../oruga/src/components",
    "./packages/oruga/components.d.ts",
);

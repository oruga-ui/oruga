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

    const lines = globalComponents
        // add global "O" prefix
        .map((dir) => "O" + dir)
        // add type declaration
        .map((key) => `${key}: (typeof import("${module}"))["${key}"];`)
        // stay consistent order
        .sort((a, b) => a.localeCompare(b));

    const code = `// Auto generated component declarations
declare module "vue" {
    export interface GlobalComponents {
        ${lines.join(`
        `)}
    }
}
export {};
`;

    fs.writeFileSync(path.resolve(__dirname, file), code, { encoding: "utf8" });

    console.log(`File '${file}' generated.`);
}

// generate export types volar file
generateComponentsType("@oruga-ui/oruga-next", "./packages/oruga/volar.d.ts");
// generate main package types volar file
generateComponentsType(
    "../oruga/src/components",
    "./packages/oruga/components.d.ts",
);

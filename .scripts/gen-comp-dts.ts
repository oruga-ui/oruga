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
        // convert to type declaration format
        .map((key) => `${key}: (typeof import("${module}"))["${key}"];`);

    const code = `// Auto generated component declarations
declare module "vue" {
    export interface GlobalComponents {
        ${lines.join(`
        `)}
    }
}
export {};
`;

    fs.writeFileSync(file, code, { encoding: "utf8" });

    console.log(`File '${file}' generated.`);
}

const file = path.resolve(__dirname, "./packages/oruga/components.d.ts");

// generate export component types file
generateComponentsType("@oruga-ui/oruga-next", file);

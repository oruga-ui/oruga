// The file is not designed to run directly. `cwd` should be project root.
import fs from "fs";
import path from "path";
import process from "process";

import { createChecker } from "vue-component-meta";

import {
    getComponents,
    fileExist,
    getFolders,
} from "../packages/docs/src/utils.ts";

const __dirname = process.cwd();

const componentDirectory = "./packages/oruga/src/components";

if (!fileExist(path.resolve(__dirname, componentDirectory)))
    throw new Error("Path not exist: " + componentDirectory);

console.log("Creating vue-component-meta checker...");
// create component meta checker
const checker = createChecker(
    path.resolve(__dirname, "./packages/oruga/tsconfig.app.json"),
    { forceUseTs: true, printer: { newLine: 1 } },
);

// get all component folders
const component_folders = getFolders(componentDirectory);

console.log(`Processing components...`);

const components = component_folders
    .map((folder) => {
        const name = folder.toLowerCase();
        const folderPath = path.resolve(__dirname, componentDirectory, folder);

        // get all components in component folder
        const folderComponents = getComponents(folderPath);

        // get all configurable props from all components in folder
        const props = folderComponents
            .flatMap((comp) => {
                const file = comp + ".vue";
                const componentPath = path.resolve(
                    __dirname,
                    componentDirectory,
                    folder,
                    file,
                );
                const meta = checker.getComponentMeta(componentPath);

                if (!meta.props.length) {
                    console.warn(
                        `Failure parsing component '${name}': no properties found.`,
                    );
                    console.log("Recreating vue-component-meta checker...");
                }

                return meta.props
                    .filter((prop) => {
                        // filter only class props and configurable props
                        if (prop.name.includes("Class")) return true;
                        if (prop.default?.includes("getDefault")) {
                            const path = (prop.default.match(/"(.*?)"/) || [
                                "",
                            ])[0];
                            return path.includes(".");
                        }
                        return false;
                    })
                    .map((prop) => {
                        // remove undefined because we wrap the object with partial
                        if (prop.type.includes("| undefined"))
                            prop.type = prop.type.replace(" | undefined", "");

                        // change type for class props
                        if (prop.type === "ComponentClass")
                            prop.type = "ClassDefinition";

                        if (prop.name.includes("Classes")) {
                            prop.type = "Record<string, any>";
                            return prop;
                        }

                        // change property name based on config path
                        if (
                            prop.default &&
                            prop.default?.includes("getDefault")
                        ) {
                            let name = (prop.default.match(/"(.*?)"/) || [
                                "",
                            ])[0];
                            name = name.substring(1, name.length - 1);
                            const split = name.split(".");
                            name = split.length == 2 ? split[1] : split[0];
                            if (prop.name !== name) prop.name = name;
                        }

                        // sort union types
                        if (
                            prop.type.includes(" | ") &&
                            !prop.type.includes("(") &&
                            !prop.type.includes("[")
                        )
                            prop.type = prop.type
                                .split(" | ")
                                .sort((a, b) => a.localeCompare(b))
                                .join(" | ");

                        return prop;
                    });
            })
            // filter duplicates
            .filter(
                (item, idx, self) =>
                    idx === self.findIndex((p) => p.name === item.name),
            );

        console.log(
            `Processed '${name}' component with ${props.length} global props.`,
        );
        return { name, props };
    })
    // sort components by name
    .sort((a, b) => a.name.localeCompare(b.name));

console.log(`Processed ${components.length} components.`);

const code = `import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

// Auto generated component theme config definition
declare module "../index" {
    interface OrugaOptions {
        ${components.map(
            ({ name, props }) =>
                `${name.toLowerCase()}?: ComponentConfigBase &
            Partial<{${props
                .map(
                    (prop) => `
                /** ${prop.description} */
                ${prop.name}: ${prop.type};`,
                )
                .join("")}
            }>;`,
        ).join(`
        `)}
    }
}
`;

const file = path.resolve(__dirname, componentDirectory, "types.ts");
fs.writeFileSync(file, code, "utf-8");

console.log(`File '${file}' generated.`);

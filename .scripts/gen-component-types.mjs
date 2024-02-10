// The file is not designed to run directly. `cwd` should be project root.
import fs from 'fs-extra'
import path from 'path'
import process from 'process'

import { createComponentMetaChecker } from '../packages/oruga-next/node_modules/vue-component-meta/out/index.js';

import { componentDirectory, getFolders, getComponents, exist } from "./utils.mjs";

const __dirname = process.cwd()
  
if(!exist(path.resolve(__dirname, componentDirectory))) 
    throw new Error("Path not exist: " + componentDirectory);

// create component meta checker
const checker = createComponentMetaChecker(
    // Write your tsconfig path
    path.resolve(__dirname, './tsconfig.json'),
    {
        forceUseTs: true,
        printer: { newLine: 1 },
        // schema: { ignore: ['MyIgnoredNestedProps'] },
    },
);

// get all component folders
const component_folders = getFolders(componentDirectory);

component_folders.map(folder => {
    const name = folder.toLowerCase();
    const folderPath = path.resolve(__dirname, componentDirectory, folder);

    // get all components in component folder
    const components = getComponents(folderPath)

    // get all configruable props from all components in folder
    const props = components.flatMap(comp => {
        const file = comp.toLocaleLowerCase()+".vue";
        const componentPath = path.resolve(__dirname, componentDirectory, name, file);
        const meta = checker.getComponentMeta(componentPath);

        return meta.props.filter(prop => {
            // filter only class props and configurable props
            if(prop.name.includes("Class")) return true;
            if(prop.default?.includes("getOption")) {
                const path = prop.default.match(/"(.*?)"/)[0];
                return path.includes(".");
            }
            return false;
        }).map(prop => {
            // change type for class props
            if(prop.type === "ComponentClass")
                prop.type = "ClassDefinition";

            if(prop.name.includes("Classes")) return prop;

            // change property name based on config path
            if(prop.default && prop.default?.includes("getOption")) {
                let name = prop.default.match(/"(.*?)"/)[0];
                name = name.substring(1, name.length-1);
                const split = name.split(".");
                name = split.length == 2 ? split[1] : split[0];
                if(prop.name !== name)
                    prop.name = name;
            }
            return prop;
        })
    })
    // filter duplicates
    .filter((item, idx, self) =>
        idx === self.findIndex(p => p.name === item.name)
    );

    if(name =="menu") console.log(props);

    const hasTagProp = props.some(prop => prop.type === "DynamicComponent");

    const code = `${hasTagProp ? `import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";`: `import type { ClassDefinition, ComponentConfigBase } from "@/types";`
}

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        ${name.toLowerCase()}?: ComponentConfigBase &
            Partial<{${
            props.map(prop => {
                return `
                /** ${prop.description} */
                ${prop.name}: ${prop.type};`
            }).join("")
        }
            }>;
    }
}
`;

    const file = path.resolve(__dirname, componentDirectory, name, "types.ts");
    fs.writeFileSync(path.resolve(__dirname, file), code, 'utf-8')

});
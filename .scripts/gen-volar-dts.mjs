// The file is not designed to run directly. `cwd` should be project root.
import fs from 'fs'
import path from 'path'
import process from 'process'

import { componentDirectory, getComponents, exist } from "./utils.mjs";

const __dirname = process.cwd();

function generateComponentsType (module, file) {  
  if(!exist(path.resolve(__dirname, componentDirectory))) 
    throw new Error("Path not exist: " + componentDirectory);

  const globalComponents = getComponents(componentDirectory);

  const components = {}
  globalComponents
    // add global O prefix
    .map((dir) => "O" + dir)
    // add type declaration
    .forEach((key) => {
      components[key] = `(typeof import("${module}"))["${key}"];`;
    });

  const lines = Object.entries(components)
    .filter(([name]) => components[name])
    .map(([name, v]) => {
      if (!/^\w+$/.test(name)) {
        name = `'${name}'`
      }
      return `${name}: ${v}`
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

  fs.writeFileSync(path.resolve(__dirname, file), code, 'utf-8')
}

// generate main package volar file
generateComponentsType("@oruga-ui/oruga-next", './packages/oruga/volar.d.ts');
// generate docs package volar file 
generateComponentsType("../oruga/dist/types", './packages/docs/volar.d.ts');

// The file is not designed to run directly. `cwd` should be project root.
import fs from 'fs-extra'
import path from 'path'
import process from 'process'

const componentDirectory = './src/components';

// Components to be ignored for creating volar type 
const IGNORE = [
  "FieldBody",
  "SliderThumb",
  "TableMobileSort",
  "TablePagination",
  "PaginationButton",
  "DatepickerTable",
  "DatepickerTableRow",
  "DatepickerMonth",
  "PickerWrapper",
  "NotificationNotice",
];

const TYPE_ROOT = process.cwd()

function getComponents(dir) {
  const files = fs.readdirSync(dir, { recursive: true });
  return files
    // filter only vue files and remove test files
    .filter(f => f.includes(".vue") && !f.includes("tests"))
    // remove path
    .map(f => path.basename(f))
    // remove .vue suffix
    .map(f => f.substring(0, f.indexOf(".vue")))
    // filter blacklist 
    .filter((key) => !IGNORE.includes(key))
}

function exist (path) {
  return fs.existsSync(path)
}

function generateComponentsType (module, file) {  
  if(!exist(path.resolve(TYPE_ROOT, componentDirectory))) 
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
    ${lines.join('\n    ')}
  }
}
export {};
`;

  fs.writeFileSync(path.resolve(TYPE_ROOT, file), code, 'utf-8')
}

// generate main package volar file
generateComponentsType("@oruga-ui/oruga-next", 'volar.d.ts');
// generate docs package volar file 
generateComponentsType("../oruga-next/dist/types", '../docs-next/volar.d.ts');

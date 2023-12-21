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
    .map(f => f.includes("\\") ? f.substring(f.lastIndexOf("\\") + 1) : f)
    // remove .vue suffix
    .map(f => f.substring(0, f.indexOf(".vue")))
    // filter blacklist 
    .filter((key) => !IGNORE.includes(key))
}

function exist (path) {
  return fs.existsSync(path)
}

function generateComponentsType () {  
  if(!exist(path.resolve(TYPE_ROOT, componentDirectory))) 
    throw new Error("Path not exist: " + componentDirectory);

  const globalComponents = getComponents(componentDirectory);

  const components = {}
  globalComponents
    // add global O prefix
    .map((dir) => "O" + dir)
    // add type declaration
    .forEach((key) => {
      components[key] = `(typeof import("@oruga-ui/oruga-next"))["${key}"];`;
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

  fs.writeFileSync(path.resolve(TYPE_ROOT, 'volar.d.ts'), code, 'utf-8')
}

generateComponentsType()

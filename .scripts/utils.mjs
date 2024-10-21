// The file is not designed to run directly. `cwd` should be project root.
import fs from 'fs';
import path from 'path';

// Components to be ignored
const IGNORE = [
  "SliderThumb",
  "TableMobileSort",
  "TablePagination",
  "PaginationButton",
  "DatepickerTable",
  "DatepickerTableRow",
  "DatepickerMonth",
];
  
export const componentDirectory = './packages/oruga/src/components';

export function exist (path) {
  return fs.existsSync(path)
}

const filter = (f) => !f.includes("tests") && !f.includes("examples") && !f.includes("utils") && !f.includes(".ts");

export function getFolders(dir) {
  const folders = fs.readdirSync(dir)
    // remove test and util files
    .filter(filter);
  return folders;
}

export function getComponents(dir) {
    const files = fs.readdirSync(dir, { recursive: true });
    return files
      // remove test and util folders
      .filter(filter)
      // filter only vue files
      .filter((f) => f.includes(".vue"))
      // remove path
      .map(f => path.basename(f))
      // remove .vue suffix
      .map(f => f.substring(0, f.indexOf(".vue")))
      // filter blacklist 
      .filter((key) => !IGNORE.includes(key))
}

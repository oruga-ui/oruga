// The file is not designed to run directly. `cwd` should be project root.
import fs from 'fs-extra';
import path from 'path';

// Components to be ignored
const IGNORE = [
  "FieldBody",
  "SliderThumb",
  "TableMobileSort",
  "TablePagination",
  "PaginationButton",
  "DatepickerTable",
  "DatepickerTableRow",
  "DatepickerMonth",
  "NotificationNotice",
];
  
export const componentDirectory = './src/components';

export function exist (path) {
  return fs.existsSync(path)
}

export function getFolders(dir) {
  const folders = fs.readdirSync(dir)
    // remove test and util files
    .filter(f => !f.includes("tests") && !f.includes("utils") && !f.includes(".ts"));
  return folders;
}

export function getComponents(dir) {
    const files = fs.readdirSync(dir, { recursive: true });
    return files
      // filter only vue files and remove test and util files
      .filter(f => f.includes(".vue") && !f.includes("tests") && !f.includes("utils"))
      // remove path
      .map(f => path.basename(f))
      // remove .vue suffix
      .map(f => f.substring(0, f.indexOf(".vue")))
      // filter blacklist 
      .filter((key) => !IGNORE.includes(key))
}

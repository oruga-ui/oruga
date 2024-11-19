// The file is not designed to run directly. `cwd` should be project root.
import fs from "fs";
import path from "path";
import { parse } from "node:path";

// Components blacklist which will be ignored
const IGNORE = [
    "SliderThumb",
    "TableMobileSort",
    "TablePagination",
    "PaginationButton",
    "DatepickerTable",
    "DatepickerTableRow",
    "DatepickerMonth",
    "Programmatic",
];

function filterFile(f: string): boolean {
    return (
        !f.includes("tests") &&
        !f.includes("examples") &&
        !f.includes("utils") &&
        !f.includes(".ts") &&
        !f.includes("programmatic")
    );
}

export function fileExist(path: string): boolean {
    return fs.existsSync(path);
}

/** Gets the filename without file extension. */
export function getFilenameWithoutExtension(filename: string): string {
    return parse(filename).name;
}

/** Lowercases the first letter. */
export function lowercaseFirstLetter(string: string): string {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/** Get all folders in a path */
export function getFolders(dir: string): string[] {
    const folders = fs
        .readdirSync(dir)
        // remove test and util files
        .filter(filterFile);
    return folders;
}

/** Get all components in a folder */
export function getComponents(dir: string): string[] {
    const files = fs.readdirSync(dir, { recursive: true });
    return (
        files
            // filter Buffer out
            .filter((f) => typeof f === "string")
            // remove test and util folders
            .filter(filterFile)
            // filter only vue files
            .filter((f) => f.includes(".vue"))
            // remove path
            .map((f) => path.basename(f))
            // remove extension suffix
            .map(getFilenameWithoutExtension)
            // filter blacklist
            .filter((key) => !IGNORE.includes(key))
    );
}

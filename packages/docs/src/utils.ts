// The file is not designed to run directly. `cwd` should be project root.
import fs from "fs";
import path from "path";
import { parse } from "node:path";

/** Components blacklist which will be ignored */
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

const TYPEMAP = {
    "DatepickerType<IsRange, IsMultiple>": "[] | Date | Date[] | [Date, Date]",
    "DeepKeys<T>": "string",
    "(?<!DeepKeys<)\\bT\\b(?=\\s*(?:[,);\\|>\\]\\[]|$))": "unknown",
};

/** Replace specific types in a type string. */
export function anonymiseTypes(type: string): string {
    const pattern = Object.keys(TYPEMAP).join("|");
    const regex = new RegExp(pattern, "g");

    return type.replace(regex, (match) => {
        return TYPEMAP[match as keyof typeof TYPEMAP] || "unknown";
    });
}

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
            // stay consistent order
            .sort((a, b) => a.localeCompare(b))
    );
}

/**
 * Find a file in a directory, case-insensitive
 *
 * @param {string} filepath
 * @return {string|undefined} File path with correct case
 */
export function findFileCaseInsensitive(filepath: string): string | undefined {
    const dir = path.dirname(filepath);
    const fileNameLower = path.basename(filepath).toLowerCase();
    const files = fs.readdirSync(dir);
    const found = files.find(
        (file: string) => file.toLowerCase() === fileNameLower,
    );
    return found && path.join(dir, found);
}

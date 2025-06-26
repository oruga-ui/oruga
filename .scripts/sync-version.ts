import { replaceInFileSync } from "replace-in-file";

const jsonPaths = [
    "package-lock.json",
    "packages/docs/package.json",
    "packages/oruga/package.json",
    "packages/examples/package.json",
];
// eslint-disable-next-line @typescript-eslint/no-require-imports
const version = require("../package.json").version;

const configJsonOptions = [
    {
        files: jsonPaths,
        from: /"name": "@oruga-ui\/(.*)",([^"]*)"version": .+/gi,
        to: (match) =>
            match.replace(/"version": .+/i, `"version": "${version}",`),
    },
    {
        files: jsonPaths,
        from: /"@oruga-ui\/oruga-next": "(.*)",/gi,
        to: (match) =>
            match.replace(
                /oruga-next": "(.*)",/i,
                `oruga-next": "${version}",`,
            ),
    },
];

const replaceInFile = (config) =>
    replaceInFileSync(config).map((el) => el.file);

try {
    configJsonOptions.forEach((options) => replaceInFile(options));
    console.info("Modified files:", jsonPaths.join(", "));
} catch (error) {
    console.error(error);
    process.exit(1);
}

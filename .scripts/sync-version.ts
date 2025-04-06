import { replaceInFileSync } from 'replace-in-file'

const jsonPaths = [
  'package-lock.json',
  'packages/docs/package.json',
  'packages/oruga/package.json',
  'packages/examples/package.json',
]
const version = require('../package.json').version

const configJsonOptions = [{
  files: jsonPaths,
  from: /"name": "@oruga-ui\/(.*)",([^"]*)"version": .+/ig,
  to: (match) => match.replace(/"version": .+/i, `"version": "${version}",`),
},
{
  files: jsonPaths,
  from: /"@oruga-ui\/oruga-next": "(.*)",/ig,
  to: (match) => match.replace(/oruga-next": "(.*)",/i, `oruga-next": "${version}",`),
}]

const replaceInFile = (config) =>
  replaceInFileSync(config).map((el) => el.file);

try {
  configJsonOptions.forEach(options => replaceInFile(options));
  console.info('Modified files:', jsonPaths.join(', '));
} catch (error) {
  console.error(error);
  process.exit(1);
}

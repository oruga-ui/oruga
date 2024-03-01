const replace = require('replace-in-file')

const jsonPaths = [
  'packages/docs/package.json',
  'packages/docs/package-lock.json',
  'packages/oruga/package.json',
  'packages/oruga/package-lock.json',
]
const version = require('../package.json').version

const configJsonOptions = {
  files: jsonPaths,
  from: /"name": "@oruga-ui\/(.*)-next",([^"]*)"version": .+/ig,
  to: (match) => 
    match.replace(/"version": .+/i, `"version": "${version}",`),
}

const replaceInFile = (config) => 
   replace.sync(config).map((el) => el.file);

try {
  const changedFiles = replaceInFile(configJsonOptions)
  console.info('Modified files:', changedFiles.join(', '))
} catch (error) {
  console.error(e)
  process.exit(1)
}

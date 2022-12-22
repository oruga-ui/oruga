const replace = require('replace-in-file')

const jsonPaths = [
  'packages/docs/package.json',
  'packages/docs/package-lock.json',
  'packages/docs-next/package.json',
  'packages/docs-next/package-lock.json',
  'packages/oruga/package.json',
  'packages/oruga/package-lock.json',
  'packages/oruga-next/package.json',
  'packages/oruga-next/package-lock.json',
]
const version = require('../package.json').version

const configJsonOptions = {
  files: jsonPaths,
  from: /"version": .+/i,
  to: `"version": "${version}",`,
}

const replaceInFile = (config) => {
  return replace.sync(config).map((el) => el.file)
}

try {
  const changedFiles = replaceInFile(configJsonOptions)
  console.info('Modified files:', changedFiles.join(', '))
} catch (error) {
  console.error(e)
  process.exit(1)
}

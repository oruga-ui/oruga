// The file is not designed to run directly. `cwd` should be project root.
import fs from 'fs-extra'
import path from 'path'
import process from 'process'

const componentDirectory = './src/components';

const TYPE_ROOT = process.cwd()
const excludeComponents = ['']

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

function exist (path) {
  return fs.existsSync(path)
}

function parseComponentsDeclaration (code) {
  if (!code) return {}
  return Object.fromEntries(
    Array.from(code.matchAll(/(?<!\/\/)\s+\s+['"]?(.+?)['"]?:\s(.+?)\n/g)).map(
      (i) => [i[1], i[2]]
    )
  )
}

function generateComponentsType () {  
  if(!exist(path.resolve(TYPE_ROOT, componentDirectory))) 
    throw new Error("Path not exist: " + componentDirectory);

  const componentDirectories = getDirectories(componentDirectory);

  const globalComponents = componentDirectories.map((dir) => "O" + dir[0].toUpperCase() + dir.substring(1));

  const components = {}
  globalComponents.filter((key) => !excludeComponents.includes(key)).forEach((key) => {
    components[key] = `(typeof import("@oruga-ui/oruga-next"))["${key}"];`;
  })

  const originalContent = exist(path.resolve(TYPE_ROOT, 'volar.d.ts'))
    ? fs.readFileSync(path.resolve(TYPE_ROOT, 'volar.d.ts'), 'utf-8')
    : ''

  const originImports = parseComponentsDeclaration(originalContent)
  const lines = Object.entries({
    ...originImports,
    ...components
  })
    .filter(([name]) => {
      return components[name]
    })
    .map(([name, v]) => {
      if (!/^\w+$/.test(name)) {
        name = `'${name}'`
      }
      return `${name}: ${v}`
    })
  const code = `// Auto generated component declarations
declare module "vue" {
  export interface GlobalComponents {
    ${lines.join('\n    ')}
  }
}
export {};
`
  if (code !== originalContent) {
    fs.writeFileSync(path.resolve(TYPE_ROOT, 'volar.d.ts'), code, 'utf-8')
  }
}

generateComponentsType()

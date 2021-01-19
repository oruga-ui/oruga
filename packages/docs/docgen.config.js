const path = require('path');
const fs = require('fs');

const src = '../oruga/src';

const IGNORE = [
  'DropdownItem.vue', 'FieldBody.vue', 'SliderThumb.vue', 'SliderTick.vue',
  'TableMobileSort.vue', 'TablePagination.vue', 'PaginationButton.vue',
  'TabItem.vue', 'StepItem.vue', 'MenuItem.vue', 'MenuList.vue', 'Inspector.vue',
  'DatepickerTable.vue', 'DatepickerTableRow.vue'
];

const IGNORE_CLASSES = {
    'icon' : ['customClass'],
    'table column' : ['headerClass', 'cellClass']
}

module.exports = {
  componentsRoot: `${src}/components`,
  components: '**/[A-Z]*.vue',
  outDir: './components',
  docsRepo: 'oruga-ui/oruga',
  docsBranch: 'develop',
  docsFolder: 'packages/docs',
  defaultExamples: false,
  getDestFile: (file, config) => {
    const component = path.basename(file);
    if (!component || IGNORE.indexOf(component) >= 0) return;
    return path.join(config.outDir, component).replace(/\.vue$/, '.md');
  },
  templates: {
    component: (renderedUsage, doc, config, fileName, requiresMd, { isSubComponent }) => {
      const { displayName, description, docsBlocks, tags, functional } = doc;
      const { deprecated, author, since, version, see, link, style } = tags || {};
      return `

${!isSubComponent ? `
---
title: ${displayName}
---
`: ''}
# ${deprecated ? `~~${displayName}~~` : displayName}
${deprecated ? `> **Deprecated** ${deprecated[0].description}\n` : ''}
${description ? '> ' + description : ''}
${functional ? renderedUsage.functionalTag : ''}
${author ? author.map(a => `Author: ${a.description}\n`) : ''}
${since ? `Since: ${since[0].description}\n` : ''}
${version ? `Version: ${version[0].description}\n` : ''}
${see ? see.map(s => `[See](${s.description})\n`) : ''}
${link ? link.map(l => `[See](${l.description})\n`) : ''}
${docsBlocks ? '---\n' + docsBlocks.join('\n---\n') : ''}
${tmplClassProps(config, displayName.toLowerCase())}
${tmplProps(renderedUsage.props, config, displayName.toLowerCase())}
${renderedUsage.methods}
${renderedUsage.events}
${renderedUsage.slots}
${requiresMd.length ? '---\n' + requiresMd.map(component => component.content).join('\n---\n') : ''}
${style ? renderStyleDocs(config, style[0].description) : ''}
`;
    },
    props: (props) => {
      return props
    }
  }
};

function tmplClassProps(config, name) {
    try {
        const inspectorVueFile = path.resolve(config.cwd, `${src}/components/${name}/Inspector.vue`)
        return `
## Class props
<br />
${fs.readFileSync(inspectorVueFile, 'utf8')}
<br />
<br />
`
    } catch (err) {
        return ''
    }
}

function tmplProps(props, config, name) {
    let ret = `
## Props
| Prop name     | Description | Type      | Values      | Default     |
| ------------- |-------------| --------- | ----------- | ----------- |
`
  props.sort(function(propa, propb) {
    return (propa.name < propb.name) ? -1 : (propa.name > propb.name) ? 1 : 0;
  });

  props.forEach(pr => {
    const p = pr.name
    if (p.endsWith("Class")) {
      if (!(IGNORE_CLASSES[name] && IGNORE_CLASSES[name].indexOf(p) >= 0)) {
        return;
      }
    }
    const n = pr.type && pr.type.name ? pr.type.name : ''
    let d = pr.defaultValue && pr.defaultValue.value ? pr.defaultValue.value : ''
    const v = pr.values ? pr.values.map(pv => `\`${pv}\``).join(', ') : '-'
    const t = pr.description ? pr.description : ''

    if (d.indexOf('getValueByPath') >= 0) {
      const params = d.substring(d.lastIndexOf('('), d.lastIndexOf(')')).split(',')
      d = `Config -> <code>${params[1]}:${params[2]}</code>`
    }

    ret += `| ${mdclean(p)} | ${mdclean(t)} | ${mdclean(n)} | ${mdclean(v)} | ${mdclean(d)} |` + '\n'
  })
  return ret
}

function mdclean(input) {
  return input.replace(/\r?\n/g, '<br>').replace(/\|/g, '\\|')
}

function renderStyleDocs(config, name) {
  const cssFile = path.resolve(config.cwd, `${src}/scss/components/${name}`)
  const content = fs.readFileSync(cssFile, 'utf8');
  const docsRegex = '/* @docs */';
  const docs = content.substring(content.indexOf(docsRegex) + docsRegex.length, content.lastIndexOf(docsRegex));
  const variables = docs.split(/\r?\n/).filter(d => !!d);
  return `
## Style

  | CSS Variable          | SASS Variable  | Default |
  | --------------------- | -------------- | ------- |
${variables
      .map(variable => {
        const keyValue = variable.split(':');
        const varName = keyValue[0].trim();
        const varValue = keyValue[1].replace('!default', '').replace(';', '').trim();
        const varNameCSS = varName.replace('$', '');
        return (
          `| ${'--oruga-' + varNameCSS} | ${varName} | ${varValue} |`
        )
      })
      .join('\n')}
`
}

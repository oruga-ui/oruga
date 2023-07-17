const path = require('path');
const fs = require('fs');

const THEMES = [
  { 
      label: 'Oruga Base Theme', 
      value: 'theme-orugabase',
      path: '../oruga/src',
      git: 'https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src'
  },
  { 
      label: 'Oruga Full Theme', 
      value: 'theme-orugafull', 
      path: '../oruga/src',
      git: 'https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src'
  },
  { 
      label: 'Bulma Theme', 
      value: 'theme-bulma', 
      path: './node_modules/@oruga-ui/theme-bulma/dist',
      git: 'https://github.com/oruga-ui/theme-bulma/tree/main/src/assets'
  },
  { 
      label: 'Bootstrap Theme', 
      value: 'theme-bootstrap', 
      path: './node_modules/@oruga-ui/theme-bootstrap/dist',
      git: 'https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets'
  }
]

const IGNORE = [
  'DropdownItem', 'FieldBody', 'SliderThumb', 'SliderTick',
  'TableMobileSort', 'TablePagination', 'TableColumn', 'PaginationButton',
  'TabItem', 'StepItem', 'MenuItem', 'MenuList', 'Inspector',
  'DatepickerTable', 'DatepickerTableRow', 'DatepickerMonth', 'NotificationNotice',
  'CarouselItem'
];

const IGNORE_CLASSES = {
    'icon' : ['customClass'],
    'table': ['rowClass']
}

const NAME_FOLDER_MAPPING = {
    'notification/toast' : 'notification'
}

const getComponent = (filename) => {
    return path.basename(filename).replace(/\.vue$/, '');
}

module.exports = {
  componentsRoot: `../oruga-next/src/components`,
  components: '**/[A-Z]*.vue',
  outDir: './components',
  docsRepo: 'oruga-ui/oruga',
  docsBranch: 'develop',
  docsFolder: 'packages/docs',
  defaultExamples: false,
  getDestFile: (file, config) => {
    const component = getComponent(file);
    if (!component || IGNORE.indexOf(component) >= 0) return;
    if (file.includes('/tests/')) return;
    return path.join(config.outDir, `${component}.md`);
  },
  templates: {
    props: (props) => props,
    component: (renderedUsage, doc, config, _fileName, requiresMd, { isSubComponent }) => {
      const { displayName, description, tags, functional } = doc;
      const { deprecated, author, since, version, see, link, style } = tags || {};
      const component = getComponent(_fileName);
      const requires = !component || IGNORE.indexOf(component) >= 0;
      return `
${!isSubComponent ? `
---
title: ${displayName}
---
`: ''}
# ${deprecated ? `~~${displayName}~~` : displayName}
${requires ? '' : `<div class="vp-doc">
${deprecated ? `> **Deprecated** ${deprecated[0].description}\n` : ''}
${description ? '> ' + description : ''}
${functional ? renderedUsage.functionalTag : ''}
${author ? author.map(a => `Author: ${a.description}\n`) : ''}
${since ? `Since: ${since[0].description}\n` : ''}
${version ? `Version: ${version[0].description}\n` : ''}
${see ? see.map(s => `[See](${s.description})\n`) : ''}
${link ? link.map(l => `[See](${l.description})\n`) : ''}
<Carbon />
</div>`}
${!isSubComponent ? `
<div class="vp-doc">
${tmplExamples(component)}
</div>
<div class="vp-doc">
${tmplClassProps(config, component)}
</div>
`: ''}
<div class="vp-doc">
${tmplProps(renderedUsage.props, config, component)}
${renderedUsage.methods}
${renderedUsage.events}
${renderedUsage.slots}
${requiresMd.length ? '---\n' + requiresMd.map(component => component.content).join('\n---\n') : ''}
</div>
<div class="vp-doc">
${style ? renderStyleDocs(config, style[0].description) : ''}
</div>`;
    },
  }
};

function tmplExamples(name) {
  return `
  ## Examples

  ${'<example-' + name.toLowerCase() + ' />'}
  `;
}

function tmplClassProps(config, name) {
  name = name.toLowerCase()
  try {
      name = NAME_FOLDER_MAPPING[name] ? NAME_FOLDER_MAPPING[name] : name
      return `
## Class props

<inspector-${name}-viewer />
`
  } catch (err) {
      return ''
  }
}

function tmplProps(props, config, name) {
  let ret = `
## ${name} Component

### Props

| Prop name     | Description | Type      | Values      | Default     |
| ------------- |-------------| --------- | ----------- | ----------- |
`
  props.sort(function(propa, propb) {
    return (propa.name < propb.name) ? -1 : (propa.name > propb.name) ? 1 : 0;
  });

  props.forEach(pr => {
    const p = pr.name
    if (p.endsWith("Class") || p.endsWith("Classes")) {
      if (!(IGNORE_CLASSES[name.toLowerCase()] && IGNORE_CLASSES[name.toLowerCase()].indexOf(p) >= 0)) {
        return;
      }
    }
    const n = pr.type && pr.type.name ? pr.type.name : ''
    let d = pr.defaultValue && pr.defaultValue.value ? pr.defaultValue.value : ''
    const v = pr.values ? pr.values.map(pv => `\`${pv}\``).join(', ') : '-'
    const t = pr.description ? pr.description : ''

    if (d.indexOf('getValueByPath') >= 0 && d.indexOf('const ') < 0 && d.indexOf('if ') < 0 && d.indexOf('else ') < 0) {
      const params = d.substring(d.lastIndexOf('('), d.lastIndexOf(')')).split(',')
      let configParts = null
      if (params.length > 3) { // In case last param contains a ','
        params[2] = params.slice(2).join(',')
      }
      if (params[1]) {
        configParts = params[1].split('.')
      }
      if (configParts && configParts[0] && configParts[1]) {
        const value = `${configParts[1].replace(/'/g, '')}: ${params[2]}`
        d = `<div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>${configParts[0].replace(/'/g, '')}: {<br>&nbsp;&nbsp;${value}<br>}</code>`
      }
      if (configParts && configParts.length == 1) {
        const value = `${configParts[0].replace(/'/g, '')}: ${params[2]}`
        d = `<div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;${value}<br>}</code>`
      }
    }

    d = d.includes('=>') ? 'Default function (see source code)' : d

    ret += `| ${mdclean(p)} | ${mdclean(t)} | ${mdclean(n)} | ${mdclean(v)} | ${mdclean(d)} |` + '\n'
  })
  return ret
}

function mdclean(input) {
  return input.replace(/\r?\n/g, '<br>').replace(/\|/g, '\\|')
}

function renderStyleDocs(config, name) {
  const renderThemeVariables = (theme) => {
    const noStyle = `
<p> This component does not have any Oruga style overrides for the ${theme.label}. </p>
      `;
    const componentPath =  `${theme.path}/scss/components/${name}`;
    if (!fs.existsSync(componentPath)) return noStyle;
    const cssFile = path.resolve(config.cwd, componentPath)
    const content = fs.readFileSync(cssFile, 'utf8');
    const docsRegex = '/* @docs */';
    if(!content.includes(docsRegex)) return noStyle;
    const docs = content.substring(content.indexOf(docsRegex) + docsRegex.length, content.lastIndexOf(docsRegex));
    const variables = docs.replace(/(\r\n|\n|\r)/gm, "").split(";").filter(d => !!d);

    return ` 
| SASS Variable  | Default |
| -------------- | ------- |
${variables
    .filter(variable => variable.indexOf('@deprecated') < 0)
    .map(variable => {
      const keyValue = variable.split(':');
      const varName = keyValue[0].trim();
      const varValue = keyValue[1].trim();
      return (
        `| ${varName} | ${varValue} |`
      )
    })
    .join('\n')}


📄 [Full scss file](${theme.git}/scss/components/${name})
`
  };

  return `
## Theme Styles

    ${ THEMES.map(theme => (`
<div class="${theme.value}">
${renderThemeVariables(theme)}
</div>
`)).join("")}
`;
}

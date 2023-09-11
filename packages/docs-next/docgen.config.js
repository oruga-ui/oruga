/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const path = require("path");
const fs = require("fs");

const { mdclean } = require("vue-docgen-cli/lib/templates/utils");
const renderMethods = require("vue-docgen-cli/lib/templates/methods").default;
const renderEvents = require("vue-docgen-cli/lib/templates/events").default;
const renderSlots = require("vue-docgen-cli/lib/templates/slots").default;

// Import theme definitions
const THEMES = require("./.vitepress/themes.json");

// Components to be ignored for creating docs
const IGNORE = [
    "DropdownItem",
    "FieldBody",
    "SliderThumb",
    "SliderTick",
    "TableMobileSort",
    "TablePagination",
    "TableColumn",
    "PaginationButton",
    "TabItem",
    "StepItem",
    "MenuItem",
    "MenuList",
    "Inspector",
    "DatepickerTable",
    "DatepickerTableRow",
    "DatepickerMonth",
    "NotificationNotice",
    "CarouselItem",
];

// Classes which will be shown in props
const IGNORE_CLASSES = {
    icon: ["customClass"],
    table: ["rowClass"],
};

const NAME_FOLDER_MAPPING = {
    "notification/toast": "notification",
};

const getComponent = (filename) => {
    return path.basename(filename).replace(/\.vue$/, "");
};

createThemeDocs();

module.exports = {
    componentsRoot: `../oruga-next/src/components`,
    components: "**/[A-Z]*.vue",
    outDir: "./components",
    docsRepo: "oruga-ui/oruga",
    docsBranch: "develop",
    docsFolder: "packages/docs",
    defaultExamples: false,
    getDestFile: (file, config) => {
        const component = getComponent(file);
        if (!component || IGNORE.indexOf(component) >= 0) return;
        if (file.includes("/tests/")) return;
        return path.join(config.outDir, `${component}.md`);
    },
    templates: {
        props: (props) => props,
        methods: (methods) => renderMethods(methods, { hasSubComponents: true}),
        events: (events) => renderEvents(events, { hasSubComponents: true}),
        slots: (slots) => renderSlots(slots, { hasSubComponents: true}),
        component: (renderedUsage, doc, config, fileName, requiresMd, { isSubComponent }) => {
            const { displayName, description, tags, functional } = doc;
            const { deprecated, author, since, version, see, link, style } =
                tags || {};
            const component = getComponent(fileName);
            const requires = !component || IGNORE.indexOf(component) >= 0;
            return `
${!isSubComponent ? `
---
title: ${displayName}
---
# ${deprecated ? `~~${displayName}~~` : displayName}
` : ""}
${requires ? "" : 
`<div class="vp-doc">
${deprecated ? `> **Deprecated** ${deprecated[0].description}\n` : ""}
${description ? "> " + description : ""}
${functional ? renderedUsage.functionalTag : ""}
${author ? author.map((a) => `Author: ${a.description}\n`) : ""}
${since ? `Since: ${since[0].description}\n` : ""}
${version ? `Version: ${version[0].description}\n` : ""}
${see ? see.map((s) => `[See](${s.description})\n`) : ""}
${link ? link.map((l) => `[See](${l.description})\n`) : ""}
<Carbon />
</div>`
}
${!isSubComponent ? `
<div class="vp-example">
${tmplExamples(component)}
</div>
<div class="vp-example">
${tmplClassProps(config, component)}
</div>
` : ""
}
<div class="vp-doc">
${tmplProps(renderedUsage.props, component)}
${renderedUsage.methods}
${renderedUsage.events}
${renderedUsage.slots}
</div>
${requiresMd.length ? requiresMd.map(component => component.content).join(' ') : ''}
<div class="vp-doc">
${style ? tmplThemeStyle(config, style[0].description) : ""}
</div>`;
        },
    },
};

function tmplExamples(name) {
    return `
## Examples

${"<example-" + name.toLowerCase() + " />"}
`;
}

function tmplClassProps(config, name) {
    name = name.toLowerCase();
    try {
        name = NAME_FOLDER_MAPPING[name] ? NAME_FOLDER_MAPPING[name] : name;
        return `
## Class props

<inspector-${name}-viewer />
`;
    } catch (err) {
        return "";
    }
}

function tmplProps(props, name) {
    const tag  = name.match(/[A-Z][a-z]+/g).join("-").toLowerCase();
    let ret = `
## ${name} component

\`\`\`html
<o-${tag}></o-${tag}> 
\`\`\`

### Props

| Prop name     | Description | Type      | Values      | Default     |
| ------------- |-------------| --------- | ----------- | ----------- |
`;
    props.sort((propa, propb) =>
        propa.name < propb.name ? -1 : propa.name > propb.name ? 1 : 0,
    );

    props.forEach((pr) => {
        const p = pr.name;
        if (p.endsWith("Class") || p.endsWith("Classes")) {
            if (!(IGNORE_CLASSES[name.toLowerCase()] && IGNORE_CLASSES[name.toLowerCase()].indexOf(p) >= 0)) 
                return;
        }
        const n = pr.type && pr.type.name ? pr.type.name : "";
        let d = pr.defaultValue && pr.defaultValue.value ? pr.defaultValue.value : "";
        const v = pr.values ? pr.values.map((pv) => `\`${pv}\``).join(", ") : "-";
        const t = pr.description ? pr.description : "";

        if (
            d.indexOf("getValueByPath") >= 0 &&
            d.indexOf("const ") < 0 &&
            d.indexOf("if ") < 0 &&
            d.indexOf("else ") < 0
        ) {
            const params = d
                .substring(d.lastIndexOf("("), d.lastIndexOf(")"))
                .split(",");
            let configParts = null;
            if (params.length > 3) {
                // In case last param contains a ','
                params[2] = params.slice(2).join(",");
            }
            if (params[1]) {
                configParts = params[1].split(".");
            }
            if (configParts && configParts[0] && configParts[1]) {
                const value = `${configParts[1].replace(/'/g, "")}: ${params[2]}`;
                d = `<div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>${configParts[0].replace(/'/g,"")}: {<br>&nbsp;&nbsp;${value}<br>}</code>`;
            }
            if (configParts && configParts.length == 1) {
                const value = `${configParts[0].replace(/'/g, "")}: ${params[2]}`;
                d = `<div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;${value}<br>}</code>`;
            }
        }

        d = d.includes("=>") ? "Default function (see source code)" : d;

        ret += `| ${mdclean(p)} | ${mdclean(t)} | ${mdclean(n)} | ${mdclean(v)} | ${d} |` + "\n";
    });
    return ret;
}

function tmplThemeStyle(config, name) {
    const renderThemeVariables = (theme) => {
        const noStyle = `<p>The theme does not have any custom variables for this component.</p>`;
        const componentPath = `${theme.path}/scss/components/${name}`;
        if (!fs.existsSync(componentPath)) return noStyle;
        const cssFile = path.resolve(config.cwd, componentPath);
        const content = fs.readFileSync(cssFile, "utf8");
        const docsRegex = "/* @docs */";
        if (!content.includes(docsRegex)) return noStyle;
        const docs = content.substring(
            content.indexOf(docsRegex) + docsRegex.length,
            content.lastIndexOf(docsRegex),
        );
        const variables = docs
            .replace(/(\r\n|\n|\r)/gm, "")
            .split(";")
            .filter((d) => !!d);

        return ` 
| SASS Variable  | Default |
| -------------- | ------- |
${variables
    .filter((variable) => variable.indexOf("@deprecated") < 0)
    .map((variable) => {
        const keyValue = variable.split(":");
        const varName = keyValue[0].trim();
        const varValue = keyValue[1].replace('!default', '').trim();
        return `| ${varName} | ${varValue} |`;
    })
    .join("\n")}


See ➜ 📄 [Full scss file](${theme.src}/scss/components/${name})
`;
    };

    return `
## Sass variables

${THEMES.map((theme) => 
`<div class="${theme.key}">

> Current theme ➜ _[${theme.label}](${theme.git})_ 

${renderThemeVariables(theme)}
</div>`,
).join("")}
`;
}


function createThemeDocs(){        
    THEMES.map((theme) => {
        let componentPath = `${theme.path}/scss/utils/_variables.scss`;
        if (!fs.existsSync(componentPath))
            componentPath = `${theme.path}/scss/utilities/_variables.scss`;
        if (!fs.existsSync(componentPath)) 
            componentPath = `${theme.path}/scss/components/utils/_variables.scss`;
        if (!fs.existsSync(componentPath)) {
            const noStyle = `<p>The theme does not have any custom variables for this component.</p>`;
            fs.writeFileSync(`./themes/${theme.key}.md`, noStyle);
            return;
        }
        const cssFile = path.resolve(componentPath);
        const content = fs.readFileSync(cssFile, "utf8");
        const file = content
                    // split file 
                    .split(/(\r\n|\n|\r)/gm)
                    // remove commands and empty rows
                    .filter((d) => !d.match(/(?:@use|\*{2}|\*{1}\s|\/\*)/) && !d.match(/(\r\n|\n|\r)/));
        // remove starting empty lines
        while(file[0] == "")
            file.shift();
        // remove ending empty lines
        while(file[file.length-1] == "")
            file.pop();

const md = 
`<div class="${theme.key}">

> Current theme ➜ _[${theme.label}](${theme.git})_ 

\`\`\`scss
${file.join("\n")}
\`\`\`

See ➜ 📄 [SCSS files](${theme.src}/scss/)
</div>
`;
        fs.writeFileSync(`./themes/${theme.key}.md`, md);
})
}
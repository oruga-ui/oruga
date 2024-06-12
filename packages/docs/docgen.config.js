/* eslint-disable @typescript-eslint/no-explicit-any */
import * as path from "path";
import * as fs from "fs";

import renderMethods from "vue-docgen-cli/lib/templates/methods.js";
import renderEvents from "vue-docgen-cli/lib/templates/events.js";
import renderSlots from "vue-docgen-cli/lib/templates/slots.js";
import { mdclean } from "vue-docgen-cli/lib/templates/utils.js";

// Import theme definitions
import { createRequire } from "module";
const require = createRequire(import.meta.url);
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
    "Inspector",
    "DatepickerTable",
    "DatepickerTableRow",
    "DatepickerMonth",
    "PickerWrapper",
    "PositionWrapper",
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
    return path
        .basename(Array.isArray(filename) ? filename[0] : filename)
        .replace(/\.vue$/, "");
};

createThemeDocs();

export default {
    componentsRoot: `../oruga/src/components`,
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
        methods: (methods) =>
            renderMethods.default(methods, { hasSubComponents: true }),
        events: (events) =>
            renderEvents.default(events, { hasSubComponents: true }),
        slots: (slots) =>
            renderSlots.default(slots, { hasSubComponents: true }),
        component: (
            renderedUsage,
            doc,
            config,
            fileName,
            requiresMd,
            { isSubComponent },
        ) => {
            const { displayName, description, tags, functional, docsBlocks } =
                doc;
            const { deprecated, author, since, version, see, link, style } =
                tags || {};
            const component = getComponent(fileName);
            const requires = !component || IGNORE.indexOf(component) >= 0;
            return `
${
    !isSubComponent
        ? `
---
title: ${displayName}
---
# ${deprecated ? `~~${displayName}~~` : displayName}
`
        : ""
}
${
    requires
        ? ""
        : `<div class="vp-doc">
${deprecated ? `> **Deprecated** ${deprecated[0].description}\n` : ""}
${description ? "> " + description : ""}
${functional ? renderedUsage.functionalTag : ""}
${author ? author.map((a) => `Author: ${a.description}\n`) : ""}
${since ? `Since: ${since[0].description}\n` : ""}
${version ? `Version: ${version[0].description}\n` : ""}
${see ? see.map((s) => `[See](${s.description})\n`) : ""}
${link ? link.map((l) => `[See](${l.description})\n`) : ""}
</div>
${docsBlocks ? docsBlocks : ""}
`
}
${
    !isSubComponent
        ? `
<div class="vp-example">
${tmplExamples(component)}
</div>
<div class="vp-example">
${tmplClassProps(config, component)}
</div>
`
        : ""
}
<div class="vp-doc">
${tmplProps(renderedUsage.props, component, description)}
${renderedUsage.methods}
${renderedUsage.events}
${renderedUsage.slots}
</div>
${
    requiresMd.length
        ? requiresMd.map((component) => component.content).join(" ")
        : ""
}
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

function tmplProps(props, name, description) {
    const tag = name
        .match(/[A-Z][a-z]+/g)
        .join("-")
        .toLowerCase();
    let ret = `
## ${name} component
${description ? "> " + description : ""}

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
        if (pr.tags?.ignore) return;

        const name = pr.name === "modelValue" ? "v-model" : pr.name;
        if (name.endsWith("Class") || name.endsWith("Classes")) {
            if (
                !(
                    IGNORE_CLASSES[name.toLowerCase()] &&
                    IGNORE_CLASSES[name.toLowerCase()].indexOf(name) >= 0
                )
            )
                return;
        }

        const type = pr.tags?.type
            ? pr.tags?.type[0].description
            : pr.type?.name
              ? pr.type.name
              : "";
        let value = pr.defaultValue?.value ? pr.defaultValue.value : "";
        const values = pr.values
            ? pr.values.map((pv) => `\`${pv}\``).join(", ")
            : "-";
        const description = pr.description ? pr.description : "";

        if (value === "undefined") value = "";
        else if (
            value.indexOf("getOption") >= 0 &&
            value.indexOf("const ") < 0 &&
            value.indexOf("if ") < 0 &&
            value.indexOf("else ") < 0
        ) {
            let configParts = null;
            const clear = (s) => s.replace(/'|"/g, "");
            // get default params
            value = value.replace(/\r\n/g, "");
            let f = "";
            if (value.includes("getOption("))
                f = value.substring(
                    value.lastIndexOf("getOption(") + "getOption(".length,
                );
            else if (value.includes("getOption<"))
                f = value.substring(value.indexOf(">(") + ">(".length);

            // remove new line (+)
            value = value.replace(/=>(.*?)getOption/g, "=> getOption");
            // remove function prop invokation
            if (f.lastIndexOf("(") > 0) f = f.substring(0, f.lastIndexOf("("));
            if (f.lastIndexOf(")") > 0) f = f.substring(0, f.lastIndexOf(")"));
            const params = f.split(", ");
            if (params.length >= 3) {
                // In case last param contains a ','
                params[1] = params.slice(1).join(",");
            }
            if (params[0]) {
                configParts = params[0].trim().split(".");
            }
            if (configParts && configParts[0] && configParts[1]) {
                const config = `${clear(configParts[1])}: ${params[1]}`;
                value = `<div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>${clear(
                    configParts[0],
                )}: {<br>&nbsp;&nbsp;${config}<br>}</code>`;
            } else if (configParts && configParts.length == 1) {
                const config = `${clear(configParts[0])}: ${params[1]}`;
                value = `<div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;${config}<br>}</code>`;
            }
        } else if (value.includes("=>")) {
            value = "Default function (see source code)";
        } else {
            value = `<code style='white-space: nowrap; padding: 0;'>${value}</code>`;
        }

        ret +=
            `| ${mdclean(name)} | ${mdclean(description)} | ${mdclean(type)} | ${mdclean(values)} | ${value} |` +
            "\n";
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
        const varValue = keyValue[1].replace("!default", "").trim();
        return `| ${varName} | ${varValue} |`;
    })
    .join("\n")}


See ➜ 📄 [Full scss file](${theme.src}/scss/components/${name})
`;
    };

    return `
## Sass variables

${THEMES.map(
    (theme) =>
        `<div class="${theme.key}">

> Current theme ➜ _[${theme.label}](${theme.git})_

${renderThemeVariables(theme)}
</div>`,
).join("")}
`;
}

function createThemeDocs() {
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
            .filter(
                (d) =>
                    !d.match(/(?:@use|\*{2}|\*{1}\s|\/\*)/) &&
                    !d.match(/(\r\n|\n|\r)/),
            );
        // remove starting empty lines
        while (file[0] == "") file.shift();
        // remove ending empty lines
        while (file[file.length - 1] == "") file.pop();

        const md = `<div class="${theme.key}">

> Current theme ➜ _[${theme.label}](${theme.git})_

\`\`\`scss
${file.join("\n")}
\`\`\`

See ➜ 📄 [SCSS files](${theme.src}/scss/)
</div>
`;
        fs.writeFileSync(`./themes/${theme.key}.md`, md);
    });
}

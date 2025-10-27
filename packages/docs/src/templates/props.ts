import type { ComponentDoc, ParamTag, PropDescriptor } from "vue-docgen-api";
import {
    type SubTemplateOptions,
    mdclean,
} from "vue-docgen-cli/lib/compileTemplates";

// Classes which will be shown in props
const IGNORE_CLASSES: Record<string, string[]> = {
    icon: ["customClass"],
    table: ["rowClass"],
};

function formatValue(value: string): string {
    if (!value || value === "undefined") value = "";
    else if (
        value.includes("getDefault") &&
        !value.includes("const ") &&
        !value.includes("if ") &&
        !value.includes("else ")
    ) {
        let configParts: string[] | null = null;

        const clear = (s: string): string => s.replace(/'|"/g, "");
        // get default params
        value = value.replace(/\r\n/g, "").replaceAll("\n", "");
        let f = "";
        if (value.includes("getDefault("))
            f = value.substring(
                value.lastIndexOf("getDefault(") + "getDefault(".length,
            );
        else if (value.includes("getDefault<"))
            f = value.substring(value.indexOf(">(") + ">(".length);

        // remove new line (+)
        value = value.replace(/=>(.*?)getDefault/g, "=> getDefault");
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

    return value;
}

export function renderer(
    descriptors: PropDescriptor[],
    opt: SubTemplateOptions,
    doc: ComponentDoc,
): string {
    const name = doc.name;
    const props = descriptors;

    const tag = (name.match(/[A-Z][a-z]+/g) || []).join("-").toLowerCase();

    // sort props by name
    props.sort((propa, propb) =>
        propa.name < propb.name ? -1 : propa.name > propb.name ? 1 : 0,
    );

    const tableHead = `
### Props

| Prop name     | Description | Type      | Values      | Default     |
| ------------- |-------------| --------- | ----------- | ----------- |
`;

    const tableRows = props.map((prop: PropDescriptor): string => {
        if (prop.tags?.ignore) return "";

        // prop name
        let name = prop.name === "modelValue" ? "v-model" : mdclean(prop.name);
        // filter class props
        if (name.endsWith("Class") || name.endsWith("Classes")) {
            if (!IGNORE_CLASSES[tag]?.includes(name)) return "";
        }

        // prop description
        let description = mdclean(prop.description ?? "");

        // add deprecation information
        if (prop.tags?.deprecated) {
            const deprecated = mdclean(
                String((prop.tags.deprecated[0] as ParamTag).description),
            );
            name = `<s> ${name} </s>`;
            description = `${description} - ${deprecated}`;
        }

        // extract special type defintions
        let type = prop.tags?.type
            ? String((prop.tags?.type[0] as ParamTag).description)
            : prop.type?.name
              ? prop.type.name
              : "-";

        // if type has multiple values, sort type
        if (type.includes(" | ") && !type.includes("("))
            type = type
                .split(" | ")
                .sort((a, b) => a.localeCompare(b))
                .join(" | ");

        // epxlicit defined prop values
        const values = prop.values
            ? prop.values.map((pv) => `\`${pv}\``).join(", ")
            : "-";

        // formated prop default value
        const value = formatValue(prop.defaultValue?.value ?? "");

        // prop table row
        return `| ${name} | ${description} | ${mdclean(type)} | ${mdclean(values)} | ${value} |`;
    });

    return tableHead + tableRows.filter((p) => !!p).join("\n");
}

export default renderer;

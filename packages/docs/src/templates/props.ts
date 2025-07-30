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

export function renderer(
    descriptor: PropDescriptor[],
    opt: SubTemplateOptions,
    doc: ComponentDoc,
): string {
    const name = doc.name;
    const props = descriptor;

    const tag = (name.match(/[A-Z][a-z]+/g) || []).join("-").toLowerCase();
    let ret = `
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
            if (!IGNORE_CLASSES[tag]?.includes(name)) return;
        }

        let type = pr.tags?.type
            ? String((pr.tags?.type[0] as ParamTag).description)
            : pr.type?.name
              ? pr.type.name
              : "";

        // if type has multiple values, sort type
        if (type.includes(" | ") && !type.includes("("))
            type = type
                .split(" | ")
                .sort((a, b) => a.localeCompare(b))
                .join(" | ");

        let value = pr.defaultValue?.value ? pr.defaultValue.value : "";
        const values = pr.values
            ? pr.values.map((pv) => `\`${pv}\``).join(", ")
            : "-";
        const description = pr.description ? pr.description : "";

        if (value === "undefined") value = "";
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

        ret +=
            `| ${mdclean(name)} | ${mdclean(description)} | ${mdclean(type)} | ${mdclean(values)} | ${value} |` +
            "\n";
    });
    return ret;
}

export default renderer;

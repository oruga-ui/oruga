import type { ParamTag, SlotDescriptor } from "vue-docgen-api";
import { mdclean } from "vue-docgen-cli/lib/compileTemplates";

function formatParams(params: SlotDescriptor["bindings"]): string {
    if (!params) return "";

    return params
        .map((tag) => {
            const { name, description, type } = tag;
            if (!type) return `**${name}** - ${description}`;
            return `**${name}** \`${
                type.name === "union" && type.elements
                    ? type.elements
                          .map(({ name: insideName }) => insideName)
                          .join(", ")
                    : type.name
            }\` - ${description}`;
        })
        .join("\n");
}

export function renderer(descriptor: SlotDescriptor[]): string {
    if (!descriptor.length) return "";
    const slots = descriptor;

    const tableHead = `
### Slots

| Name          | Description  | Bindings |
| ------------- | ------------ | -------- |
`;
    const tableRows = slots.map((slot) => {
        // use `defineSlots` params tags when available; else use default template binding syntax
        const params =
            slot.tags && slot.tags["params"]
                ? slot.tags["params"]
                : slot.bindings;

        const readableBindings = slot.bindings ? `${formatParams(params)}` : "";

        // slot name
        let name = mdclean(slot.name);

        // slot description
        let description = mdclean(slot.description ?? "");

        // add deprecation information
        if (slot.tags?.deprecated) {
            const deprecated = mdclean(
                String((slot.tags.deprecated[0] as ParamTag).description),
            );
            name = `<s>${name}</s>`;
            description = `<div><b>deprecated</b> - ${deprecated}</div><div><s>${description}</s></div>`;
        }

        return `| ${name} | ${description} | ${mdclean(readableBindings)} |`;
    });

    return tableHead + tableRows.filter((p) => !!p).join("\n");
}

export default renderer;

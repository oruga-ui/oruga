import type { SlotDescriptor } from "vue-docgen-api";
import { mdclean } from "vue-docgen-cli/lib/compileTemplates";

function formatParams(params: SlotDescriptor["bindings"]): string {
    if (!params) return "";

    return params
        .map((tag) => {
            const { name, description, type } = tag;
            if (!type) return `**${name}** - ${description}`;
            return `**${name}** \`${type.name}\` - ${description}`;
        })
        .join("\n");
}

export function renderer(descriptor: SlotDescriptor[]): string {
    if (!descriptor.length) return "";
    const slots = descriptor;

    let ret = `
### Slots

| Name          | Description  | Bindings |
| ------------- | ------------ | -------- |
`;
    slots.map((slot) => {
        const { description, tags, name, bindings } = slot;

        // use `defineSlots` params tags when available; else use default template binding syntax
        const params = tags && tags["params"] ? tags["params"] : bindings;

        const readableBindings = bindings ? `${formatParams(params)}` : "";

        ret +=
            `| ${mdclean(name)} | ${mdclean(description || "")} | ${mdclean(readableBindings)} |` +
            "\n";
    });

    return ret;
}

export default renderer;

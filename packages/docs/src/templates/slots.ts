import type { ParamTag, SlotDescriptor } from "vue-docgen-api";
import { mdclean } from "vue-docgen-cli/lib/compileTemplates";

function formatParams(tags: SlotDescriptor["tags"]): string {
    if (!tags || (!tags["params"] && !tags["bindings"])) return "";
    const params = (tags["params"] ?? tags["bindings"]) as ParamTag[];

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
        const { description, tags, name } = slot;
        const readableBindings = tags ? `${formatParams(tags)}` : "";

        ret +=
            `| ${mdclean(name)} | ${mdclean(description || "")} | ${mdclean(readableBindings)} |` +
            "\n";
        // replace returns by <br> to allow them in a table cell
    });

    return ret;
}

export default renderer;

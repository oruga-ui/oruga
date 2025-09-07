import type { ParamTag, SlotDescriptor } from "vue-docgen-api";
import { mdclean, type SubTemplateOptions } from "vue-docgen-cli/lib/compileTemplates";

function formatParams(tags: SlotDescriptor['tags']) : string {
    console.log(tags)
	if (!tags || (!tags["params"] && !tags["bindings"])) return ''
	const paramns = (tags["params"] ?? tags["bindings"]) as ParamTag[];

    return paramns.map(tag => {
			const { name, description, type } = tag;
			if (!type) return ''

			return `**${name}** \`${
				type.name === 'union' && type.elements
					? type.elements.map(({ name: insideName }) => insideName).join(', ')
					: type.name
			}\` - ${description}`
		})
		.join('\n')
}


export function renderer(descriptor: SlotDescriptor[],
    opt: SubTemplateOptions): string {
    if (!descriptor.length) return "";
        const slots = descriptor;

    let ret = `
### Slots

| Name          | Description  | Bindings |
| ------------- | ------------ | -------- |
`;
    slots
    .map(slot => {
        const { description, tags, name } = slot
        console.log(slot);
        const readableBindings = tags ? `${formatParams(tags)}` : ''

        ret += `| ${mdclean(name)} | ${mdclean(description || '')} | ${mdclean(readableBindings)} |` // replace returns by <br> to allow them in a table cell
        +
            "\n";
    })

    return ret;
}

export default renderer;

import type { SlotDescriptor } from "vue-docgen-api";
import {
    type SubTemplateOptions,
    slots as renderSlots,
} from "vue-docgen-cli/lib/compileTemplates";

export function renderer(
    descriptor: SlotDescriptor[],
    opt: SubTemplateOptions = {},
): string {
    // use default slots renderer
    return renderSlots(descriptor, opt);
}

export default renderer;

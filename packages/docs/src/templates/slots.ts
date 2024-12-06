import type { SlotDescriptor } from "vue-docgen-api";
import { slots as renderSlots } from "vue-docgen-cli/lib/compileTemplates";

export function renderer(descriptor: SlotDescriptor[]): string {
    if (!descriptor.length) return "";

    // use default slots renderer
    return renderSlots(descriptor, { hasSubComponents: true });
}

export default renderer;

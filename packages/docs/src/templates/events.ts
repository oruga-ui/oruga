import type { EventDescriptor } from "vue-docgen-api";
import { events as renderEvents } from "vue-docgen-cli/lib/compileTemplates";

export function renderer(descriptor: EventDescriptor[]): string {
    if (!descriptor.length) return "";

    // use default events renderer
    return renderEvents(descriptor, { hasSubComponents: true });
}

export default renderer;

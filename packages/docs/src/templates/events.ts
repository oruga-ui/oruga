import type { EventDescriptor } from "vue-docgen-api";
import {
    type SubTemplateOptions,
    events as renderEvents,
} from "vue-docgen-cli/lib/compileTemplates";

export function renderer(
    descriptor: EventDescriptor[],
    opt: SubTemplateOptions = {},
): string {
    // use default events renderer
    return renderEvents(descriptor, opt);
}

export default renderer;

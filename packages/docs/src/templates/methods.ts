import type { MethodDescriptor } from "vue-docgen-api";
import {
    type SubTemplateOptions,
    methods as renderMethods,
} from "vue-docgen-cli/lib/compileTemplates";

export function renderer(
    descriptor: MethodDescriptor[],
    opt: SubTemplateOptions = {},
): string {
    // use default methods renderer
    return renderMethods(descriptor, opt);
}

export default renderer;

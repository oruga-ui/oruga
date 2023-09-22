import type { ComponentObjectPropsOptions } from "vue";

export function useClassProps(classes: string[]): ComponentObjectPropsOptions {
    return classes
        .map((c) => ({
            [c]: { type: [String, Function, Array], default: undefined },
        }))
        .reduce((a, b) => Object.assign(a, b), {});
}

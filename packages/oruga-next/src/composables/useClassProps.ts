import type { Prop } from "vue";

/** Define a list of classes as probs to a component */
export function useClassProps(classes: string[]): ClassPropRecord {
    return classes
        .map((c) => ({
            [c]: {
                type: [String, Function, Array],
                default: undefined,
            },
        }))
        .reduce((a, b) => Object.assign(a, b), {});
}

export type ClassPropRecord<T = Record<string, ClassProp>> = {
    [K in keyof T]: ClassProp;
};

type ClassProp = Prop<string | Function | Array<string>, undefined>;

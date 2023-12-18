// import type { Prop } from "vue";
import type { ClassFunction, InstanceClassDefinition } from "@/types";

/** Define a list of classes as probs to a component */
export function useClassProps<T extends string[]>(classes: T): ArrayAsProps<T> {
    return classes
        .map((c) => ({
            [c]: {
                type: [String, Array, Function as ClassFunction],
                default: undefined,
            },
        }))
        .reduce((a, b) => Object.assign(a, b), {});
}

type ArrayAsProps<T extends string[]> = {
    [K in T[number]]: {
        type: InstanceClassDefinition;
        default: undefined;
    };
};

// export type ClassPropRecord<T = Record<string, ClassProp>> = {
//     [K in keyof T]: ClassProp;
// };

// type ClassProp = Prop<string | Function | Array<string>, undefined>;

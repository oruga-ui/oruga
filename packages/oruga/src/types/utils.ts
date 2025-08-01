import type { Component, EmitsToProps } from "vue";
import type { ComponentEmit } from "vue-component-type-helpers";

export type Booleanish = boolean | "true" | "false";
export type Numberish = number | string;

export type ClassBind = {
    [x: string]: boolean;
};

/** Vue native type which a v-bind prop must have */
export type PropBind =
    | string
    | {
          [x: string]: string;
      }
    | {
          [x: string]: boolean;
      };

/** Vue native dynamic component 'is' property value type */
export type DynamicComponent = string | object | CallableFunction | Component;

/** Define a property as required */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/** Remove generic <[x: string]: any> index signature structure from type */
export type RemoveIndex<T> = {
    [K in keyof T as string extends K
        ? never
        : number extends K
          ? never
          : symbol extends K
            ? never
            : K]: T[K];
};

/** Custom type helper which extracts the `$emits` type of an component and converts it to an props object. */
export type ComponentEmits<C> = EmitsToProps<ComponentEmit<C>>;

/** Extracts the type of property `K` in object `T`. */
type TypeOfKey<T, K extends string> = K extends keyof T ? T[K] : unknown;

/**
 * Extracts the type of a deep property `K` within an object `T`.
 * Property `K` can be defined as a property path with `.` seperator.
 */
export type DeepType<T, K> = T extends object
    ? K extends string
        ? K extends `${infer F}.${infer R}`
            ? DeepType<TypeOfKey<T, F>, R>
            : TypeOfKey<T, K>
        : T
    : T;

/**
 * Defines a list of property paths for each property and deep property of an object `T`.
 * @source https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
 */
export type DeepKeys<T> =
    | (T extends object
          ? {
                [K in keyof T]-?: K extends string | number
                    ? Required<T>[K] extends object
                        ? `${K}` | `${K}.${DeepKeys<T[K]>}`
                        : `${K}`
                    : never;
            }[keyof T & string]
          : never)
    | (keyof T & string);

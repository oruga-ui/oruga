import type { Component } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";

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

/** Define a property as  required */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * Extract all properties of an object which starts with an `on` prefix.
 * It also cuts the `on` prefix and lowercase the first char.
 */
type ComponentEmitsByProps<T> = {
    [K in keyof T as K extends `on${infer S}`
        ? S extends `${infer First}${infer Rest}`
            ? `${Lowercase<First>}${Rest}`
            : S
        : never]: T[K];
};

/**
 * Custom ComponentEmits helper which defines the emits as object.
 *
 * Because the `ComponentEmits` from "vue-component-type-helpers" does not export the emits as an object but as:
 * `((event: "close", ...args: any[]) => void) | undefined`
 */
export type ComponentEmits<C> = ComponentEmitsByProps<ComponentProps<C>>;

/** Extracts the type of property `K` in object `T`. */
type TypeOfKey<T, K extends string> = K extends keyof T ? T[K] : unknown;

/**
 * Extracts the type of a deep property `K` within an object `T`.
 * `K` can be defined as property path with `.` seperator.
 */
export type DeepType<T, K> = T extends object
    ? K extends string
        ? K extends `${infer F}.${infer R}`
            ? DeepType<TypeOfKey<T, F>, R>
            : TypeOfKey<T, K>
        : T
    : T;

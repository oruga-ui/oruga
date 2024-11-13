import type { Component } from "vue";

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

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

type TypeOfKey<T, K extends string> = K extends keyof T ? T[K] : unknown;

export type DeepType<T, K> = T extends object
    ? K extends string
        ? K extends `${infer F}.${infer R}`
            ? DeepType<TypeOfKey<T, F>, R>
            : TypeOfKey<T, K>
        : T
    : T;

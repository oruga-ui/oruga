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

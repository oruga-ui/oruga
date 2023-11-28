import type { Component } from "vue";

/** Vue native type which a v-bind prop must have */
export type PropBind = (
    | string
    | {
          [x: string]: string;
      }
    | {
          [x: string]: boolean;
      }
)[];

/** Vue native dynamic component is property value type */
export type DynamicComponent = string | object | CallableFunction | Component;

import type { ComponentProps } from "vue-component-type-helpers";

import Select from "./Select.vue";

export type SelectProps = ComponentProps<typeof Select>;

/**
 * Options should always be formatted as an array of objects with label and value
 * properties.
 */
export type OptionsItem<T = unknown> = {
    label: string;
    value: T;
    attrs?: {
        disabled?: boolean;
    } & Record<string, any>;
    [index: string]: any;
};

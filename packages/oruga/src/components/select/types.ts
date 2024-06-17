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

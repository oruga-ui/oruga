/**
 * Options should always be formatted as an array of objects with label and value
 * properties.
 */
export type OptionsItem<V = unknown> = {
    label: string;
    value: V;
    attrs?: {
        disabled?: boolean;
    } & Record<string, any>;
    [index: string]: any;
};

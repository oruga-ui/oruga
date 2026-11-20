import { inject, provide, type InjectionKey } from "vue";

import type { DatepickerProps } from "./props";

export type DatepickerContext = Omit<
    DatepickerProps,
    | "modelValue"
    | "formatter"
    | "parser"
    | "customValidity"
    | "range"
    | "multiple"
> & {
    range?: boolean;
    multiple?: boolean;
};

const datepickerKey: InjectionKey<Readonly<DatepickerContext>> =
    Symbol("Datepicker");

export function provideDatepickerProps(props: DatepickerContext): void {
    provide(datepickerKey, props);
}

export function injectDatepickerProps(): Readonly<DatepickerContext> {
    const props = inject(datepickerKey);
    if (!props)
        throw new Error(
            "Datepicker calendar components must be rendered inside ODatepicker.",
        );
    return props;
}

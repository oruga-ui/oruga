import type { ComponentProps } from "vue-component-type-helpers";
import Datepicker from "./Datepicker.vue";

export type DatepickerProps<
    IsRange extends boolean = false,
    IsMultiple extends boolean = false,
> = ComponentProps<typeof Datepicker<IsRange, IsMultiple>>;

export type DatepickerEvent = {
    date: Date;
    type?: string;
};

export type FocusedDate = {
    day: number;
    month: number;
    year: number;
};

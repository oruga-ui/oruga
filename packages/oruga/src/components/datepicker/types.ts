import type { ComponentProps } from "vue-component-type-helpers";
import Datepicker from "./Datepicker.vue";

export type DatepickerProps<T extends boolean> = ComponentProps<
    typeof Datepicker<T>
>;

export type DatepickerEvent = {
    date: Date;
    type?: string;
};

export type FocusedDate = {
    day: number;
    month: number;
    year: number;
};

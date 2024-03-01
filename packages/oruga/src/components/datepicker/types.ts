import type { ComponentProps } from "vue-component-type-helpers";
import Datepicker from "./Datepicker.vue";

export type DatepickerProps = ComponentProps<typeof Datepicker>;

export type DatepickerEvent = {
    date: Date;
    type?: string;
};

export type FocusedDate = {
    day: number;
    month: number;
    year: number;
};

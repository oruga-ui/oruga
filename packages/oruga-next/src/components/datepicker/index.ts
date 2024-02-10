import type { App, Plugin } from "vue";

import Datepicker from "./Datepicker.vue";

export type { DatepickerEvent, FocusedDate } from "./useDatepickerShare";

import { registerComponent } from "@/utils/plugins";

/** export datepicker plugin */
export default {
    install(app: App) {
        registerComponent(app, Datepicker);
    },
} as Plugin;

/** export datepicker components */
export { Datepicker as ODatepicker };

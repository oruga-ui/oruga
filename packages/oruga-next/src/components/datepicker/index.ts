import type { App, Plugin } from "vue";

import Datepicker from "./Datepicker.vue";

export type { DatepickerEvent, FocusedDate } from "./useDatepickerShare";

import { registerComponent } from "@/utils/plugins";

export default {
    install(app: App) {
        registerComponent(app, Datepicker);
    },
} as Plugin;

export { Datepicker as ODatepicker };

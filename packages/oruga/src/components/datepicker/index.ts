import type { App } from "vue";

import Datepicker from "./Datepicker.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export datepicker specific types */
export type { DatepickerEvent, FocusedDate } from "./types";

/** export datepicker plugin */
export default {
    install(app: App): void {
        registerComponent(app, Datepicker);
    },
} satisfies OrugaComponentPlugin;

/** export datepicker components */
export { Datepicker as ODatepicker };

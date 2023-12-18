import type { App, Plugin } from "vue";

import Timepicker from "./Timepicker.vue";

import { registerComponent } from "@/utils/plugins";

/** export timepicker specific types */
export type * from "./types";

/** export timepicker plugin */
export default {
    install(app: App) {
        registerComponent(app, Timepicker);
    },
} as Plugin;

/** export timepicker components */
export { Timepicker as OTimepicker };

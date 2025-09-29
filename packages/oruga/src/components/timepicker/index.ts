import type { App } from "vue";

import Timepicker from "./Timepicker.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export timepicker plugin */
export default {
    install(app: App) {
        registerComponent(app, Timepicker);
    },
} as OrugaComponentPlugin;

/** export timepicker components */
export { Timepicker as OTimepicker };

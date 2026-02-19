import type { App } from "vue";

import Timepicker from "./Timepicker.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export timepicker specific types */
export type * from "./props";

/** export timepicker plugin */
export default {
    install(app: App): void {
        registerComponent(app, Timepicker);
    },
} satisfies OrugaComponentPlugin;

/** export timepicker components */
export { Timepicker as OTimepicker };

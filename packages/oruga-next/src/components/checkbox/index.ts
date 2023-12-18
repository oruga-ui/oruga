import type { App, Plugin } from "vue";

import Checkbox from "./Checkbox.vue";

import { registerComponent } from "@/utils/plugins";

/** export checkbox specific types */
export type * from "./types";

/** export checkbox plugin */
export default {
    install(app: App) {
        registerComponent(app, Checkbox);
    },
} as Plugin;

/** export table components */
export { Checkbox as OCheckbox };

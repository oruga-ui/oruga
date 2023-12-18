import type { App, Plugin } from "vue";

import Switch from "./Switch.vue";

import { registerComponent } from "@/utils/plugins";

/** export switch specific types */
export type * from "./types";

/** export switch plugin */
export default {
    install(app: App) {
        registerComponent(app, Switch);
    },
} as Plugin;

/** export switch components */
export { Switch as OSwitch };

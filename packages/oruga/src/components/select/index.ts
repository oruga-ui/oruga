import type { App, Plugin } from "vue";

import Select from "./Select.vue";

import { registerComponent } from "@/utils/plugins";

/** export select specific types */
// no types to export here

/** export select plugin */
export default {
    install(app: App) {
        registerComponent(app, Select);
    },
} as Plugin;

/** export select components */
export { Select as OSelect };

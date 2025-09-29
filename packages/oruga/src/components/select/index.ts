import type { App } from "vue";

import Select from "./Select.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export select specific types */
// no types to export here

/** export select plugin */
export default {
    install(app: App) {
        registerComponent(app, Select);
    },
} as OrugaComponentPlugin;

/** export select components */
export { Select as OSelect };

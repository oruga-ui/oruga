import type { App } from "vue";

import Select from "./Select.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export select specific types */
export type * from "./props";

/** export select plugin */
export default {
    install(app: App): void {
        registerComponent(app, Select);
    },
} satisfies OrugaComponentPlugin;

/** export select components */
export { Select as OSelect };

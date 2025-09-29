import type { App } from "vue";

import Field from "./Field.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export field plugin */
export default {
    install(app: App) {
        registerComponent(app, Field);
    },
} as OrugaComponentPlugin;

/** export field components */
export { Field as OField };

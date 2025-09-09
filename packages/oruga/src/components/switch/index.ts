import type { App } from "vue";

import Switch from "./Switch.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export switch plugin */
export default {
    install(app: App) {
        registerComponent(app, Switch);
    },
} as OrugaComponentPlugin;

/** export switch components */
export { Switch as OSwitch };

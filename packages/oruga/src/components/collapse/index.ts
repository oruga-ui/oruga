import type { App } from "vue";

import Collapse from "./Collapse.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export collapse plugin */
export default {
    install(app: App) {
        registerComponent(app, Collapse);
    },
} as OrugaComponentPlugin;

/** export collapse components */
export { Collapse as OCollapse };

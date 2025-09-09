import type { App } from "vue";

import Tooltip from "./Tooltip.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export tooltip plugin */
export default {
    install(app: App) {
        registerComponent(app, Tooltip);
    },
} as OrugaComponentPlugin;

/** export tooltip components */
export { Tooltip as OTooltip };

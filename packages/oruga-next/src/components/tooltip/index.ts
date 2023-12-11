import type { App, Plugin } from "vue";

import Tooltip from "./Tooltip.vue";

import { registerComponent } from "@/utils/plugins";

/** export tooltip specific types */
export type * from "./types";

/** export tooltip plugin */
export default {
    install(app: App) {
        registerComponent(app, Tooltip);
    },
} as Plugin;

/** export tooltip components */
export { Tooltip as OTooltip };

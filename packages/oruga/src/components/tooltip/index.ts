import type { App } from "vue";

import Tooltip from "./Tooltip.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export tooltip specific types */
export type * from "./props";

/** export tooltip plugin */
export default {
    install(app: App): void {
        registerComponent(app, Tooltip);
    },
} satisfies OrugaComponentPlugin;

/** export tooltip components */
export { Tooltip as OTooltip };

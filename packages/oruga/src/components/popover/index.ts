import type { App } from "vue";

import Popover from "./Popover.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export popover specific types */
export type * from "./props";

/** export popover plugin */
export default {
    install(app: App): void {
        registerComponent(app, Popover);
    },
} satisfies OrugaComponentPlugin;

/** export popover components */
export { Popover as OPopover };

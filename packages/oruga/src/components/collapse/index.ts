import type { App } from "vue";

import Collapse from "./Collapse.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export collapse specific types */
export type * from "./props";

/** export collapse plugin */
export default {
    install(app: App): void {
        registerComponent(app, Collapse);
    },
} satisfies OrugaComponentPlugin;

/** export collapse components */
export { Collapse as OCollapse };

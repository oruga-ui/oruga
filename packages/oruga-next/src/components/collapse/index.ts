import type { App, Plugin } from "vue";

import Collapse from "./Collapse.vue";

import { registerComponent } from "@/utils/plugins";

/** export collapse specific types */
export type * from "./types";

/** export collapse plugin */
export default {
    install(app: App) {
        registerComponent(app, Collapse);
    },
} as Plugin;

/** export collapse components */
export { Collapse as OCollapse };

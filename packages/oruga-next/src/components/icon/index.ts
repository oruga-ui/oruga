import type { App, Plugin } from "vue";

import Icon from "./Icon.vue";

import { registerComponent } from "@/utils/plugins";

/** export icon specific types */
export type * from "./types";

/** export icon plugin */
export default {
    install(app: App) {
        registerComponent(app, Icon);
    },
} as Plugin;

/** export icon components */
export { Icon as OIcon };

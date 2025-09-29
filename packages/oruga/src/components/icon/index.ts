import type { App } from "vue";

import Icon from "./Icon.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export icon plugin */
export default {
    install(app: App) {
        registerComponent(app, Icon);
    },
} as OrugaComponentPlugin;

/** export icon components */
export { Icon as OIcon };

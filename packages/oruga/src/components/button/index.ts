import type { App } from "vue";

import Button from "./Button.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export button plugin */
export default {
    install(app: App) {
        registerComponent(app, Button);
    },
} as OrugaComponentPlugin;

/** export button components */
export { Button as OButton };

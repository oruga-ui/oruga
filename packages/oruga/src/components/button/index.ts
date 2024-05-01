import type { App, Plugin } from "vue";

import Button from "./Button.vue";

import { registerComponent } from "@/utils/plugins";

/** export button plugin */
export default {
    install(app: App) {
        registerComponent(app, Button);
    },
} as Plugin;

/** export button components */
export { Button as OButton };

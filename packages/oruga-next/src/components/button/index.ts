import type { App, Plugin } from "vue";

import Button from "./Button.vue";

import { registerComponent } from "@/utils/plugins";

/** export button specific types */
export type * from "./types";

/** export button plugin */
export default {
    install(app: App) {
        registerComponent(app, Button);
    },
} as Plugin;

/** export button components */
export { Button as OButton };

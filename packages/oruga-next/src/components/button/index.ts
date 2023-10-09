import type { App, Plugin } from "vue";

import Button from "./Button.vue";

import { registerComponent } from "@/utils/plugins";

export default {
    install(app: App) {
        registerComponent(app, Button);
    },
} as Plugin;

export { Button as OButton };

import type { App, Plugin } from "vue";

import Switch from "./Switch.vue";

import { registerComponent } from "../../utils/plugins";

export default {
    install(app: App) {
        registerComponent(app, Switch);
    },
} as Plugin;

export { Switch as OSwitch };

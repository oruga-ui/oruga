import type { App, Plugin } from "vue";

import Checkbox from "./Checkbox.vue";

import { registerComponent } from "@/utils/plugins";

export default {
    install(app: App) {
        registerComponent(app, Checkbox);
    },
} as Plugin;

export { Checkbox as OCheckbox };

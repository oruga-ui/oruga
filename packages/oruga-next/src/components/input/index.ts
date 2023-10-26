import type { App, Plugin } from "vue";

import Input from "./Input.vue";

import { registerComponent } from "@/utils/plugins";

/** export input plugin */
export default {
    install(app: App) {
        registerComponent(app, Input);
    },
} as Plugin;

/** export input components */
export { Input as OInput };

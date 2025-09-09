import type { App } from "vue";

import Input from "./Input.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export input specific types */
// no types to export here

/** export input plugin */
export default {
    install(app: App) {
        registerComponent(app, Input);
    },
} as OrugaComponentPlugin;

/** export input components */
export { Input as OInput };

import type { App } from "vue";
import Checkbox from "./Checkbox.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export checkbox plugin */
export default {
    install(app: App) {
        registerComponent(app, Checkbox);
    },
} as OrugaComponentPlugin;

/** export table components */
export { Checkbox as OCheckbox };

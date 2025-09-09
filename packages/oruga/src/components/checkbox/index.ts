import type { App } from "vue";
import Checkbox from "./Checkbox.vue";

import { registerComponent } from "@/utils/plugins";

/** export checkbox plugin */
export default {
    install(app: App) {
        registerComponent(app, Checkbox);
    },
} as OrugaComponentPlugin;

/** export table components */
export { Checkbox as OCheckbox };

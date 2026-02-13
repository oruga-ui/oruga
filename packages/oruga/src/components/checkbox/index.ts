import type { App } from "vue";
import Checkbox from "./Checkbox.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export checkbox plugin */
export default {
    install(app: App): void {
        registerComponent(app, Checkbox);
    },
} satisfies OrugaComponentPlugin;

/** export table components */
export { Checkbox as OCheckbox };

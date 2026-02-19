import type { App } from "vue";

import Switch from "./Switch.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export switch specific types */
export type * from "./props";

/** export switch plugin */
export default {
    install(app: App): void {
        registerComponent(app, Switch);
    },
} satisfies OrugaComponentPlugin;

/** export switch components */
export { Switch as OSwitch };

import type { App } from "vue";

import Datetimepicker from "./Datetimepicker.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export datetimepicker specific types */
export type * from "./props";

/** export datetimepicker plugin */
export default {
    install(app: App): void {
        registerComponent(app, Datetimepicker);
    },
} satisfies OrugaComponentPlugin;

/** export datetimepicker components */
export { Datetimepicker as ODatetimepicker };

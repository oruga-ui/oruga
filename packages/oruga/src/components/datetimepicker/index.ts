import type { App } from "vue";

import Datetimepicker from "./Datetimepicker.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export datetimepicker plugin */
export default {
    install(app: App) {
        registerComponent(app, Datetimepicker);
    },
} as OrugaComponentPlugin;

/** export datetimepicker components */
export { Datetimepicker as ODatetimepicker };

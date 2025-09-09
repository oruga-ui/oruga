import type { App } from "vue";

import Radio from "./Radio.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export radio plugin */
export default {
    install(app: App) {
        registerComponent(app, Radio);
    },
} as OrugaComponentPlugin;

/** export radio components */
export { Radio as ORadio };

import type { App } from "vue";

import Taginput from "./Taginput.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export taginput plugin */
export default {
    install(Vue: App) {
        registerComponent(Vue, Taginput);
    },
} as OrugaComponentPlugin;

/** export taginput components */
export { Taginput as OTaginput };

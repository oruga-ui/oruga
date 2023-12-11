import type { App, Plugin } from "vue";

import Taginput from "./Taginput.vue";

import { registerComponent } from "@/utils/plugins";

/** export taginput specific types */
export type * from "./types";

/** export taginput plugin */
export default {
    install(Vue: App) {
        registerComponent(Vue, Taginput);
    },
} as Plugin;

/** export taginput components */
export { Taginput as OTaginput };

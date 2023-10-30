import type { App, Plugin } from "vue";

import Taginput from "./Taginput.vue";

import { registerComponent } from "@/utils/plugins";

export default {
    install(Vue: App) {
        registerComponent(Vue, Taginput);
    },
} as Plugin;

export { Taginput as OTaginput };

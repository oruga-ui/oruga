import type { App, Plugin } from "vue";

import Radio from "./Radio.vue";

import { registerComponent } from "@/utils/plugins";

export default {
    install(app: App) {
        registerComponent(app, Radio);
    },
} as Plugin;

export { Radio as ORadio };

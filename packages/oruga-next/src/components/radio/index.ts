import type { App, Plugin } from "vue";

import Radio from "./Radio.vue";

import { registerComponent } from "@/utils/plugins";

/** export radio specific types */
export type * from "./types";

/** export radio plugin */
export default {
    install(app: App) {
        registerComponent(app, Radio);
    },
} as Plugin;

/** export radio components */
export { Radio as ORadio };

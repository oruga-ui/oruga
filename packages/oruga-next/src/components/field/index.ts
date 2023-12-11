import type { App, Plugin } from "vue";

import Field from "./Field.vue";

import { registerComponent } from "@/utils/plugins";

/** export field specific types */
export type * from "./types";

/** export field plugin */
export default {
    install(app: App) {
        registerComponent(app, Field);
    },
} as Plugin;

/** export field components */
export { Field as OField };

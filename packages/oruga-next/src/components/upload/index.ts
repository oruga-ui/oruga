import type { App, Plugin } from "vue";

import Upload from "./Upload.vue";

import { registerComponent } from "@/utils/plugins";

/** export upload specific types */
export type * from "./types";

/** export upload plugin */
export default {
    install(app: App) {
        registerComponent(app, Upload);
    },
} as Plugin;

/** export upload components */
export { Upload as OUpload };

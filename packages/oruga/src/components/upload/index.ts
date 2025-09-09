import type { App } from "vue";

import Upload from "./Upload.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export upload plugin */
export default {
    install(app: App) {
        registerComponent(app, Upload);
    },
} as OrugaComponentPlugin;

/** export upload components */
export { Upload as OUpload };

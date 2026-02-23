import type { App } from "vue";

import Upload from "./Upload.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export upload specific types */
export type * from "./props";

/** export upload plugin */
export default {
    install(app: App): void {
        registerComponent(app, Upload);
    },
} satisfies OrugaComponentPlugin;

/** export upload components */
export { Upload as OUpload };

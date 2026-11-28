import type { App } from "vue";

import Progress from "./Progress.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export progress specific types */
export type * from "./props";

/** export progress plugin */
export default {
    install(app: App): void {
        registerComponent(app, Progress);
    },
} satisfies OrugaComponentPlugin;

/** export progress components */
export { Progress as OProgress };

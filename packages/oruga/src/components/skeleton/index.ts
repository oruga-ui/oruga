import type { App } from "vue";

import Skeleton from "./Skeleton.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export skeleton plugin */
export default {
    install(app: App) {
        registerComponent(app, Skeleton);
    },
} as OrugaComponentPlugin;

/** export skeleton components */
export { Skeleton as OSkeleton };

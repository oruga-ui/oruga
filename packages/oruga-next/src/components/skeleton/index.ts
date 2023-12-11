import type { App, Plugin } from "vue";

import Skeleton from "./Skeleton.vue";

import { registerComponent } from "@/utils/plugins";

/** export skeleton specific types */
export type * from "./types";

/** export skeleton plugin */
export default {
    install(app: App) {
        registerComponent(app, Skeleton);
    },
} as Plugin;

/** export skeleton components */
export { Skeleton as OSkeleton };

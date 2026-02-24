import type { App } from "vue";

import Skeleton from "./Skeleton.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export skeleton specific types */
export type * from "./props";

/** export skeleton plugin */
export default {
    install(app: App): void {
        registerComponent(app, Skeleton);
    },
} satisfies OrugaComponentPlugin;

/** export skeleton components */
export { Skeleton as OSkeleton };

import type { App } from "vue";

import Tag from "./Tag.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export tag specific types */
export type * from "./props";

/** export tag plugin */
export default {
    install(Vue: App): void {
        registerComponent(Vue, Tag);
    },
} satisfies OrugaComponentPlugin;

/** export tag components */
export { Tag as OTag };

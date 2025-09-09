import type { App } from "vue";

import Tag from "./Tag.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export tag plugin */
export default {
    install(Vue: App) {
        registerComponent(Vue, Tag);
    },
} as OrugaComponentPlugin;

/** export tag components */
export { Tag as OTag };

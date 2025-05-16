import type { App, Plugin } from "vue";

import Tag from "./Tag.vue";

import { registerComponent } from "@/utils/plugins";

/** export tag plugin */
export default {
    install(Vue: App) {
        registerComponent(Vue, Tag);
    },
} as Plugin;

/** export tag components */
export { Tag as OTag };

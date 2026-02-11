import type { App, Plugin } from "vue";

import Tree from "./Tree.vue";
import TreeItem from "./TreeItem.vue";

import { registerComponent } from "@/utils/plugins";

/** export tree plugin */
export default {
    install(app: App) {
        registerComponent(app, Tree);
        registerComponent(app, TreeItem);
    },
} as Plugin;

/** export tree components */
export { Tree as OTree, TreeItem as OTreItem };

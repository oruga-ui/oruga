import type { App } from "vue";

import Tree from "./Tree.vue";
import TreeItem from "./TreeItem.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export tree specific types */
export type * from "./props";

/** export tree plugin */
export default {
    install(app: App): void {
        registerComponent(app, Tree);
        registerComponent(app, TreeItem);
    },
} satisfies OrugaComponentPlugin;

/** export tree components */
export { Tree as OTree, TreeItem as OTreItem };

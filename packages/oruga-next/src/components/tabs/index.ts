import type { App, Plugin } from "vue";

import Tabs from "./Tabs.vue";
import TabItem from "./TabItem.vue";

import { registerComponent } from "@/utils/plugins";

/** export tabs specific types */
export type * from "./types";

/** export tabs plugin */
export default {
    install(app: App) {
        registerComponent(app, Tabs);
        registerComponent(app, TabItem);
    },
} as Plugin;

/** export tabs components */
export { Tabs as OTabs, TabItem as OTabItem };

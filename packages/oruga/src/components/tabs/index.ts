import type { App } from "vue";

import Tabs from "./Tabs.vue";
import TabItem from "./TabItem.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export tabs specific types */
export type * from "./types";

/** export tabs plugin */
export default {
    install(app: App) {
        registerComponent(app, Tabs);
        registerComponent(app, TabItem);
    },
} as OrugaComponentPlugin;

/** export tabs components */
export { Tabs as OTabs, TabItem as OTabItem };

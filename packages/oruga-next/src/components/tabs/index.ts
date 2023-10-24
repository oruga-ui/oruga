import type { App, Plugin } from "vue";

import Tabs from "./Tabs.vue";
import TabItem from "./TabItem.vue";

import { registerComponent } from "@/utils/plugins";

// export tabs components
export default {
    install(app: App) {
        registerComponent(app, Tabs);
        registerComponent(app, TabItem);
    },
} as Plugin;

// export tabs components
export { Tabs as OTabs, TabItem as OTabItem };

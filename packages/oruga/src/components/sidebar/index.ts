import type { App, Plugin } from "vue";

import Sidebar from "./Sidebar.vue";
import useSidebarProgrammatic from "./useSidebarProgrammatic";

import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";

/** export sidebar specific types */
// no types to export here

/** export sidebar plugin */
export default {
    install(app: App) {
        registerComponent(app, Sidebar);
        registerComponentProgrammatic(app, "sidebar", useSidebarProgrammatic);
    },
} as Plugin;

/** export sidebar components & composables */
export { Sidebar as OSidebar, useSidebarProgrammatic };

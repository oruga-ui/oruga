import type { App, Plugin } from "vue";

import Sidebar from "./Sidebar.vue";
import SidebarProgrammatic from "./useSidebarProgrammatic";

import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";

/** export sidebar specific types */
export type { SidebarProgrammaticOptions } from "./useSidebarProgrammatic";

/** export sidebar plugin */
export default {
    install(app: App) {
        registerComponent(app, Sidebar);
        registerComponentProgrammatic(app, "sidebar", SidebarProgrammatic);
    },
} as Plugin;

/** export sidebar components & composables */
export { Sidebar as OSidebar, SidebarProgrammatic };

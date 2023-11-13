import type { App, Plugin } from "vue";

import Sidebar from "./Sidebar.vue";
import SidebarProgrammatic from "./SidebarProgrammatic";

import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";

/** export sidebar specific types */
export type { SidebarProps } from "./types";

/** export sidebar plugin */
export default {
    install(app: App) {
        registerComponent(app, Sidebar);
        registerComponentProgrammatic(app, "sidebar", SidebarProgrammatic);
    },
} as Plugin;

/** export sidebar components */
export { SidebarProgrammatic, Sidebar as OSidebar };

import type { App, Plugin } from "vue";

import Sidebar from "./Sidebar.vue";
import useSidebarProgrammatic, {
    SidebarProgrammaticFactory,
} from "./useSidebarProgrammatic";

import { registerComponent, registerComponentInterface } from "@/utils/plugins";

/** export sidebar specific types */
export type { SidebarProgrammaticOptions } from "./useSidebarProgrammatic";

/** export sidebar plugin */
export default {
    install(app: App) {
        registerComponent(app, Sidebar);
        registerComponentInterface(app, "sidebar", SidebarProgrammaticFactory);
    },
} as Plugin;

/** export sidebar components & composables */
export { Sidebar as OSidebar, useSidebarProgrammatic };

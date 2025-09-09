import type { App } from "vue";

import Sidebar from "./Sidebar.vue";
import useSidebarProgrammatic, {
    SidebarProgrammaticFactory,
} from "./useSidebarProgrammatic";

import { registerComponent, registerProgrammatic } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export sidebar specific types */
export type { SidebarProgrammaticOptions } from "./useSidebarProgrammatic";

/** export sidebar plugin */
export default {
    install(app: App, { oruga }) {
        registerComponent(app, Sidebar);
        registerProgrammatic(oruga, "sidebar", SidebarProgrammaticFactory);
    },
} as OrugaComponentPlugin;

/** export sidebar components & composables */
export { Sidebar as OSidebar, useSidebarProgrammatic };

import type { App } from "vue";

import Drawer from "./Drawer.vue";
import useDrawerProgrammatic, {
    DrawerProgrammaticFactory,
} from "./useDrawerProgrammatic";

import { registerComponent, registerProgrammatic } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export drawer specific types */
export type * from "./props";
export type { DrawerProgrammaticOptions } from "./useDrawerProgrammatic";

/** export drawer plugin */
export default {
    install(app: App, { oruga }): void {
        registerComponent(app, Drawer);
        registerProgrammatic(oruga, "drawer", DrawerProgrammaticFactory);
    },
} satisfies OrugaComponentPlugin;

/** export drawer components & composables */
export { Drawer as ODrawer, useDrawerProgrammatic };

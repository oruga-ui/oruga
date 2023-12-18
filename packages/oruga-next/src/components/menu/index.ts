import type { App, Plugin } from "vue";

import Menu from "./Menu.vue";
import MenuItem from "./MenuItem.vue";

import { registerComponent } from "@/utils/plugins";

/** export menu specific types */
export type * from "./types";

/** export menu plugin */
export default {
    install(app: App) {
        registerComponent(app, Menu);
        registerComponent(app, MenuItem);
    },
} as Plugin;

/** export menu components */
export { Menu as OMenu, MenuItem as OMenuItem };

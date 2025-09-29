import type { App } from "vue";

import Menu from "./Menu.vue";
import MenuItem from "./MenuItem.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export menu plugin */
export default {
    install(app: App) {
        registerComponent(app, Menu);
        registerComponent(app, MenuItem);
    },
} as OrugaComponentPlugin;

/** export menu components */
export { Menu as OMenu, MenuItem as OMenuItem };

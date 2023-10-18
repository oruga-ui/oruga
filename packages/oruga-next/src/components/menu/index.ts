import type { App, Plugin } from "vue";

import Menu from "./Menu.vue";
import MenuItem from "./MenuItem.vue";

import { registerComponent } from "@/utils/plugins";

export default {
    install(app: App) {
        registerComponent(app, Menu);
        registerComponent(app, MenuItem);
    },
} as Plugin;

export { Menu as OMenu, MenuItem as OMenuItem };

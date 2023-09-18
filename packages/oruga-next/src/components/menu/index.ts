import type { App, Plugin } from "vue";

import Menu from "./Menu.vue";
import MenuList from "./MenuList.vue";
import MenuItem from "./MenuItem.vue";

import { registerComponent } from "../../utils/plugins";

export default {
    install(app: App) {
        registerComponent(app, Menu);
        registerComponent(app, MenuList);
        registerComponent(app, MenuItem);
    },
} as Plugin;

export { Menu as OMenu, MenuList as OMenuList, MenuItem as OMenuItem };

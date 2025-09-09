import type { App } from "vue";

import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export dropdown plugin */
export default {
    install(app: App) {
        registerComponent(app, Dropdown);
        registerComponent(app, DropdownItem);
    },
} as OrugaComponentPlugin;

/** export dropdown components */
export { Dropdown as ODropdown, DropdownItem as ODropdownItem };

import type { App, Plugin } from "vue";

import Listbox from "./Listbox.vue";
import ListItem from "./ListItem.vue";

import { registerComponent } from "@/utils/plugins";

/** export listbox plugin */
export default {
    install(Vue: App) {
        registerComponent(Vue, Listbox);
        registerComponent(Vue, ListItem);
    },
} as Plugin;

/** export listbox components */
export { Listbox as OListbox, ListItem as OListItem };

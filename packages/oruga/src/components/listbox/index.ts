import type { App } from "vue";

import Listbox from "./Listbox.vue";
import ListItem from "./ListItem.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export listbox plugin */
export default {
    install(Vue: App): void {
        registerComponent(Vue, Listbox);
        registerComponent(Vue, ListItem);
    },
} satisfies OrugaComponentPlugin;

/** export listbox components */
export { Listbox as OListbox, ListItem as OListItem };

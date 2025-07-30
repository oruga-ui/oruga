import type { App, Plugin } from "vue";

import Listbox from "./Listbox.vue";

import { registerComponent } from "@/utils/plugins";

/** export listbox plugin */
export default {
    install(Vue: App) {
        registerComponent(Vue, Listbox);
    },
} as Plugin;

/** export listbox components */
export { Listbox as OListbox };

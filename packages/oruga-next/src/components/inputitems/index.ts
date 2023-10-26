import type { App, Plugin } from "vue";

import Inputitems from "./Inputitems.vue";

import { registerComponent } from "@/utils/plugins";

/** export inputitems plugin */
export default {
    install(Vue: App) {
        registerComponent(Vue, Inputitems);
    },
} as Plugin;

/** export inputitems components */
export { Inputitems as OInputitems };

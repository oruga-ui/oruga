import type { App, Plugin } from "vue";

import Dialog from "./Dialog.vue";

import { registerComponent } from "@/utils/plugins";

/** export dialog plugin */
export default {
    install(app: App) {
        registerComponent(app, Dialog);
    },
} as Plugin;

/** export dialog components */
export { Dialog as ODialog };

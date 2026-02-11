import type { App, Plugin } from "vue";

import Dialog from "./Dialog.vue";
import useDialogProgrammatic, {
    DialogProgrammaticFactory,
} from "./useDialogProgrammatic";

import { registerComponent, registerComponentInterface } from "@/utils/plugins";

/** export dialog specific types */
export type { DialogProgrammaticOptions } from "./useDialogProgrammatic";

/** export dialog plugin */
export default {
    install(app: App) {
        registerComponent(app, Dialog);
        registerComponentInterface(app, "dialog", DialogProgrammaticFactory);
    },
} as Plugin;

/** export dialog components */
export { Dialog as ODialog, useDialogProgrammatic };

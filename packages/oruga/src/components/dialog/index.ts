import type { App } from "vue";

import Dialog from "./Dialog.vue";
import useDialogProgrammatic, {
    DialogProgrammaticFactory,
} from "./useDialogProgrammatic";

import { registerComponent, registerProgrammatic } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export dialog specific types */
export type { DialogProgrammaticOptions } from "./useDialogProgrammatic";

/** export dialog plugin */
export default {
    install(app: App, { oruga }) {
        registerComponent(app, Dialog);
        registerProgrammatic(oruga, "dialog", DialogProgrammaticFactory);
    },
} as OrugaComponentPlugin;

/** export dialog components */
export { Dialog as ODialog, useDialogProgrammatic };

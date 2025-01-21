import type { App, Plugin } from "vue";

import Modal from "./Modal.vue";
import ModalProgrammatic from "./useModalProgrammatic";

import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";

/** export modal specific types */
export type { ModalProgrammaticOptions } from "./useModalProgrammatic";

/** export modal plugin */
export default {
    install(app: App) {
        registerComponent(app, Modal);
        registerComponentProgrammatic(app, "modal", ModalProgrammatic);
    },
} as Plugin;

/** export modal components & composables */
export { Modal as OModal, ModalProgrammatic };

import type { App, Plugin } from "vue";

import Modal from "./Modal.vue";
import ModalProgrammatic from "./ModalProgrammatic";

import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";

/** export modal specific types */
export type { ModalProps } from "./ModalProgrammatic";

/** export modal plugin */
export default {
    install(app: App) {
        registerComponent(app, Modal);
        registerComponentProgrammatic(app, "modal", ModalProgrammatic);
    },
} as Plugin;

/** export modal components */
export { ModalProgrammatic, Modal as OModal };

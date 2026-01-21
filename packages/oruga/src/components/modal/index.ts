import type { App, Plugin } from "vue";

import Modal from "./Modal.vue";
import useModalProgrammatic, {
  ModalProgrammaticFactory,
} from "./useModalProgrammatic";

import { registerComponent, registerComponentInterface } from "@/utils/plugins";

/** export modal specific types */
export type { ModalProgrammaticOptions } from "./useModalProgrammatic";

/** export modal plugin */
export default {
  install(app: App) {
    registerComponent(app, Modal);
    registerComponentInterface(app, "modal", ModalProgrammaticFactory);
  },
} as Plugin;

/** export modal components & composables */
export { Modal as OModal, useModalProgrammatic };

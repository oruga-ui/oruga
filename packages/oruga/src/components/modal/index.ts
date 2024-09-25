import type { App, Plugin } from "vue";

import Modal from "./Modal.vue";
import useModalProgrammatic from "./useModalProgrammatic";

import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";

/** export modal specific types */
// no types to export here

/** export modal plugin */
export default {
    install(app: App) {
        registerComponent(app, Modal);
        registerComponentProgrammatic(app, "modal", useModalProgrammatic);
    },
} as Plugin;

/** export modal components & composables */
export { Modal as OModal, useModalProgrammatic };

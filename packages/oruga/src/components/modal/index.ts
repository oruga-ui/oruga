import type { App } from "vue";

import Modal from "./Modal.vue";
import useModalProgrammatic, {
    ModalProgrammaticFactory,
} from "./useModalProgrammatic";

import { registerComponent, registerProgrammatic } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export modal specific types */
export type { ModalProgrammaticOptions } from "./useModalProgrammatic";

/** export modal plugin */
export default {
    install(app: App, { oruga }): void {
        registerComponent(app, Modal);
        registerProgrammatic(oruga, "modal", ModalProgrammaticFactory);
    },
} satisfies OrugaComponentPlugin;

/** export modal components & composables */
export { Modal as OModal, useModalProgrammatic };

import { DefineComponent, Plugin } from 'vue';
import Modal from './Modal.vue';
declare const ModalProgrammatic: {
    open(params: string | OModal): void;
};
declare const _default: Plugin;
export default _default;
export { ModalProgrammatic, Modal as OModal };
export interface OModal {
    content: string | DefineComponent[] | undefined;
}

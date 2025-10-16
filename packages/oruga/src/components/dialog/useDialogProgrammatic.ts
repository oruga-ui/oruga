import { type Component, type MaybeRefOrGetter } from "vue";
import {
    ProgrammaticFactory,
    type ProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";

import Dialog from "./Dialog.vue";
import Modal from "@/components/modal/Modal.vue";

import type { DialogProps } from "./props";

declare module "../../index" {
    interface OrugaProgrammatic {
        dialog: Required<InstanceType<typeof DialogProgrammaticFactory>>;
    }
}

/** useDialogProgrammatic composable options */
export type DialogProgrammaticOptions<C extends Component> = Readonly<
    DialogProps<C>
> &
    ProgrammaticComponentOptions<typeof Dialog<C>>;


// type ComponentDialogOptions<T extends Component> = {
//   component: T;
// } & ComponentProps<typeof GenericDialog> &
//   ComponentProps<T>;

type ComponentDialogOptionsEvent<T extends Component> = Parameters<
  NonNullable<ComponentDialogOptions<T>["onConfirm"]>
>[0];


export class DialogProgrammaticFactory extends ProgrammaticFactory {


 function useComponentDialog<C extends Component>(
  options: DialogProgrammaticOptions<C>,
  confirm?: ConfirmFunc<ComponentDialogOptionsEvent<C>>,
): Promise<void>;
 function useComponentDialog<C extends Component>(
  options: DialogProgrammaticOptions<C>,
  modalOptions: ModalOptions,
  confirm?: ConfirmFunc<ComponentDialogOptionsEvent<C>>,
  target?:  MaybeRefOrGetter<string | HTMLElement | null>,
): Promise<void>;
/** opens a given component wrapped in a modal component */
 function useComponentDialog<C extends Component>(
  options: DialogProgrammaticOptions<C>,
  arg1?: ModalOptions | ConfirmFunc<ComponentDialogOptionsEvent<C>>,
  arg2?: ConfirmFunc<ComponentDialogOptionsEvent<C>>,
  target?:  MaybeRefOrGetter<string | HTMLElement | null>,
): Promise<void> {

    /**
     * Create a new programmatic dialog component instance.
     * @param options - Modal content string or modal component props object.
     * @param target - A target container the component get rendered into - default is `document.body`.
     * @returns ProgrammaticExpose - programmatic component expose interface
     */
    open<C extends Component>(
        options: string | DialogProgrammaticOptions<C>,
        target?: MaybeRefOrGetter<string | HTMLElement | null>,
    ): ProgrammaticExpose<typeof Modal<C>> {
        const _options: ModalProgrammaticOptions<C> =
            typeof options === "string" ? { content: options } : options;

        const componentProps: ModalProps<C> = {
            active: true, // set the active default state to true
            ..._options,
            component: Dialog,

        };

        // create programmatic component
        return this._create(
            Modal,
            {
                props: componentProps, // component specific props
                onClose: _options.onClose, // on close event handler
            },
            target, // target the component get rendered into
        );
    }
}

export default function useDialogProgrammatic(): DialogProgrammaticFactory {
    return new DialogProgrammaticFactory();
}

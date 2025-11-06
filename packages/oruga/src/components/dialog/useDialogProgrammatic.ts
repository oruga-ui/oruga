import { type Component } from "vue";
import {
    ProgrammaticFactory,
    type ProgrammaticComponentOptions,
    type ProgrammaticExpose,
    type ProgrammaticTarget,
} from "../programmatic";
import type { ComponentProps } from "vue-component-type-helpers";

import Dialog from "./Dialog.vue";
import Modal from "@/components/modal/Modal.vue";

import type { DialogProps } from "./props";
import type { ModalProps } from "../modal/props";

declare module "../../index" {
    interface OrugaProgrammatic {
        dialog: Required<InstanceType<typeof DialogProgrammaticFactory>>;
    }
}

export type DialogProgrammaticOptions<C extends Component> = Readonly<
    DialogProps<C>
> &
    Pick<ComponentProps<typeof Dialog<C>>, "onConfirm" | "onClose">;

type DialogModalProgrammaticOptions = Readonly<ModalProps<never>> &
    ProgrammaticComponentOptions<typeof Dialog<never>>;

export class DialogProgrammaticFactory extends ProgrammaticFactory {
    /**
     * Create a new programmatic dialog component instance.
     * @param options - Dialog content string or dialog component props object.
     * @param modalOptions - Modal component props object.
     * @param target - A target container the component get rendered into - default is `document.body`.
     * @returns ProgrammaticExpose - programmatic component expose interface
     */
    open<C extends Component>(
        options: string | DialogProgrammaticOptions<C>,
        modalOptions?: DialogModalProgrammaticOptions,
        target?: ProgrammaticTarget,
    ): ProgrammaticExpose<typeof Modal<typeof Dialog<C>>> {
        const dialogOptions: DialogProgrammaticOptions<C> =
            typeof options === "string" ? { content: options } : options;

        const componentProps: ModalProps<typeof Dialog<C>> = {
            active: true, // set the active default state to true
            ...(modalOptions ?? {}),
            component: Dialog,
            props: dialogOptions,
        };

        // create programmatic component
        return this._create<typeof Modal<typeof Dialog<C>>>(
            Modal,
            {
                props: componentProps, // component specific props
                onClose: dialogOptions.onClose, // on close event handler
            },
            target, // target the component get rendered into
        );
    }
}

export default function useDialogProgrammatic(): DialogProgrammaticFactory {
    return new DialogProgrammaticFactory();
}

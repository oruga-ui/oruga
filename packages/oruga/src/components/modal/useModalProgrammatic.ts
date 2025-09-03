import { type Component, type MaybeRefOrGetter } from "vue";
import {
    ProgrammaticFactory,
    type ProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";

import Modal from "./Modal.vue";

import type { ModalProps } from "./props";

declare module "../../index" {
    interface OrugaProgrammatic {
        modal: Required<InstanceType<typeof ModalProgrammaticFactory>>;
    }
}

/** useModalProgrammatic composable options */
export type ModalProgrammaticOptions<C extends Component> = Readonly<
    ModalProps<C>
> &
    ProgrammaticComponentOptions<typeof Modal<C>>;

export class ModalProgrammaticFactory extends ProgrammaticFactory {
    /**
     * Create a new programmatic modal component instance.
     * @param options - Modal content string or modal component props object.
     * @param target - A target container the component get rendered into - default is `document.body`.
     * @returns ProgrammaticExpose - programmatic component expose interface
     */
    open<C extends Component>(
        options: string | ModalProgrammaticOptions<C>,
        target?: MaybeRefOrGetter<string | HTMLElement | null>,
    ): ProgrammaticExpose<typeof Modal<C>> {
        const _options: ModalProgrammaticOptions<C> =
            typeof options === "string" ? { content: options } : options;

        const componentProps: ModalProps<C> = {
            active: true, // set the active default state to true
            ..._options,
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

export default function useModalProgrammatic(): ModalProgrammaticFactory {
    return new ModalProgrammaticFactory();
}

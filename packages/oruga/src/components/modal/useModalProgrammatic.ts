import { type ComponentInternalInstance } from "vue";
import {
    InstanceRegistry,
    useProgrammatic,
    type PublicProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";

import Modal from "./Modal.vue";

import type { ComponentProps } from "vue-component-type-helpers";

declare module "../../index" {
    interface OrugaProgrammatic {
        modal: typeof useModalProgrammatic;
    }
}

/** modal component programmatic instance registry **/
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** all properties of the modal component */
export type ModalProps = ComponentProps<typeof Modal>;

/** useModalProgrammatic composable options */
type ModalProgrammaticOptions = Readonly<Omit<ModalProps, "content">> & {
    content?: string | Array<unknown>;
} & PublicProgrammaticComponentOptions;

const useModalProgrammatic = {
    /**
     * create a new programmatic modal component
     * @param options modal content string or modal component props object
     * @param target specify a target the component get rendered into
     * @returns ProgrammaticExpose
     */
    open(
        options: string | ModalProgrammaticOptions,
        target?: string | HTMLElement,
    ): ProgrammaticExpose {
        const _options: ModalProgrammaticOptions =
            typeof options === "string" ? { content: options } : options;

        let slot;
        // render content as slot when is an array
        if (Array.isArray(_options.content)) {
            slot = _options.content;
            delete _options.content;
        }

        const componentProps: ModalProps = {
            active: true, // set the active default state to true
            ...(_options as ModalProps),
        };

        // create programmatic component
        return useProgrammatic.open(
            Modal,
            {
                instances, // custom programmatic instance registry
                target, // target the component get rendered into
                props: componentProps, // component specific props
                onClose: _options.onClose, // on close event handler
            },
            // component default slot render
            slot,
        );
    },
    /** close the last registred instance in the modal programmatic instance registry */
    close(...args: unknown[]): void {
        instances.last()?.exposed?.close(...args);
    },
    /** close all instances in the programmatic modal instance registry */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed?.close(...args));
    },
};

export default useModalProgrammatic;

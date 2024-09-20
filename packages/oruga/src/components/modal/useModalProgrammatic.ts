import { type ComponentInternalInstance } from "vue";
import { useProgrammatic, type ProgrammaticExpose } from "../programmatic";
import InstanceRegistry from "@/utils/InstanceRegistry";

import Modal from "./Modal.vue";

import type { ComponentProps } from "vue-component-type-helpers";

declare module "../../index" {
    interface OrugaProgrammatic {
        modal: typeof useModalProgrammatic;
    }
}

// modal component programmatic instance registry
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** all properties of the modal component */
export type ModalProps = ComponentProps<typeof Modal>;

/** useModalProgrammatic composable options */
type ModalProgrammaticOptions = Readonly<Omit<ModalProps, "content">> & {
    content?: string | Array<unknown>;
};

const useModalProgrammatic = {
    /**
     * create a new programmatic modal component
     * @param options modal content string or options object
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
            active: true, // set the active state to true
            ...(_options as ModalProps),
        };

        // create programmatic component
        return useProgrammatic.open(
            Modal,
            {
                instances, // custom programmatic instance registry
                target, // target the component get rendered into
                props: componentProps, // component specific props
            },
            // component default slot render
            slot,
        );
    },
    /** close all instances in the programmatic modal instance registry */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default useModalProgrammatic;

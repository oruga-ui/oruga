import {
    type Component,
    type ComponentInternalInstance,
    type VNodeTypes,
} from "vue";
import {
    InstanceRegistry,
    ComponentProgrammatic,
    type ProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";

import Modal from "./Modal.vue";

import type { ModalProps } from "./props";

declare module "../../index" {
    interface OrugaProgrammatic {
        modal: typeof ModalProgrammatic;
    }
}

/** modal component programmatic instance registry **/
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** useModalProgrammatic composable options */
export type ModalProgrammaticOptions<C extends Component> = Readonly<
    Omit<ModalProps<C>, "content">
> & {
    content?: string | Array<unknown>;
} & ProgrammaticComponentOptions;

const ModalProgrammatic = {
    /**
     * Create a new programmatic modal component instance.
     * @param options modal content string or modal component props object
     * @param target specify a target the component get rendered into - default is `document.body`
     * @returns ProgrammaticExpose
     */
    open<C extends Component>(
        options: string | ModalProgrammaticOptions<C>,
        target?: string | HTMLElement | null,
    ): ProgrammaticExpose {
        const _options: ModalProgrammaticOptions<C> =
            typeof options === "string" ? { content: options } : options;

        let slot;
        // render content as slot when is an array
        if (Array.isArray(_options.content)) {
            slot = _options.content;
            delete _options.content;
        }

        const componentProps: ModalProps<C> = {
            active: true, // set the active default state to true
            ...(_options as ModalProps<C>),
        };

        // create programmatic component
        return ComponentProgrammatic.open(
            Modal as VNodeTypes,
            {
                instances, // custom programmatic instance registry
                target, // target the component get rendered into
                props: componentProps, // component specific props
                onClose: _options.onClose, // on close event handler
            },
            // component default slot to render content
            slot,
        );
    },
    /** Close the last registred instance in the modal programmatic instance registry. */
    close(...args: unknown[]): void {
        instances.last()?.exposed?.close(...args);
    },
    /** Close all instances in the programmatic modal instance registry. */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed?.close(...args));
    },
};

export default ModalProgrammatic;

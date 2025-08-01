import {
    type Component,
    type ComponentInternalInstance,
    type MaybeRefOrGetter,
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
const registry = new InstanceRegistry<ComponentInternalInstance>();

/** useModalProgrammatic composable options */
export type ModalProgrammaticOptions<C extends Component> = Readonly<
    ModalProps<C>
> &
    ProgrammaticComponentOptions<typeof Modal<C>>;

const ModalProgrammatic = {
    /** Returns the number of registered active instances. */
    count: registry.count,
    /**
     * Create a new programmatic modal component instance.
     * @param options modal content string or modal component props object
     * @param target specify a target the component get rendered into - default is `document.body`
     * @returns ProgrammaticExpose
     */
    open<C extends Component>(
        options: string | ModalProgrammaticOptions<C>,
        target?: MaybeRefOrGetter<string | HTMLElement | null>,
    ): ProgrammaticExpose<typeof Modal<C>> {
        const _options: ModalProgrammaticOptions<C> =
            typeof options === "string" ? { content: options } : options;

        const componentProps: ModalProps<C> = {
            active: true, // set the active default state to true
            ...(_options as ModalProps<C>),
        };

        // create programmatic component
        return ComponentProgrammatic.open(Modal, {
            registry, // custom programmatic instance registry
            target, // target the component get rendered into
            props: componentProps, // component specific props
            onClose: _options.onClose, // on close event handler
        });
    },
    /** Close the last registred instance in the modal programmatic instance registry. */
    close(...args: unknown[]): void {
        registry.last()?.exposed?.close(...args);
    },
    /** Close all instances in the programmatic modal instance registry. */
    closeAll(...args: unknown[]): void {
        registry.walk((entry) => entry.exposed?.close(...args));
    },
};

export default ModalProgrammatic;

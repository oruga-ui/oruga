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

import Sidebar from "./Sidebar.vue";

import type { SidebarProps } from "./props";

declare module "../../index" {
    interface OrugaProgrammatic {
        sidebar: typeof SidebarProgrammatic;
    }
}

/** sidebar component programmatic instance registry */
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** useSidebarProgrammatic composable options */
export type SidebarProgrammaticOptions<C extends Component> = Readonly<
    SidebarProps<C>
> &
    ProgrammaticComponentOptions;

const SidebarProgrammatic = {
    /** Returns the number of registered active instances. */
    count: instances.count,
    /**
     * Create a new programmatic sidebar component instance.
     * @param options sidebar component props object
     * @param target specify a target the component get rendered into - default is `document.body`
     * @returns ProgrammaticExpose
     */
    open<C extends Component>(
        options: SidebarProgrammaticOptions<C>,
        target?: string | HTMLElement | null,
    ): ProgrammaticExpose {
        const componentProps: SidebarProps<C> = {
            active: true, // set the active default state to true
            ...options,
        };

        // create programmatic component
        return ComponentProgrammatic.open(Sidebar as VNodeTypes, {
            instances, // custom programmatic instance registry
            target, // target the component get rendered into
            props: componentProps, // component specific props
            onClose: options.onClose, // on close event handler
        });
    },
    /** Close the last registred instance in the sidebar programmatic instance registry. */
    close(...args: unknown[]): void {
        instances.last()?.exposed?.close(...args);
    },
    /** Close all instances in the programmatic sidebar instance registry. */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed?.close(...args));
    },
};

export default SidebarProgrammatic;

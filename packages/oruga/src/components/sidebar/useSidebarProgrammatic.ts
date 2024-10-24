import {
    type Component,
    type ComponentInternalInstance,
    type VNodeTypes,
} from "vue";
import {
    InstanceRegistry,
    useProgrammatic,
    type PublicProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";

import Sidebar from "./Sidebar.vue";

import type { SidebarProps } from "./props";

declare module "../../index" {
    interface OrugaProgrammatic {
        sidebar: typeof useSidebarProgrammatic;
    }
}

/** sidebar component programmatic instance registry */
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** useSidebarProgrammatic composable options */
type SidebarProgrammaticOptions<C extends Component> = Readonly<
    SidebarProps<C>
> &
    PublicProgrammaticComponentOptions;

const useSidebarProgrammatic = {
    /**
     * create a new programmatic modal component
     * @param options sidebar component props object
     * @param target specify a target the component get rendered into
     * @returns ProgrammaticExpose
     */
    open<C extends Component>(
        options: SidebarProgrammaticOptions<C>,
        target?: string | HTMLElement,
    ): ProgrammaticExpose {
        const componentProps: SidebarProps<C> = {
            active: true, // set the active default state to true
            ...options,
        };

        // create programmatic component
        return useProgrammatic.open(Sidebar as VNodeTypes, {
            instances, // custom programmatic instance registry
            target, // target the component get rendered into
            props: componentProps, // component specific props
            onClose: options.onClose, // on close event handler
        });
    },
    /** close the last registred instance in the sidebar programmatic instance registry */
    close(...args: unknown[]): void {
        instances.last()?.exposed?.close(...args);
    },
    /** close all instances in the programmatic sidebar instance registry */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed?.close(...args));
    },
};

export default useSidebarProgrammatic;

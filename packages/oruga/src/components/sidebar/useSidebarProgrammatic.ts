import { type ComponentInternalInstance } from "vue";
import {
    InstanceRegistry,
    useProgrammatic,
    type PublicProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";

import Sidebar from "./Sidebar.vue";

import type { ComponentProps } from "vue-component-type-helpers";

declare module "../../index" {
    interface OrugaProgrammatic {
        sidebar: typeof useSidebarProgrammatic;
    }
}

/** sidebar component programmatic instance registry */
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** all properties of the sidebar component */
export type SidebarProps = ComponentProps<typeof Sidebar>;

/** useSidebarProgrammatic composable options */
type SidebarProgrammaticOptions = Readonly<SidebarProps> &
    PublicProgrammaticComponentOptions;

const useSidebarProgrammatic = {
    /**
     * create a new programmatic modal component
     * @param options sidebar component props object
     * @param target specify a target the component get rendered into
     * @returns ProgrammaticExpose
     */
    open(
        options: SidebarProgrammaticOptions,
        target?: string | HTMLElement,
    ): ProgrammaticExpose {
        const componentProps: SidebarProps = {
            active: true, // set the active default state to true
            ...options,
        };

        // create programmatic component
        return useProgrammatic.open(Sidebar, {
            instances, // custom programmatic instance registry
            target, // target the component get rendered into
            props: componentProps, // component specific props
            onClose: options.onClose, // on close event handler
        });
    },
    /** close the last registred instance in the sidebar programmatic instance registry */
    close(...args: unknown[]): void {
        instances.last()?.exposed.close(...args);
    },
    /** close all instances in the programmatic sidebar instance registry */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default useSidebarProgrammatic;

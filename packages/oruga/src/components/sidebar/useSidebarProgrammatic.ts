import { type Component, type MaybeRefOrGetter } from "vue";
import {
    ProgrammaticFactory,
    type ProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";

import Sidebar from "./Sidebar.vue";

import type { SidebarProps } from "./props";

// extend the OrugaProgrammatic type with the `sidebar` programmatic interface
declare module "../../index" {
    interface OrugaProgrammatic {
        sidebar: Required<InstanceType<typeof SidebarProgrammaticFactory>>;
    }
}

/** useSidebarProgrammatic composable options */
export type SidebarProgrammaticOptions<C extends Component> = Readonly<
    SidebarProps<C>
> &
    ProgrammaticComponentOptions<typeof Sidebar<C>>;

export class SidebarProgrammaticFactory extends ProgrammaticFactory {
    /**
     * Create a new programmatic sidebar component instance.
     * @param options - Sidebar component props object.
     * @param target - A target container the component get rendered into - default is `document.body`.
     * @returns ProgrammaticExpose
     */
    open<C extends Component>(
        options: SidebarProgrammaticOptions<C>,
        target?: MaybeRefOrGetter<string | HTMLElement | null>,
    ): ProgrammaticExpose<typeof Sidebar<C>> {
        const componentProps: SidebarProps<C> = {
            active: true, // set the active default state to true
            ...options,
        };

        // create programmatic component
        return this._create(
            Sidebar,
            {
                props: componentProps, // component specific props
                onClose: options.onClose, // on close event handler
            },
            target, // target the component get rendered into
        );
    }
}

export default function useSidebarProgrammatic(): SidebarProgrammaticFactory {
    return new SidebarProgrammaticFactory();
}

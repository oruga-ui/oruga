import { type Component } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import {
    ProgrammaticFactory,
    type ProgrammaticComponentOptions,
    type ProgrammaticExpose,
    type ProgrammaticTarget,
} from "../programmatic";

import Drawer from "./Drawer.vue";

import type { DrawerProps } from "./props";

// extend the OrugaProgrammatic type with the `drawer` programmatic interface
declare module "../../index" {
    interface OrugaProgrammatic {
        drawer: Required<InstanceType<typeof DrawerProgrammaticFactory>>;
    }
}

export type DrawerProgrammaticOptions<C extends Component> = Readonly<
    DrawerProps<C>
> &
    ProgrammaticComponentOptions<typeof Drawer<C>> &
    Partial<
        Pick<
            ComponentProps<typeof Drawer<C>>,
            "onClose" | "onCancel" | "onConfirm"
        >
    >;

export class DrawerProgrammaticFactory extends ProgrammaticFactory {
    /**
     * Create a new programmatic drawer component instance.
     * @param options - Drawer component props object.
     * @param target - A target container the component get rendered into - default is `document.body`.
     * @returns ProgrammaticExpose
     */
    open<C extends Component>(
        options: DrawerProgrammaticOptions<C>,
        target?: ProgrammaticTarget,
    ): ProgrammaticExpose<typeof Drawer<C>> {
        const componentProps: DrawerProps<C> = {
            active: true, // set the active default state to true
            ...options,
        };

        // create programmatic component
        return this._create(
            Drawer,
            {
                props: componentProps, // component specific props
                onClose: options.onClose, // on close event handler
            },
            target, // target the component get rendered into
        );
    }
}

export default function useDrawerProgrammatic(): DrawerProgrammaticFactory {
    return new DrawerProgrammaticFactory();
}

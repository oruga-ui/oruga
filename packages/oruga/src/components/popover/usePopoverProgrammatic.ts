import { type Component } from "vue";
import {
    ProgrammaticFactory,
    type ProgrammaticComponentOptions,
    type ProgrammaticExpose,
    type ProgrammaticTarget,
} from "../programmatic/index.ts";

import Popover from "./Popover.vue";

import type { PopoverProps } from "./props.ts";

// extend the OrugaProgrammatic type with the `popover` programmatic interface
declare module "../../index" {
    interface OrugaProgrammatic {
        popover: Required<InstanceType<typeof PopoverProgrammaticFactory>>;
    }
}

export type PopoverProgrammaticOptions<C extends Component> = Readonly<
    Omit<PopoverProps<C>, "container">
> &
    Required<Pick<PopoverProps<C>, "trigger">> &
    ProgrammaticComponentOptions<typeof Popover<C>>;

export class PopoverProgrammaticFactory extends ProgrammaticFactory {
    /**
     * Create a new programmatic popover component instance.
     * @param options - Popover content string or popover component props object.
     * @param target - A target container the component get rendered into - default is `document.body`.
     * @returns ProgrammaticExpose - programmatic component expose interface
     */
    public open<C extends Component>(
        options: PopoverProgrammaticOptions<C>,
        target?: ProgrammaticTarget,
    ): ProgrammaticExpose<typeof Popover<C>> {
        const componentProps: PopoverProgrammaticOptions<C> = {
            active: true, // set the active default state to true
            ...options, // pass all props to the internal notification component
        };

        // create programmatic component
        return this._create(
            Popover,
            {
                props: componentProps as PopoverProps<C>, // component specific props
                onClose: options.onClose, // on close event handler
            },
            target, // target the component get rendered into
        );
    }
}

export default function usePopoverProgrammatic(): PopoverProgrammaticFactory {
    return new PopoverProgrammaticFactory();
}

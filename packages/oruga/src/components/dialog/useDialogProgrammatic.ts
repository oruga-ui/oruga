import { type Component } from "vue";
import {
    ProgrammaticFactory,
    type ProgrammaticComponentOptions,
    type ProgrammaticExpose,
    type ProgrammaticTarget,
} from "../programmatic";
import type { ComponentProps } from "vue-component-type-helpers";

import Dialog from "./Dialog.vue";

import type { DialogProps } from "./props";

declare module "../../index" {
    interface OrugaProgrammatic {
        dialog: Required<InstanceType<typeof DialogProgrammaticFactory>>;
    }
}

export type DialogProgrammaticOptions<C extends Component> = Readonly<
    DialogProps<C>
> &
    ProgrammaticComponentOptions<typeof Dialog<C>> &
    Partial<Pick<ComponentProps<typeof Dialog<C>>, "onConfirm" | "onClose">>;

export class DialogProgrammaticFactory extends ProgrammaticFactory {
    /**
     * Create a new programmatic dialog component instance.
     * @param options - Dialog content string or dialog component props object.
     * @param modalOptions - Modal component props object.
     * @param target - A target container the component get rendered into - default is `document.body`.
     * @returns ProgrammaticExpose - programmatic component expose interface
     */
    open<C extends Component>(
        options: string | DialogProgrammaticOptions<C>,
        target?: ProgrammaticTarget,
    ): ProgrammaticExpose<typeof Dialog<C>> {
        const _options: DialogProgrammaticOptions<C> =
            typeof options === "string" ? { content: options } : options;

        const componentProps: DialogProps<C> = {
            active: true, // set the active default state to true
            ..._options,
        };

        // create programmatic component
        return this._create<typeof Dialog<C>>(
            Dialog,
            {
                props: componentProps, // component specific props
                onClose: _options.onClose, // on close event handler
            },
            target, // target the component get rendered into
        );
    }
}

export default function useDialogProgrammatic(): DialogProgrammaticFactory {
    return new DialogProgrammaticFactory();
}

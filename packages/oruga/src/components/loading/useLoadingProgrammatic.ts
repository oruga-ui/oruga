import { type MaybeRefOrGetter } from "vue";
import {
    ProgrammaticFactory,
    type ProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";

import Loading from "./Loading.vue";

import type { LoadingProps } from "./props";

declare module "../../index" {
    interface OrugaProgrammatic {
        loading: Required<InstanceType<typeof LoadingProgrammaticFactory>>;
    }
}

/** useLoadingProgrammatic composable options */
export type LoadingProgrammaticOptions = Readonly<LoadingProps> &
    ProgrammaticComponentOptions<typeof Loading>;

export class LoadingProgrammaticFactory extends ProgrammaticFactory {
    /**
     * Create a new programmatic loading component instance.
     * @param options - Loading label string or loading component props object.
     * @param target - A target container the component get rendered into - default is `document.body`.
     * @returns ProgrammaticExpose - programmatic component expose interface
     */
    public open(
        options: string | LoadingProgrammaticOptions,
        target?: MaybeRefOrGetter<string | HTMLElement | null>,
    ): ProgrammaticExpose<typeof Loading> {
        const _options: LoadingProgrammaticOptions =
            typeof options === "string" ? { label: options } : options;

        const componentProps: LoadingProps = {
            active: true, // set the active default state to true
            fullPage: false, // set the full page default state to false
            ...(_options as LoadingProps),
        };

        // create programmatic component
        return this._create(
            Loading,
            {
                props: componentProps, // component specific props
                onClose: _options.onClose, // on close event handler
            },
            target, // target the component get rendered into
        );
    }
}

export default function useLoadingProgrammatic(): LoadingProgrammaticFactory {
    return new LoadingProgrammaticFactory();
}

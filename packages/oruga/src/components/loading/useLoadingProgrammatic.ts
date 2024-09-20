import { type ComponentInternalInstance } from "vue";
import {
    InstanceRegistry,
    useProgrammatic,
    type ProgrammaticExpose,
} from "../programmatic";

import Loading from "./Loading.vue";

import type { ComponentProps } from "vue-component-type-helpers";

declare module "../../index" {
    interface OrugaProgrammatic {
        loading: typeof LoadingProgrammatic;
    }
}

/** loading component programmatic instance registry **/
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** all properties of the loading component */
export type LoadingProps = ComponentProps<typeof Loading>;

type LoadingProgrammaticOptions = Readonly<Omit<LoadingProps, "label">> & {
    label?: string | Array<unknown>;
};

const LoadingProgrammatic = {
    /**
     * create a new programmatic modal component
     * @param options loading label string or loading component props object
     * @param target specify a target the component get rendered into
     * @returns ProgrammaticExpose
     */
    open(
        options: string | LoadingProgrammaticOptions,
        target?: string | HTMLElement,
    ): ProgrammaticExpose {
        const _options: LoadingProgrammaticOptions =
            typeof options === "string" ? { label: options } : options;

        let slot;
        // render content as slot when is an array
        if (Array.isArray(_options.label)) {
            slot = _options.label;
            delete _options.label;
        }

        const componentProps: LoadingProps = {
            active: true, // set the active state to true
            ...(_options as LoadingProps),
        };

        // create programmatic component
        return useProgrammatic.open(
            Loading,
            {
                instances, // custom programmatic instance registry
                target, // target the component get rendered into
                props: componentProps, // component specific props
            },
            // component default slot render
            slot,
        );
    },
    /** close all instances in the programmatic loading instance registry */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default LoadingProgrammatic;

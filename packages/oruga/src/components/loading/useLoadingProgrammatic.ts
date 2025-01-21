import { type ComponentInternalInstance } from "vue";
import {
    InstanceRegistry,
    ComponentProgrammatic,
    type ProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";

import Loading from "./Loading.vue";

import type { LoadingProps } from "./props";

declare module "../../index" {
    interface OrugaProgrammatic {
        loading: typeof LoadingProgrammatic;
    }
}

/** loading component programmatic instance registry **/
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** useLoadingProgrammatic composable options */
type LoadingProgrammaticOptions = Readonly<Omit<LoadingProps, "label">> & {
    label?: string | Array<unknown>;
} & ProgrammaticComponentOptions;

const LoadingProgrammatic = {
    /**
     * Create a new programmatic loading component.
     * @param options loading label string or loading component props object
     * @param target specify a target the component get rendered into
     * @returns ProgrammaticExpose
     */
    open(
        options: string | LoadingProgrammaticOptions,
        target?: string | HTMLElement | null,
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
            active: true, // set the active default state to true
            fullPage: false, // set the full page default state to false
            ...(_options as LoadingProps),
        };

        // create programmatic component
        return ComponentProgrammatic.open(
            Loading,
            {
                instances, // custom programmatic instance registry
                target, // target the component get rendered into
                props: componentProps, // component specific props
                onClose: _options.onClose, // on close event handler
            },
            // component default slot render
            slot,
        );
    },
    /** close the last registred instance in the loading programmatic instance registry */
    close(...args: unknown[]): void {
        instances.last()?.exposed?.close(...args);
    },
    /** close all instances in the programmatic loading instance registry */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed?.close(...args));
    },
};

export default LoadingProgrammatic;

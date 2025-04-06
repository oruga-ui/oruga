import { type ComponentInternalInstance, type MaybeRefOrGetter } from "vue";
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
const registry = new InstanceRegistry<ComponentInternalInstance>();

/** useLoadingProgrammatic composable options */
export type LoadingProgrammaticOptions = Readonly<LoadingProps> &
    ProgrammaticComponentOptions;

const LoadingProgrammatic = {
    /** Returns the number of registered active instances. */
    count: registry.count,
    /**
     * Create a new programmatic loading component instance.
     * @param options loading label string or loading component props object
     * @param target specify a target the component get rendered into
     * @returns ProgrammaticExpose
     */
    open(
        options: string | LoadingProgrammaticOptions,
        target?: MaybeRefOrGetter<string | HTMLElement | null>,
    ): ProgrammaticExpose {
        const _options: LoadingProgrammaticOptions =
            typeof options === "string" ? { label: options } : options;

        const componentProps: LoadingProps = {
            active: true, // set the active default state to true
            fullPage: false, // set the full page default state to false
            ...(_options as LoadingProps),
        };

        // create programmatic component
        return ComponentProgrammatic.open(Loading, {
            registry, // custom programmatic instance registry
            target, // target the component get rendered into
            props: componentProps, // component specific props
            onClose: _options.onClose, // on close event handler
        });
    },
    /** Close the last registred instance in the loading programmatic instance registry. */
    close(...args: unknown[]): void {
        registry.last()?.exposed?.close(...args);
    },
    /** Close all instances in the programmatic loading instance registry. */
    closeAll(...args: unknown[]): void {
        registry.walk((entry) => entry.exposed?.close(...args));
    },
};

export default LoadingProgrammatic;

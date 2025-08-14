import {
    createApp,
    toValue,
    type App,
    type ComponentInternalInstance,
    type EmitsToProps,
    type MaybeRefOrGetter,
    type VNode,
    type VNodeTypes,
} from "vue";

import InstanceRegistry from "@/components/programmatic/InstanceRegistry";
import { VueInstance } from "@/utils/plugins";
import { getTeleportDefault, resolveElement } from "@/composables";

import {
    ProgrammaticComponent,
    type ProgrammaticComponentProps,
    type ProgrammaticComponentEmits,
    type ProgrammaticComponentExpose,
} from "./ProgrammaticComponent";

declare module "../../index" {
    interface OrugaProgrammatic {
        programmatic: typeof ComponentProgrammatic;
    }
}

/** programmatic global instance registry if no custom is defined */
const registry = new InstanceRegistry<ComponentInternalInstance>();

/** useProgrammatic composable `open` function options */
export type ProgrammaticOptions<C extends VNodeTypes> = {
    /**
     * Specify a target the component get rendered into.
     * @default `document.body`
     */
    target?: MaybeRefOrGetter<string | HTMLElement | null>;
    /**
     * Specify the template `id` for the programmatic container element.
     * @default `programmatic-app`
     */
    appId?: string;
} & Omit<ProgrammaticComponentProps<C>, "component"> & // component props
    EmitsToProps<Omit<ProgrammaticComponentEmits<C>, "destroy">>; // component emit props

/** public options interface for programmatically called components */
export type ProgrammaticComponentOptions<C extends VNodeTypes> = EmitsToProps<
    Pick<ProgrammaticComponentEmits<C>, "close">
> &
    // make the type extendable
    Record<string, any>;

/** useProgrammatic composable `open` function return value */
export type ProgrammaticExpose<C extends VNodeTypes = VNode> =
    ProgrammaticComponentExpose<C>;

export const ComponentProgrammatic = {
    /** Returns the number of registered active instances. */
    count: registry.count,
    /**
     * Create a new programmatic component instance.
     * @param component component to render
     * @param options render options
     */
    open<C extends VNodeTypes>(
        component: C,
        options?: ProgrammaticOptions<C>,
    ): ProgrammaticExpose<C> {
        options = { registry, ...options };

        const targetQuery = toValue(options.target);
        // define the target container
        const target: HTMLElement | null =
            // either by a given query selector / element
            (targetQuery && resolveElement(targetQuery)) ||
            // or by the default teleport target config
            resolveElement(getTeleportDefault());
        if (!target)
            throw new Error("ComponentProgrammatic - no target is defined.");

        // create app container
        let container: HTMLDivElement | undefined =
            document.createElement("div");
        container.id = options.appId || "programmatic-app";

        // place the app container into the target element
        target.appendChild(container);

        // clear instance handler
        function onDestroy(): void {
            // destroy app/component
            if (app) {
                app.unmount();
                app = undefined;
            }
            // clear container
            if (container && target) {
                target.removeChild(container);
                container = undefined;
            }
        }

        // create a new vue app instance with the ProgrammaticComponent as root
        let app: App | undefined = createApp(ProgrammaticComponent, {
            registry: options.registry, // programmatic registry instance - can be overriden by given in options
            component, // the component which should be rendered
            props: { ...options.props, container: target }, // component props including the target as `container`
            onClose: options.onClose, // custom onClose handler
            onDestroy, // node destory cleanup handler
        });

        // share the current context to the new app instance if running inside a nother app
        if (VueInstance)
            app._context = Object.assign(app._context, VueInstance._context);

        // render the new vue instance into the container
        const instance = app.mount(container);

        // return exposed programmatic functionalities from the mounted component instance
        return instance as unknown as ProgrammaticExpose<C>;
    },
    /** close the last registred instance in the global programmatic instance registry */
    close(...args: unknown[]): void {
        registry.last()?.exposed?.close(...args);
    },
    /** close all instances in the global programmatic instance registry */
    closeAll(...args: unknown[]): void {
        registry.walk((entry) => entry.exposed?.close(...args));
    },
};

export default ComponentProgrammatic;

import {
    createApp,
    type App,
    type ComponentInternalInstance,
    type EmitsToProps,
    type VNodeTypes,
} from "vue";

import InstanceRegistry from "@/components/programmatic/InstanceRegistry";
import { VueInstance } from "@/utils/plugins";
import { isElement } from "@/utils/helpers";

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
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** useProgrammatic composable `open` function options */
export type ProgrammaticOptions<C extends VNodeTypes> = {
    /**
     * Specify a target the component get rendered into.
     * @default `document.body`
     */
    target?: string | HTMLElement | null;
    /**
     * Specify the template `id` for the programmatic container element.
     * @default `programmatic-app`
     */
    appId?: string;
} & Omit<ProgrammaticComponentProps<C>, "component"> & // component props
    EmitsToProps<Omit<ProgrammaticComponentEmits, "destroy">>; // component emit props

/** public options interface for programmatically called components */
export type ProgrammaticComponentOptions = EmitsToProps<
    Pick<ProgrammaticComponentEmits, "close">
> &
    // make the type extendable
    Record<string, any>;

/** useProgrammatic composable `open` function return value */
export type ProgrammaticExpose = ProgrammaticComponentExpose;

export const ComponentProgrammatic = {
    /** Returns the number of registered active instances. */
    count: instances.count,
    /**
     * Create a new programmatic component instance.
     * @param component component to render
     * @param options render options
     * @param slot default slot content - see {@link https://vuejs.org/api/render-function.html#render-function-apis |Vue render function}
     */
    open<C extends VNodeTypes>(
        component: C,
        options?: ProgrammaticOptions<C>,
    ): ProgrammaticExpose {
        options = { instances, ...options };

        // define the target container - either HTML `body` or by a given query selector
        const target =
            typeof options.target === "string"
                ? document.querySelector<HTMLElement>(options.target) ||
                  document.body
                : isElement(options?.target)
                  ? options.target
                  : document.body;

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
            if (container) {
                target.removeChild(container);
                container = undefined;
            }
        }

        // create a new vue app instance with the ProgrammaticComponent as root
        let app: App | undefined = createApp(ProgrammaticComponent, {
            instances: options.instances, // programmatic registry instance - can be overriden by given in options
            component, // the component which should be rendered
            props: { ...options.props, container: target }, // component props including the target as `container`
            onClose: options.onClose, // custom onClose handler
            onDestroy, // node destory cleanup handler
        });

        // bind the current context to the new app instance
        if (VueInstance) Object.assign(app._context, VueInstance._context); // must use Object.assign on _context

        // render the new vue instance into the container
        app.mount(container);

        // return exposed programmatic functionalities
        return app?._instance?.exposed as ProgrammaticExpose;
    },
    /** close the last registred instance in the global programmatic instance registry */
    close(...args: unknown[]): void {
        instances.last()?.exposed?.close(...args);
    },
    /** close all instances in the global programmatic instance registry */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed?.close(...args));
    },
};

export default ComponentProgrammatic;

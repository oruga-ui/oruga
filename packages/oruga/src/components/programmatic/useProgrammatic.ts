import {
    createApp,
    toValue,
    type App,
    type ComponentInternalInstance,
    type EmitsToProps,
    type MaybeRefOrGetter,
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
        programmatic: Required<
            InstanceType<typeof ProgrammaticComponentFactory>
        >;
    }
}

/** programmatic component options */
export type ProgrammaticOptions<C extends VNodeTypes> = {
    /**
     * Specify the template `id` for the programmatic container element.
     * @default `programmatic-app`
     */
    appId?: string;
} & Omit<ProgrammaticComponentProps<C>, "component"> & // component props
    EmitsToProps<Pick<Required<ProgrammaticComponentEmits<C>>, "close">>; // component emit props

/** public options interface for programmatically called components */
export type ProgrammaticComponentOptions<C extends VNodeTypes> = EmitsToProps<
    Pick<Required<ProgrammaticComponentEmits<C>>, "close">
> &
    // make the type extendable
    Record<string, any>;

/** programmatic component public interface */
export type ProgrammaticExpose<C extends VNodeTypes = VNodeTypes> =
    ProgrammaticComponentExpose<C>;

/** target container to render the programmatic component into  */
export type ProgrammaticTarget = MaybeRefOrGetter<string | HTMLElement | null>;

export abstract class ProgrammaticFactory {
    /** programmatic instance registry for the factory instance */
    private _registry = new InstanceRegistry<ComponentInternalInstance>();

    /** Returns the number of registered active instances. */
    public count(): number {
        return this._registry.count();
    }

    /** Close the last registred instance in the global programmatic instance registry. */
    public close(...args: unknown[]): void {
        this._registry.last()?.exposed?.close(...args);
    }

    /** Close all instances in the global programmatic instance registry. */
    public closeAll(...args: unknown[]): void {
        this._registry.walk((entry) => entry.exposed?.close(...args));
    }

    abstract open(...args: any[]): ProgrammaticExpose;

    /**
     * Create a new programmatic component instance.
     * @param component - The component to render.
     * @param options - Programmatic component render options.
     * @param target - A target container the component get rendered into - default is `document.body`.
     * @returns ProgrammaticExpose - programmatic component expose interface
     */
    protected _create<C extends VNodeTypes>(
        component: C,
        options: ProgrammaticOptions<C>,
        target?: ProgrammaticTarget,
    ): ProgrammaticExpose<C> {
        options = { registry: this._registry, ...options };

        const targetQuery = toValue(target);
        // define the target container
        const targetElement: HTMLElement | null =
            // either by a given query selector / element
            (targetQuery && resolveElement(targetQuery)) ||
            // or by the default teleport target config
            resolveElement(getTeleportDefault());
        if (!targetElement)
            throw new Error("ComponentProgrammatic - no target is defined.");

        // create app container
        let container: HTMLDivElement | undefined =
            document.createElement("div");
        // set the HTML #id of the programmatic app
        container.id = options.appId || "programmatic-app";

        // place the app container into the target element
        targetElement.appendChild(container);

        // clear instance handler
        function onDestroy(): void {
            // destroy app/component
            if (app) {
                app.unmount();
                app = undefined;
            }
            // clear container
            if (container && targetElement) {
                targetElement.removeChild(container);
                container = undefined;
            }
        }

        // create a new vue app instance with the ProgrammaticComponent as root
        let app: App | undefined = createApp(ProgrammaticComponent, {
            registry: options.registry, // programmatic registry instance
            component, // the component which should be rendered
            props: { ...options.props, container: targetElement }, // component props including the target as `container`
            onClose: options.onClose, // custom onClose handler
            onDestroy, // node destory cleanup handler
        });

        // share the current context to the new app instance if running inside a nother app
        if (VueInstance)
            app._context = Object.assign(app._context, VueInstance._context);

        // render the new vue instance into the container element
        const instance = app.mount(container);

        // return exposed programmatic functionalities from the mounted component instance
        return instance as unknown as ProgrammaticExpose<C>;
    }
}

export class ProgrammaticComponentFactory extends ProgrammaticFactory {
    /**
     * Create a new programmatic component instance.
     * @param component - The component to render.
     * @param options - Programmatic component render options.
     * @param target - A target container the component get rendered into - default is `document.body`.
     * @returns ProgrammaticExpose - programmatic component expose interface
     */
    public open<C extends VNodeTypes>(
        component: C,
        options?: ProgrammaticOptions<C>,
        target?: ProgrammaticTarget,
    ): ProgrammaticExpose<C> {
        return this._create(component, options ?? {}, target);
    }
}

export default function useProgrammaticComponent(): ProgrammaticComponentFactory {
    return new ProgrammaticComponentFactory();
}

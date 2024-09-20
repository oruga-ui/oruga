import {
    createVNode,
    render,
    type Component,
    type ComponentInternalInstance,
} from "vue";

import InstanceRegistry from "@/components/programmatic/InstanceRegistry";
import { VueInstance } from "@/utils/plugins";
import { isElement } from "@/utils/helpers";

import {
    ProgrammaticComponent,
    type ProgrammaticComponentProps,
} from "./ProgrammaticComponent";

import type { ComponentExposed } from "vue-component-type-helpers";

declare module "../../index" {
    interface OrugaProgrammatic {
        programmatic: typeof useProgrammatic;
    }
}

/** programmatic global instance registry if no custom is defined */
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** useProgrammatic composable `open` function options */
export type ProgrammaticOptions<C extends string | Component> = {
    /**
     * Specify a target the component get rendered into
     * @default `document.body`
     */
    target?: string | HTMLElement;
} & Omit<ProgrammaticComponentProps<C>, "destroy" | "component">;

/** subtype which can be used for programmatically call components */
export type ProgrammaticComponentOptions<C> = Readonly<
    Omit<ProgrammaticOptions<C>, "instances" | "props">
>;

/** useProgrammatic composable `open` function return value */
export type ProgrammaticExpose = ComponentExposed<typeof ProgrammaticComponent>;

export const useProgrammatic = {
    /**
     * create a new programmatic component
     * @param component component to render
     * @param options render options
     * @param slot default slot content - see {@link https://vuejs.org/api/render-function.html#render-function-apis |Vue render function}
     */
    open<C extends string | Component>(
        component: C,
        options?: ProgrammaticOptions<C>,
        slot?: unknown,
    ): ProgrammaticExpose {
        // define the target container - either HTML `body` or by a given query selector
        const target =
            typeof options?.target === "string"
                ? document.querySelector<HTMLElement>(options.target)
                : isElement(options?.target)
                  ? (options.target as HTMLElement)
                  : document.body;

        // cache container
        let container = document.createElement("div");

        // clear vnode
        function destroy(): void {
            // clear the container and all connected child node by rendering null into it
            if (container) render(null, container);
            container = null; // reset the variable
            vnode = null; // reset the vnode
        }

        // create dynamic component
        let vnode = createVNode(
            ProgrammaticComponent,
            {
                instances: options.instances ?? instances, // programmatic registry instance - can be overriden by given in options
                component, // the component which should be rendered
                props: { ...options.props, container: target }, // component props including the target as `container`
                onClose: options.onClose, // custom onClose handler
                destroy, // node destory cleanup handler
            } as ProgrammaticComponentProps<C>,
            slot ? (): unknown => slot : null, // default slot render function
        );
        if (VueInstance?._context) vnode.appContext = VueInstance._context; // set app context

        // render a new vue instance into the cache container
        render(vnode, container);

        // place rendered elements into target element
        target.append(...container.children);

        // return exposed functionalities
        return vnode.component.exposed as ProgrammaticExpose;
    },
    /** close the last registred instance in the global programmatic instance registry */
    close(...args: unknown[]): void {
        instances.fist()?.exposed.close(...args);
    },
    /** close all instances in the global programmatic instance registry */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default useProgrammatic;

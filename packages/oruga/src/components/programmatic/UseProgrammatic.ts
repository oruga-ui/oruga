import {
    createVNode,
    defineComponent,
    render,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    type Component,
    type ComponentInternalInstance,
    type VNode,
} from "vue";

import InstanceRegistry from "@/utils/InstanceRegistry";
import { VueInstance } from "@/utils/plugins";
import { isElement, removeElement } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";

import type { ProgrammaticExpose } from "@/types";

declare module "../../index" {
    interface OrugaProgrammatic {
        programmatic: typeof UseProgrammatic;
    }
}

type DynamicComponentProps = {
    /**
     * Component to be injected.
     * Terminate the component by emitting a 'close' event — emits('close')
     */
    component: string | Component;
    /**
     * Props to be binded to the injected component.
     * Both attributes and properties can be used in props.
     * Vue automatically picks the right way to assign it.
     * `class` and `style` have the same object / array value support like in templates.
     * Event listeners should be passed as onXxx.
     * @see https://vuejs.org/api/render-function.html#h
     */
    props?: Record<string, any>;
    /** Callback function to call on close event */
    onClose?: (...args: unknown[]) => void;
    /** Destroy component on close event */
    destroyable?: boolean;
    /**
     * This is used internally for programmatic usage
     * @ignore
     */
    instances: InstanceRegistry<ComponentInternalInstance>;
};

const DynamicComponent = defineComponent(
    (props: DynamicComponentProps, { expose }) => {
        // getting a hold of the internal instance in setup()
        const vm = getCurrentInstance();

        let resolve: (value?: unknown) => void = null;
        const promise = new Promise((p1) => {
            resolve = p1;
        });

        onMounted(() => {
            props.instances.add(vm);
        });

        onUnmounted(() => {
            props.instances.remove(vm);
            resolve.apply(null);
        });

        function close(...args: unknown[]): void {
            // call handler if given
            if (typeof props.onClose === "function")
                props.onClose.apply(null, args);

            if (typeof props.destroyable === "undefined" || props.destroyable) {
                // use timeout for any animation to complete before destroying
                setTimeout(() => {
                    const element = vm.vnode.el as HTMLElement;
                    if (isClient)
                        window.requestAnimationFrame(() => {
                            // remove the component from the container or the body tag
                            if (element) removeElement(element);
                        });
                    else {
                        if (element) removeElement(element);
                    }
                });
            }
        }

        /** expose public functionalities for programmatic usage */
        expose({ close, promise });

        // render given component
        return (): VNode =>
            createVNode(props.component, { ...props.props, onClose: close });
    },
    { props: ["component", "props", "onClose", "destroyable", "instances"] },
);

const instances = new InstanceRegistry<ComponentInternalInstance>();

export type ProgrammaticProps = {
    /**
     * Specify a target the component get rendered into.
     * @default `body`
     */
    target?: string | HTMLElement;
} & Omit<DynamicComponentProps, "instances">;

const UseProgrammatic = {
    open(props: ProgrammaticProps): ProgrammaticExpose {
        const target =
            typeof props.target === "string"
                ? document.querySelector<HTMLElement>(props.target)
                : isElement(props.target)
                  ? (props.target as HTMLElement)
                  : document.body;

        // cache container
        const container = document.createElement("div");

        // create dynamic component
        const vnode = createVNode(DynamicComponent, {
            ...props,
            instances: instances,
        });
        vnode.appContext = VueInstance._context;

        // render new vue instance into container
        render(vnode, container);

        // place children into target
        const children = container.childNodes;
        target.append(...children);

        // return exposed functionalities
        return vnode.component.exposed as ProgrammaticExpose;
    },
    closeAll(...args: any[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default UseProgrammatic;

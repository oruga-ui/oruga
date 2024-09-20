import {
    createVNode,
    defineComponent,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    type Component,
    type ComponentInternalInstance,
    type VNode,
} from "vue";

import type InstanceRegistry from "@/utils/InstanceRegistry";
import type { ComponentProps } from "vue-component-type-helpers";

import { isClient } from "@/utils/ssr";

// type ComponentPropsType<C> = C extends ComponentInternalInstance
//     ? C["props"]
//     : C extends DefineComponent
//       ? C["$props"]
//       : Record<string, unknown>;

export type ProgrammaticComponentProps<C extends string | Component> = {
    /**
     * Component to be injected.
     * Terminate the component by emitting a 'close' event — emits('close')
     */
    component: C;
    /**
     * Props to be binded to the injected component.
     * Both attributes and properties can be used in props.
     * Vue automatically picks the right way to assign it.
     * `class` and `style` have the same object / array value support like in templates.
     * Event listeners should be passed as onXxx.
     * @see https://vuejs.org/api/render-function.html#h
     */
    props?: ComponentProps<C>;
    /** Callback function to call on close event */
    onClose?: (...args: unknown[]) => void;
    /**
     * This is used internally for programmatic usage
     * @ignore
     */
    instances: InstanceRegistry<ComponentInternalInstance>;
    /**
     * This is used internally for programmatic usage
     * @ignore
     */
    destroy: () => void;
};

export const ProgrammaticComponent = defineComponent(
    <C extends string | Component>(
        props: ProgrammaticComponentProps<C>,
        { expose, slots },
    ) => {
        // getting a hold of the internal instance in setup()
        const vm = getCurrentInstance();

        let resolve: (value?: unknown) => void = null;
        // create response promise
        const promise = new Promise((p1) => {
            resolve = p1;
        });

        onMounted(() => {
            // add component instance to instance register
            props.instances.add(vm);
        });

        onUnmounted(() => {
            // remove component instance from instance register
            props.instances.remove(vm);
            // call promise resolve
            resolve.apply(null);
        });

        function close(...args: unknown[]): void {
            // call `onClose` handler if given
            if (typeof props.onClose === "function")
                props.onClose.apply(null, args);

            // call `destory` after animation is finished
            setTimeout(() => {
                if (isClient)
                    window.requestAnimationFrame(() => props.destroy());
                else props.destroy();
            });
        }

        /** expose public functionalities for programmatic usage */
        expose({ close, promise });

        // return render function which renders given component
        return (): VNode =>
            createVNode(
                props.component,
                { ...props.props, onClose: close },
                slots["default"],
            );
    },
    // manual runtime props declaration is currently still needed.
    { props: ["component", "props", "onClose", "destroy", "instances"] },
);

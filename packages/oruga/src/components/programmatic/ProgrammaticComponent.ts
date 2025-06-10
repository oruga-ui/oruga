import {
    createVNode,
    defineComponent,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    type ComponentInternalInstance,
    type VNode,
    type VNodeTypes,
} from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import type InstanceRegistry from "@/components/programmatic/InstanceRegistry";
import { isClient } from "@/utils/ssr";

export type ProgrammaticComponentProps<C extends VNodeTypes> = {
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
    props?: ComponentProps<C> | { container?: HTMLElement };
    /** Programmatic component registry instance */
    registry?: InstanceRegistry<ComponentInternalInstance>;
};

export type CloseEventArgs<T extends VNodeTypes> =
    Parameters<ComponentProps<T>["onClose"]> extends never
        ? unknown[]
        : Parameters<ComponentProps<T>["onClose"]>;

export type ProgrammaticComponentEmits<C extends VNodeTypes> = {
    /**
     * On component close event.
     * This get called when the component emits `close` or the exposed `close` function get called.
     */
    close?: (...args: CloseEventArgs<C>) => void;
    /** On component destroy event which get called when the component should be destroyed. */
    destroy?: () => void;
};

// there is a bug with functional defineComponent and extracting the exposed type
// export type ProgrammaticComponentExpose = ComponentExposed<
//     typeof ProgrammaticComponent
// >;

export type ProgrammaticComponentExpose<C extends VNodeTypes> = {
    /** Call the close event of the component. */
    close: (...args: CloseEventArgs<C>) => void;
    /** Promise which get resolved on the close event. */
    promise: Promise<CloseEventArgs<C>>;
};

export const ProgrammaticComponent = defineComponent<
    ProgrammaticComponentProps<VNodeTypes>,
    ProgrammaticComponentEmits<VNodeTypes>
>(
    <C extends VNodeTypes>(
        props: ProgrammaticComponentProps<C>,
        { expose, emit, slots },
    ) => {
        // getting a hold of the internal instance in setup()
        const vm = getCurrentInstance();
        if (!vm)
            throw new Error("ProgrammaticComponent initialisation failed.");

        // create response promise
        let resolve: (args: CloseEventArgs<C>) => void;
        const promise = new Promise<CloseEventArgs<C>>((p1) => (resolve = p1));

        // add component instance to instance register
        onMounted(() => props.registry?.add(vm));

        // remove component instance from instance register
        onUnmounted(() => props.registry?.remove(vm));

        function close(...args: CloseEventArgs<C>): void {
            // emit `onClose` event
            emit("close", ...args);

            // call promise resolve
            resolve(args);

            // emit `destory` event after animation is finished
            setTimeout(() => {
                if (isClient)
                    window.requestAnimationFrame(() => emit("destroy"));
                else emit("destroy");
            });
        }

        /** expose public functionalities for programmatic usage */
        expose({ close, promise } satisfies ProgrammaticComponentExpose<C>);

        // return render function which renders given component
        return (): VNode =>
            createVNode(
                props.component,
                { ...props.props, onClose: close },
                slots["default"],
            );
    },
    {
        name: "ProgrammaticApp",
        // manual runtime props declaration is currently still needed.
        props: ["component", "props", "registry"],
        // manual runtime emits declaration
        emits: ["close", "destroy"],
        // manual runtime slot declaration
        slots: ["default"],
    },
);

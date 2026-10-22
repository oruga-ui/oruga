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
    /** Programmatic component registry instance. */
    registry?: InstanceRegistry<ComponentInternalInstance>;
};

export type CloseEventArgs<T extends VNodeTypes> =
    NonNullable<ComponentProps<T>["onClose"]> extends (...args: any[]) => any
        ? Parameters<ComponentProps<T>["onClose"]>
        : never[];

/** The ProgrammaticComponent close funtion definition. */
type CloseFunction<C extends VNodeTypes> = (
    ...args: CloseEventArgs<C> | unknown[]
) => void;

export type ProgrammaticComponentEmits<C extends VNodeTypes> = {
    /**
     * On component close event.
     * This get called when the component emits `close` or the exposed `close` function get called.
     */
    close?: CloseFunction<C>;
    /** On component destroy event which get called when the component should be destroyed. */
    destroy?: () => void;
};

// there is a bug with functional defineComponent and extracting the exposed type
// export type ProgrammaticComponentExpose = ComponentExposed<
//     typeof ProgrammaticComponent
// >;

export type ProgrammaticComponentExpose<C extends VNodeTypes> = {
    /**
     * Close the component.
     * When the rendered component defines the `deferredClose` option and exposes a `close` function,
     * the request is delegated to it, so the component can e.g. play a leave animation before it emits its `close` event.
     * Otherwise the component is terminated right away.
     */
    close: CloseFunction<C>;
    /** Promise which get resolved on the close event. */
    promise: Promise<Parameters<CloseFunction<C>>>;
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
        let resolve: (args: Parameters<CloseFunction<C>>) => void;
        const promise = new Promise<Parameters<CloseFunction<C>>>(
            (p1) => (resolve = p1),
        );

        // add component instance to instance register
        onMounted(() => props.registry?.add(vm));

        // remove component instance from instance register
        onUnmounted(() => props.registry?.remove(vm));

        /** The rendered component instance, which may expose a `close` function. */
        let child: { close?: unknown } | null = null;

        /** Terminate the component. This get called when the component emits `close`. */
        const onClose: CloseFunction<C> = (...args) => {
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
        };

        /**
         * Request the component to close.
         * Components which define the `deferredClose` option delegate the request to their exposed `close` function,
         * which emits `close` when it is done, e.g. after a leave animation.
         * Every other component is terminated directly, because its `close` function is not guaranteed to emit `close`
         * (e.g. it does nothing when the component is not active).
         */
        const close: CloseFunction<C> = (...args) => {
            const isDeferred =
                (props.component as { deferredClose?: unknown } | undefined)
                    ?.deferredClose === true;
            if (isDeferred && typeof child?.close === "function")
                (child.close as (...args: unknown[]) => void)(...args);
            else onClose(...args);
        };

        /** expose public functionalities for programmatic usage */
        expose({ close, promise } satisfies ProgrammaticComponentExpose<C>);

        // return render function which renders given component
        return (): VNode =>
            createVNode(
                props.component,
                {
                    ...props.props,
                    onClose,
                    ref: (instance: unknown) => {
                        child = instance as typeof child;
                    },
                },
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

import {
    computed,
    getCurrentInstance,
    onMounted,
    type ComputedRef,
    type MaybeRefOrGetter,
} from "vue";
import { isClient, HTMLElement } from "@/utils/ssr";
import { unrefElement } from "@/composables";
import { removeElement } from "@/utils/helpers";
import type { ProgrammaticInstance } from "@/types";

type ProgrammaticOptions = {
    /**
     * DOM element where the programmatic component will be mounted on.
     * Default is `document.body`.
     */
    container?: string | HTMLElement | null;
    /** This defines the programmatic usage. */
    programmatic?: ProgrammaticInstance;
    /**
     * Define if the component is cancelable at all or by specific events.
     * Default is `true`.
     */
    cancelable?: boolean | string[];
    /**
     * Destroy the component on close event.
     * Default is `true`.
     */
    destroy?: boolean;
    /** Callback function to call after close event (programmatically close or user canceled). */
    onClose?: (...args: unknown[]) => void;
};

/**
 * @deprecated
 * This provides functionalities for programmatic usage.
 * The component get appended to the container.
 * This defines a cancel and close handler, as well as escape handler.
 * The component will be destroyed on close.
 * @param elementRef HTMLElement which should injected
 * @param options ProgrammaticOptions
 */
export function useProgrammaticComponent(
    elementRef: MaybeRefOrGetter<typeof HTMLElement>,
    options: ProgrammaticOptions,
): {
    close: (...args: unknown[]) => void;
    cancel: (method: string) => void;
    container: ComputedRef<HTMLElement>;
} {
    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useProgrammaticComponent must be called within a component setup function.",
        );

    const element = computed<HTMLElement>(() =>
        unrefElement<typeof HTMLElement>(elementRef),
    );

    const container = computed(
        (): HTMLElement =>
            typeof options.container === "string"
                ? document.querySelector<HTMLElement>(options.container)
                : (options.container as HTMLElement) || document.body,
    );

    onMounted(() => {
        if (options.programmatic) {
            if (options.programmatic.instances)
                options.programmatic.instances.add(vm);

            // Insert the component in the container or the body tag
            // only if it's programmatic
            if (element.value) container.value.appendChild(element.value);
        }
    });

    /**
     * Check if method is cancelable.
     * Class close with action `cancel`.
     * @param method Cancel method
     */
    function cancel(method: string): void {
        // check if method is cancelable
        if (
            (typeof options.cancelable === "boolean" && !options.cancelable) ||
            !options.cancelable ||
            (Array.isArray(options.cancelable) &&
                !options.cancelable.includes(method))
        )
            return;
        close({ action: "cancel", method });
    }

    /**
     * Call onClose handler.
     * If it's programmatic, resolve promise and destroy the component.
     */
    function close(...args: unknown[]): void {
        // call handler if given
        if (typeof options.onClose === "function")
            options.onClose.apply(null, args);

        if (options.programmatic) {
            if (options.programmatic.instances)
                options.programmatic.instances.remove(vm);

            if (options.programmatic.resolve)
                options.programmatic.resolve.apply(null, args);

            if (typeof options.destroy === "undefined" || options.destroy) {
                // use timeout for any animation to complete before destroying
                setTimeout(() => {
                    if (isClient)
                        window.requestAnimationFrame(() => {
                            // remove the component from the container or the body tag
                            if (element.value) removeElement(element.value);
                            setTimeout(() => console.log(vm), 1000);
                        });
                    else {
                        if (element.value) removeElement(element.value);
                    }
                });
            }
        }
    }

    return { close, cancel, container };
}

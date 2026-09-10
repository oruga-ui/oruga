import {
    onMounted,
    watch,
    getCurrentScope,
    onScopeDispose,
    type MaybeRefOrGetter,
    type Component,
    type WatchSource,
    isRef,
    toValue,
} from "vue";
import { isObject } from "@/utils/helpers";
import { unrefElement } from "./unrefElement";

export type EventTarget =
    | Element
    | Document
    | Window
    | Component
    | null
    | undefined;

export type EventListenerOptions = AddEventListenerOptions & {
    /** Register event listener immediate. Otherwise it will be registered on mounted hook. */
    immediate?: boolean;
    /** Use a custom trigger to define when the listener get registered and removed. */
    trigger?: WatchSource<boolean>;
};

/**
 * Register DOM events using addEventListener on mounted, and removeEventListener automatically on unmounted.
 * Adaption of {@link  https://vueuse.org/core/useEventListener}
 *
 * @param element - Target DOM element to add the listener to.
 * @param event - The event name.
 * @param handler - An event handler function.
 * @param options - Optional additional configuration options.
 * @return Returns a `stop` function to clear the listener.
 */
export function useEventListener(
    element: MaybeRefOrGetter<EventTarget>,
    event: string,
    handler: (evt: any) => void,
    options?: EventListenerOptions,
): () => void {
    let cleanup: () => void;

    const register = (): void => {
        const target = unrefElement(element);
        if (!target) return;

        // create a clone of options, to avoid it being changed reactively on removal
        const optionsClone = isObject(options) ? { ...options } : options;
        target.addEventListener(event, handler, optionsClone);
        cleanup = (): void => {
            target.removeEventListener(event, handler, optionsClone);
        };
    };

    let stopWatch: () => void;

    function toggleListener(value: unknown): void {
        if (value) register();
        else if (typeof cleanup === "function") cleanup();
    }

    if (typeof options?.trigger !== "undefined") {
        /// when we have a trigger we watch the trigger
        stopWatch = watch(options.trigger, toggleListener, {
            flush: "post",
        });
        /// and we check if the trigger is initial true
        /// then we register on component mount
        if (toValue(options.trigger) && getCurrentScope()) {
            onMounted(() => register());
        }
    } else {
        /// if we don't have a trigger, we check if the element is a ref (templateRef)
        /// then we watch the ref get initialised
        if (isRef(element)) {
            stopWatch = watch(element, toggleListener, {
                flush: "sync",
            });
        }
        /// otherwise we register on component mount
        else if (getCurrentScope()) {
            onMounted(() => register());
        }
    }

    if (options?.immediate) {
        register();
    }

    const stop = (): void => {
        // remove listener before unmounting
        if (typeof stopWatch === "function") stopWatch();
        if (typeof cleanup === "function") cleanup();
    };

    if (getCurrentScope()) onScopeDispose(stop);

    return stop;
}

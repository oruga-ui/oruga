import {
    onMounted,
    watch,
    getCurrentScope,
    onScopeDispose,
    type MaybeRefOrGetter,
    type Ref,
    type Component,
} from "vue";
import { isObject } from "@/utils/helpers";
import { unrefElement } from "./unrefElement";

export type EventTarget = Element | Document | Window | Component;
export type EventListenerOptions = AddEventListenerOptions & {
    /** Register event listener immediate or on mounted hook. */
    immediate?: boolean;
    /** Trigger when the listener get registered and removed */
    trigger?: Ref<boolean>;
};

/**
 * Register DOM events using addEventListener on mounted, and removeEventListener automatically on unmounted.
 * Adaption of {@link  https://vueuse.org/core/useEventListener}
 *
 * @param event Event name
 * @param handler Event handler function
 * @param element DOM element to add the listener to - default docuemnt
 * @param options EventListenerOptions
 * @return stop function
 */
export function useEventListener(
    event: string,
    handler: (evt?: any) => any,
    element: MaybeRefOrGetter<EventTarget> = document,
    options?: EventListenerOptions,
): () => void {
    let cleanup: () => void;

    const register = (): void => {
        if (!element) return;

        const target = unrefElement(element);
        // create a clone of options, to avoid it being changed reactively on removal
        const optionsClone = isObject(options) ? { ...options } : options;
        // register listener with timeout to prevent animation collision
        setTimeout(() => {
            target.addEventListener(event, handler, optionsClone);
            cleanup = (): void => {
                target.removeEventListener(event, handler, optionsClone);
            };
        });
    };

    let stopWatch: () => void;

    if (typeof options?.trigger !== "undefined") {
        stopWatch = watch(
            options.trigger,
            (value) => {
                // toggle listener
                if (value) register();
                else if (typeof cleanup === "function") cleanup();
            },
            { flush: "post" },
        );
    }

    if (options?.immediate) register();
    else {
        // register listener on mount
        onMounted(() => {
            if (
                typeof options?.trigger === "undefined" ||
                options.trigger.value
            )
                register();
        });
    }

    const stop = (): void => {
        // remove listener before unmounting
        if (typeof stopWatch === "function") stopWatch();
        if (typeof cleanup === "function") cleanup();
    };

    if (getCurrentScope()) onScopeDispose(stop);

    return stop;
}

import {
    onBeforeUnmount,
    onMounted,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import { isObject } from "@/utils/helpers";
import { unrefElement } from "./unrefElement";

export type EventTarget = Element | Document | Window;
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
            cleanup = (): void =>
                target.removeEventListener(event, handler, optionsClone);
        });
    };

    const stop = (): void => {
        if (typeof cleanup === "function") cleanup();
    };

    let watchStop;

    if (typeof options?.trigger !== "undefined") {
        watchStop = watch(options.trigger, (value) => {
            // toggle listener
            if (value) register();
            else stop();
        });
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

    // remove listener before unmounting
    onBeforeUnmount(() => {
        stop();
        if (typeof watchStop === "function") watchStop();
    });

    return stop;
}

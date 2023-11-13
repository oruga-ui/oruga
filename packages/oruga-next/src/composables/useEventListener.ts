import { isObject } from "@/utils/helpers";
import { unrefElement } from "@/utils/unrefElement";
import { onBeforeUnmount, onMounted, type MaybeRefOrGetter } from "vue";

type EventTarget = Element | Document | Window;
type EventListenerOptions = AddEventListenerOptions & {
    /** Register event listener immediate or on mounted hook. */
    immediate?: boolean;
};

/**
 * Register DOM events using addEventListener on mounted, and removeEventListener automatically on unmounted.
 * Adaption of {@link  https://vueuse.org/core/useEventListener}
 *
 * @param event event name
 * @param listener event listener function
 * @param el default docuemnt
 * @return stop function
 */
export function useEventListener(
    event: string,
    listener: (evt?: any) => any,
    el: MaybeRefOrGetter<EventTarget> = document,
    options?: EventListenerOptions,
): () => void {
    let cleanup: () => void;

    const register = (): void => {
        if (!el) return;

        const target = unrefElement(el);
        // create a clone of options, to avoid it being changed reactively on removal
        const optionsClone = isObject(options) ? { ...options } : options;
        target.addEventListener(event, listener, optionsClone);
        cleanup = (): void =>
            target.removeEventListener(event, listener, optionsClone);
    };

    const stop = (): void => {
        if (typeof cleanup === "function") cleanup();
    };

    if (options?.immediate) register();
    else {
        onMounted(() => register());
        onBeforeUnmount(() => stop());
    }

    return stop;
}

import { type MaybeRefOrGetter } from "vue";
import {
    useEventListener,
    type EventTarget,
    type EventListenerOptions,
} from "./useEventListener";
import { unrefElement } from "./unrefElement";

/**
 * Listen for clicks outside of an element.
 * Adaption of {@link https://vueuse.org/core/onClickOutside}
 *
 * @param elements DOM elements to click outside
 * @param handler Event handler function
 * @param options ClickOutsideOptions
 * @return stop function
 */
export function useClickOutside(
    elements:
        | MaybeRefOrGetter<EventTarget>
        | string
        | (MaybeRefOrGetter<EventTarget> | string)[],
    handler: (evt: PointerEvent) => void,
    options?: EventListenerOptions,
): () => void {
    if (!window) return () => {};

    // set default options
    const listenerOptions = Object.assign({ ignore: [] }, options);
    // convert elements to ignore list
    const ignores = Array.isArray(elements) ? elements : [elements];

    /**
     * White-listed items that not emit event when clicked.
     * All children from ignore prop.
     */
    const shouldIgnore = (event: PointerEvent): boolean => {
        return ignores.some((target) => {
            if (typeof target === "string") {
                return Array.from(
                    window.document.querySelectorAll(target),
                ).some(
                    (el) =>
                        el === event.target ||
                        event.composedPath().includes(el),
                );
            } else {
                const el = unrefElement(target);
                return (
                    el &&
                    (event.target === el || event.composedPath().includes(el))
                );
            }
        });
    };

    function listener(event: PointerEvent): void {
        if (shouldIgnore(event)) return;
        handler(event);
    }

    const stop = useEventListener(window, "click", listener, listenerOptions);

    return stop;
}

import { type MaybeRefOrGetter } from "vue";
import {
    useEventListener,
    type EventTarget,
    type EventListenerOptions,
} from "./useEventListener";
import { unrefElement } from "./unrefElement";

export type ClickOutsideOptions = EventListenerOptions & {
    ignore?: (MaybeRefOrGetter | string)[];
};

/**
 * Listen for clicks outside of an element.
 * Adaption of {@link https://vueuse.org/core/onClickOutside}
 *
 * @param element DOM element to click outside
 * @param handler Event handler function
 * @param options ClickOutsideOptions
 * @return stop function
 */
export function useClickOutside(
    element: MaybeRefOrGetter<EventTarget>,
    handler: (evt: PointerEvent) => void,
    options: ClickOutsideOptions = {},
): () => void {
    if (!window) return;

    // set default options
    const listenerOptions = Object.assign(
        {
            ignore: [],
        },
        options,
    );

    /**
     * White-listed items that not emit event when clicked.
     * All children from ignore prop.
     */
    const shouldIgnore = (event: PointerEvent): boolean => {
        return listenerOptions.ignore.some((target) => {
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

    const listener = (event: PointerEvent): void => {
        const el = unrefElement(element);
        if (!el || el === event.target || event.composedPath().includes(el))
            return;
        if (shouldIgnore(event)) return;
        handler(event);
    };

    const stop = useEventListener("click", listener, window, listenerOptions);

    return stop;
}

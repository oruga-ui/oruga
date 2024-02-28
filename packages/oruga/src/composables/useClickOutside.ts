import { type MaybeRefOrGetter } from "vue";
import { useEventListener } from "./useEventListener";
import { unrefElement } from "./unrefElement";

/**
 * Listen for clicks outside of an element.
 * Adaption of {@link https://vueuse.org/core/onClickOutside}
 *
 * @param target Target element
 * @param handler Event handler
 * @param ignore Element to ignore
 * @return stop function
 */
export function useClickOutside(
    target: MaybeRefOrGetter,
    handler: (evt: PointerEvent) => void,
    ignore: (MaybeRefOrGetter | string)[] = [],
): () => void {
    if (!window) return;

    /**
     * White-listed items that not emit event when clicked.
     * All children from ignore prop.
     */
    const shouldIgnore = (event: PointerEvent): boolean => {
        return ignore.some((target) => {
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
        const el = unrefElement(target);
        if (!el || el === event.target || event.composedPath().includes(el))
            return;
        if (shouldIgnore(event)) return;
        handler(event);
    };

    const stop = useEventListener("click", listener, window, {
        immediate: true,
        passive: true,
    });

    return stop;
}

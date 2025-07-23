import type { MaybeRefOrGetter } from "vue";
import { isClient } from "@/utils/ssr";
import { useEventListener, type EventTarget } from "./useEventListener";
import { unrefElement } from "./unrefElement";

export function useInfiniteScroll(
    elementRef: MaybeRefOrGetter<EventTarget>,
    onEnd: () => void,
    onStart: () => void,
): { checkScroll: () => void } {
    if (isClient) useEventListener(elementRef, "scroll", checkScroll);

    /** Check if the scroll list inside the dropdown reached the top or it's end. */
    function checkScroll(): void {
        const element = unrefElement(elementRef);
        if (!element) return;
        const trashhold = element.offsetTop;
        if (element.clientHeight !== element.scrollHeight) {
            if (
                Math.ceil(
                    element.scrollTop + element.clientHeight + trashhold,
                ) >= element.scrollHeight
            ) {
                onEnd();
            } else if (element.scrollTop <= trashhold) {
                onStart();
            }
        }
    }

    return { checkScroll };
}

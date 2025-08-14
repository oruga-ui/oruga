import { getCurrentScope, type Component, type MaybeRefOrGetter } from "vue";
import { isDefined } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import { unrefElement } from "./unrefElement";
import { useDebounce } from "./useDebounce";
import { useEventListener, type EventTarget } from "./useEventListener";

/** Call a function when the scoll reaches the end or the start of an element.
 * This is useful for infinite scroll lists.
 * @param element - The element to listen for scroll events.
 * @param options - Options for the infinite scroll.
 * @param options.onScroll - Function to call on every scroll event.
 * @param options.onEnd - Function to call when the scroll reaches the end.
 * @param options.onStart - Function to call when the scroll reaches the start.
 * @param options.debounce - Debounce time in milliseconds for the function call on scroll events.
 * @returns A function to call to to manually check the scroll position.
 */
export function useScrollEvents(
    element: MaybeRefOrGetter<EventTarget>,
    options: {
        onScroll?: () => void;
        onScrollEnd?: () => void;
        onScrollStart?: () => void;
        debounce?: number;
    },
): () => void {
    if (!getCurrentScope())
        throw new Error(
            "The 'useScrollEvents' composable should be used inside a current EffectScope.",
        );

    const debouncedCheckScroll = useDebounce(
        checkScroll,
        options.debounce ?? 100,
    );
    if (isClient)
        useEventListener(element, "scroll", debouncedCheckScroll, {
            passive: true,
        });

    /** Check if the scroll list inside the dropdown reached the top or it's end. */
    function checkScroll(): void {
        const el = unrefElement(element);
        if (!el) return;
        if (options.onScroll) options.onScroll();

        const trashhold = el.offsetTop;
        if (el.clientHeight !== el.scrollHeight) {
            if (
                Math.ceil(el.scrollTop + el.clientHeight + trashhold) >=
                el.scrollHeight
            ) {
                if (options.onScrollEnd) options.onScrollEnd();
            } else if (el.scrollTop <= trashhold) {
                if (options.onScrollStart) options.onScrollStart();
            }
        }
    }

    return debouncedCheckScroll;
}

/**
 * Given an element, returns the element who scrolls it.
 */
export function getScrollingParent(target: HTMLElement): HTMLElement | null {
    if (target.style.position === "fixed" || !target)
        return document.documentElement;

    let isScrollingParent = false;
    let nextParent = target.parentElement;

    while (!isScrollingParent && isDefined(nextParent)) {
        if (nextParent === document.documentElement) break;

        const { overflow, overflowY } = getComputedStyle(nextParent);
        const { scrollHeight, clientHeight } = nextParent; // Both rounded by nature

        isScrollingParent =
            /(auto|scroll)/.test(`${overflow}${overflowY}`) &&
            scrollHeight > clientHeight;

        /* ...found it, this one is returned */
        if (isScrollingParent) break;

        /* ...if not check the next one */
        nextParent = nextParent.parentElement;
    }

    return nextParent;
}

/**
 * Check if an element is visible in the browser viewport.
 * @deprecated currently unused - can be deleted
 */
export function isElementInView(
    elementRef: MaybeRefOrGetter<HTMLElement>,
): boolean {
    const element = unrefElement(elementRef);
    const bounding = element.getBoundingClientRect();

    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Check if an element is currently scrollable by comparing its clientHeight and scrollHeight.
 * @deprecated currently unused - can be deleted
 */
export function isScrollable(
    elementRef: MaybeRefOrGetter<HTMLElement>,
): boolean {
    const element = unrefElement(elementRef);
    return element && element.clientHeight < element.scrollHeight;
}

/**
 * Ensure a given child element is within the parent's visible scroll area.
 * If the child is not visible, scroll the parent to the child's position.
 */
export function scrollElementInView(
    scrollableParent: MaybeRefOrGetter<HTMLElement | Component | null>,
    childElement: MaybeRefOrGetter<HTMLElement | Component | null>,
): void {
    const parent = unrefElement(scrollableParent);
    const element = unrefElement(childElement);

    if (!parent || !element) return;

    const { offsetHeight, offsetTop } = element;
    const { offsetHeight: parentOffsetHeight, scrollTop } = parent;

    const isAbove = offsetTop < scrollTop;
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

    if (isAbove) {
        parent.scrollTo(0, offsetTop);
    } else if (isBelow) {
        parent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
    }
}

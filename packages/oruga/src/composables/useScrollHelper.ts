import type { MaybeRefOrGetter } from "vue";
import { unrefElement } from "./unrefElement";
import { isDefined } from "@/utils/helpers";

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
 * @deprecated unused
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
 * @deprecated unused
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
export function maintainScrollVisibility(
    activeElement: MaybeRefOrGetter<HTMLElement>,
    scrollParent: MaybeRefOrGetter<HTMLElement>,
): void {
    const parent = unrefElement(scrollParent);
    const element = unrefElement(activeElement);

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

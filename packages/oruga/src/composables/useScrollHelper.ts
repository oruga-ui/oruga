import type { MaybeRefOrGetter } from "vue";
import { unrefElement } from "./unrefElement";

/** check if element is visible in browser view port */
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

/** check if an element is currently scrollable */
export function isScrollable(
    elementRef: MaybeRefOrGetter<HTMLElement>,
): boolean {
    const element = unrefElement(elementRef);
    return element && element.clientHeight < element.scrollHeight;
}

/**
 * ensure a given child element is within the parent's visible scroll area
 * if the child is not visible, scroll the parent
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

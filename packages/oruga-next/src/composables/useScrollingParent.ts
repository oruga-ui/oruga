/**
 * Given an element, returns the element who scrolls it.
 */
export function getScrollingParent(target: HTMLElement): HTMLElement {
    if (target.style.position === "fixed" || !target)
        return document.documentElement;

    let isScrollingParent = false;
    let nextParent = target.parentElement;

    while (!isScrollingParent) {
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

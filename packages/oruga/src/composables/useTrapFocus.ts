/*****************************
 * vue v-trap-focus directive
 *****************************/

import type { DirectiveHook, ObjectDirective } from "vue";

function findFocusable(element: HTMLElement): NodeListOf<HTMLElement> | null {
    if (!element) return null;
    return element.querySelectorAll(`a[href]:not([tabindex="-1"]),
                                 area[href],
                                 input:not([disabled]):not([type="hidden"]),
                                 select:not([disabled]),
                                 textarea:not([disabled]),
                                 button:not([disabled]),
                                 iframe,
                                 object,
                                 embed,
                                 *[tabindex]:not([tabindex="-1"]):not([disabled]),
                                 *[contenteditable]`);
}

export function useTrapFocus(): {
    /** vue directive - trap focus on the current element */
    vTrapFocus: ObjectDirective<HTMLElement>;
} {
    /** keydown event, which compares event target with trap element */
    let onKeyDown: ((event: KeyboardEvent) => void) | null = null;

    function applyHandler(el: HTMLElement, value: boolean): void {
        if (value) {
            // move focus inside the root element
            el.focus();

            // set keydown event listener
            if (typeof onKeyDown === "function")
                el.addEventListener("keydown", onKeyDown);
        } else {
            // remove keydown event listener
            if (typeof onKeyDown === "function")
                el.removeEventListener("keydown", onKeyDown);
        }
    }

    const bind: DirectiveHook<HTMLElement> = (el, { value }) => {
        // create onKeyDown event listener
        onKeyDown = (event: KeyboardEvent): void => {
            const target = event.target as HTMLElement;
            if (!target) return;

            // Need to get focusable each time since it can change between key events
            // ex. changing month in a datepicker
            const focusable = findFocusable(el);
            if (!focusable?.length) return;

            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];

            if (
                target === firstFocusable &&
                event.shiftKey &&
                event.key === "Tab"
            ) {
                // prevent moving focus outside by setting the focus to last focusable element
                event.preventDefault();
                lastFocusable.focus();
            } else if (
                target === lastFocusable &&
                !event.shiftKey &&
                event.key === "Tab"
            ) {
                // prevent moving focus outside by setting the focus to first focusable element
                event.preventDefault();
                firstFocusable.focus();
            }
        };

        applyHandler(el, value);
    };

    /** cleanup on unbind */
    const unbind: DirectiveHook = (el) => {
        // remove handler
        applyHandler(el, false);
        onKeyDown = null;
    };

    const update: DirectiveHook<HTMLElement> = (el, { value }) => {
        // update handlers based on binding
        applyHandler(el, value);
    };

    return {
        vTrapFocus: {
            mounted: bind,
            beforeUnmount: unbind,
            updated: update,
        },
    };
}

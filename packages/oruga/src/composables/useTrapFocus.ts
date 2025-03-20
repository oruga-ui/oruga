/*****************************
 * vue v-trap-focus directive
 *****************************/

import type { DirectiveHook, ObjectDirective } from "vue";

function findFocusable(element: HTMLElement): NodeListOf<HTMLElement> | null {
    if (!element) return null;
    return element.querySelectorAll(`a[href]:not([tabindex="-1"]),
                                 area[href],
                                 input:not([disabled]),
                                 select:not([disabled]),
                                 textarea:not([disabled]),
                                 button:not([disabled]),
                                 iframe,
                                 object,
                                 embed,
                                 *[tabindex]:not([tabindex="-1"]),
                                 *[contenteditable]`);
}

export function useTrapFocus(): {
    /** vue directive - trap focus on the current element */
    vTrapFocus: ObjectDirective<HTMLElement>;
} {
    let onKeyDown: ((event: KeyboardEvent) => void) | undefined;

    const bind: DirectiveHook<HTMLElement> = (el, { value = true }) => {
        /** keydown event, which compares event target with trap element */
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

        if (value) {
            // move focus inside the root element
            el.focus();
            // set keydown event listener
            el.addEventListener("keydown", onKeyDown);
        } else
            // remove keydown event listener
            el.removeEventListener("keydown", onKeyDown);
    };

    /** cleanup on unbind */
    const unbind: DirectiveHook = (el) => {
        // remove keydown event listener
        el.removeEventListener("keydown", onKeyDown);
        onKeyDown = undefined;
    };

    return {
        vTrapFocus: {
            mounted: bind,
            beforeUnmount: unbind,
        },
    };
}

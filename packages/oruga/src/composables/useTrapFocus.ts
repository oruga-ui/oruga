import {
    toValue,
    type DirectiveHook,
    type MaybeRefOrGetter,
    type ObjectDirective,
} from "vue";

/**
 * Returns all focusable elements inside the given element
 */
export function findFocusable(
    element: MaybeRefOrGetter<HTMLElement>,
): NodeListOf<HTMLElement> {
    return toValue(element).querySelectorAll(`a[href]:not([tabindex="-1"]),
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

/**
 * Creates a vue v-trap-focus directive which sets the focus on the given element when mounted
 * and traps the focus inside the element.
 */
export function useTrapFocus(): {
    /** vue directive - trap focus on the current element */
    vTrapFocus: ObjectDirective<HTMLElement>;
} {
    /** keydown event, which compares event target with trap element */
    let onKeyDown: ((event: KeyboardEvent) => void) | null = null;

    function applyHandler(el: HTMLElement, value: boolean): void {
        if (value) {
            // move focus inside the root element
            el.focus({ preventScroll: true });

            // set keydown event listener
            if (typeof onKeyDown === "function")
                el.addEventListener("keydown", onKeyDown);
        } else {
            // remove keydown event listener
            if (typeof onKeyDown === "function")
                el.removeEventListener("keydown", onKeyDown);
        }
    }

    const onMounted: DirectiveHook<HTMLElement> = (el, { value }) => {
        // create onKeyDown event listener
        onKeyDown = (event: KeyboardEvent): void => {
            const target = event.target as HTMLElement;
            if (!target) return;

            // Need to get focusable each time since it can change between key events
            // ex. changing month in a datepicker
            const focusable = findFocusable(el);
            if (!focusable?.length) {
                event.preventDefault();
                return;
            }

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

        // apply handler when binding value is already true
        if (value) applyHandler(el, value);
    };

    /** cleanup on beforeUnmount */
    const onBeforeUnmount: DirectiveHook<HTMLElement> = (el) => {
        // remove handler
        applyHandler(el, false);
        onKeyDown = null;
    };

    const onUpdate: DirectiveHook<HTMLElement> = (el, { value, oldValue }) => {
        // check if binding value has changed
        if (value !== oldValue)
            // update handler based on binding value
            applyHandler(el, value);
    };

    return {
        vTrapFocus: {
            mounted: onMounted,
            beforeUnmount: onBeforeUnmount,
            updated: onUpdate,
        },
    };
}

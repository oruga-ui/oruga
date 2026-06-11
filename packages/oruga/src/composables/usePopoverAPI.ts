import {
    onMounted,
    ref,
    watch,
    isRef,
    useId,
    toValue,
    type MaybeRefOrGetter,
    type WatchSource,
} from "vue";
import {
    unrefElement,
    useEventListener,
    type EventTarget,
} from "@/composables";

type BasePosition = "top" | "bottom" | "left" | "right" | "center";
/**
 * The possible positions of the `position-area` attribute.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/position-area_value
 */
export type PopoverPosition = BasePosition | [BasePosition, BasePosition];

export type PopoverAPIOptions = {
    /**
     * Positioning area used for the popover (mapped to `CSS position-area`).
     * In addition `centered` center the content in the middle of the screen.
     */
    position?: "centered" | PopoverPosition;
    /** Reference or getter resolving to the trigger element. */
    triggerRef: MaybeRefOrGetter<EventTarget>;
    /** Reference or getter resolving to the popover content element. */
    contentRef: MaybeRefOrGetter<EventTarget>;
    /**
     * Native popover behavior - defaults to `"auto"`.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/popover#value
     */
    behavior?: "auto" | "hint" | "manual";
    /**
     * An Optional delay (in ms) before opening the popover.
     */
    delay?: number;
    /** An optional watch source which will be watched and to open or close the popover. */
    trigger?: WatchSource<boolean>;
    /** Stop interactions. */
    disabled?: MaybeRefOrGetter<boolean>;
    /**  Optional listener for the native `toggle` event. */
    onToggle?: (e: ToggleEvent) => void;
    /** Optional listener for the native `beforetoggle` event. */
    onBeforeToggle?: (e: ToggleEvent) => void;
};

/**
 * Composable providing an imperative API to control a native HTML Popover.
 *
 * This utility wires a trigger element and a content element together using
 * the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
 * and exposes methods to open, close, and toggle the popover.
 * It also handles accessibility attributes, positioning styles, and optional
 * lifecycle event listeners.
 *
 * @remarks
 * - Automatically assigns `popovertarget` and ARIA attributes when possible.
 * - Applies fallback positioning strategies via CSS `position-try-fallbacks`.
 * - Requires a supporting browser with the native Popover API.
 * - Event listeners are registered on mount and cleaned up on unmount.
 *
 * @param options - Configuration options for the popover behavior.
 * @returns Popover API handler.
 */
export function usePopoverAPI(options: PopoverAPIOptions): {
    open: () => void;
    close: () => void;
    toggle: () => void;
} {
    const {
        position = "top",
        behavior = "auto",
        delay,
        trigger,
        disabled,
        triggerRef,
        contentRef,
    } = options;

    let timeout: ReturnType<typeof setTimeout> | undefined;

    const active = ref(false);

    let triggerEl: HTMLElement | undefined | null;
    let contentEl: HTMLElement | undefined | null;

    if (isRef(trigger)) {
        // show/hide popover when trigger changes
        watch(
            trigger,
            (value) => {
                if (active.value === value) return;
                if (value) open();
                else close();
            },
            { flush: "post" },
        );
    }

    function open(): void {
        if (toValue(disabled)) return;

        // always open on the next JS loop after all events have been handled
        timeout = setTimeout(() => {
            if (!contentEl || !triggerEl || active.value) return;
            contentEl.showPopover({ source: triggerEl }); // open popover with native api
            timeout = undefined;
            active.value = true;
        }, delay);
    }

    function close(): void {
        if (toValue(disabled)) return;
        if (timeout) clearTimeout(timeout);
        if (!contentEl) return;
        contentEl.hidePopover(); // hide popover with native api
        active.value = false;
    }

    function toggle(): void {
        if (toValue(disabled)) return;
        if (!contentEl) return;
        contentEl.togglePopover(); // toggle popover state with native api
        active.value = !active.value;
    }

    function onTriggerClick(event: Event): void {
        if (
            event.currentTarget instanceof HTMLButtonElement ||
            (event.currentTarget instanceof HTMLInputElement &&
                event.currentTarget.type === "button")
        )
            // prevent default click event when is button
            event.preventDefault();

        // open popover
        open();
    }

    function onTriggerKeydown(event: KeyboardEvent): void {
        if (event.code !== "Enter" && event.code !== "Space") return;
        event.preventDefault();

        // open popover
        open();
    }

    // add event listener on trigger element
    if (behavior !== "manual") {
        useEventListener(triggerRef, "click", onTriggerClick);
        useEventListener(triggerRef, "keydown", onTriggerKeydown);
    }

    // add toggle event listener on content element
    if (typeof options.onToggle === "function")
        useEventListener(contentRef, "toggle", options.onToggle);
    if (typeof options.onBeforeToggle === "function")
        useEventListener(contentRef, "beforetoggle", options.onBeforeToggle);

    let contentId = useId();

    onMounted(() => {
        contentEl = unrefElement(contentRef);
        triggerEl = unrefElement(triggerRef);
        if (!contentEl || !triggerEl) {
            console.warn(
                "Content or trigger element is missing for the popover api initialisation.",
            );
            return;
        }
        if (triggerEl.firstElementChild instanceof HTMLButtonElement)
            triggerEl = triggerEl.firstElementChild;

        // check content has id
        if (contentEl.hasAttribute("id")) {
            contentId = contentEl.getAttribute("id")!;
        }

        if (import.meta.env?.VITEST === "true") {
            // polyfill for test environment - this is normally set in the browser
            contentEl.style.display = "none";
        }

        // place popover attribute on content
        contentEl.popover = behavior;

        // add content position styles
        contentEl.style.positionArea =
            position === "centered"
                ? "none"
                : Array.isArray(position)
                  ? position.join(" ")
                  : position;
        contentEl.style.positionTryFallbacks =
            "flip-block, flip-inline, flip-block flip-inline";

        // add position data attribute
        contentEl.dataset.position = position.toString();

        if (behavior !== "manual") {
            // check if the trigger has native popover target support
            if (
                triggerEl instanceof HTMLButtonElement ||
                (triggerEl instanceof HTMLInputElement &&
                    triggerEl.type === "button")
            ) {
                // add related popover properties
                triggerEl.setAttribute("popovertarget", contentId);
            } else {
                // add interactive proptiers
                if (!triggerEl.role) triggerEl.role = "button";
                triggerEl.tabIndex = 0;
            }
        }

        // set a11y attributes
        triggerEl.setAttribute("aria-details", contentId);
        triggerEl.setAttribute("aria-controls", contentId);

        // open on mount
        if (typeof trigger === "undefined" || toValue(trigger)) open();
    });

    return {
        open,
        close,
        toggle,
    };
}

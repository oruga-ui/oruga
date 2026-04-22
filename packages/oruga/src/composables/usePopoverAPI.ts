import { onMounted, ref, type Ref, type MaybeRefOrGetter } from "vue";
import {
    unrefElement,
    useEventListener,
    type EventTarget,
} from "@/composables";

type BasePosition = "top" | "bottom" | "left" | "right" | "center";
export type PopoverPosition = BasePosition | [BasePosition, BasePosition];

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
 * @param options.position - Positioning area used for the popover (mapped to `CSS position-area`).
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/popover#value
 * @param options.behavior - Native popover behavior - defaults to `"auto"`.
 * @param options.delay - Optional delay (in ms) before opening the popover.
 * @param options.triggerRef - Reference or getter resolving to the trigger element.
 * @param options.contentRef - Reference or getter resolving to the popover content element.
 * @param options.onToggle - Optional listener for the native `toggle` event.
 * @param options.onBeforeToggle - Optional listener for the native `beforetoggle` event.
 *
 * @returns Popover API handler.
 */
export function usePopoverAPI(options: {
    position: PopoverPosition;
    /** see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/popover#value */
    behavior?: "auto" | "hint" | "manuell";
    delay?: number;
    triggerRef: MaybeRefOrGetter<EventTarget>;
    contentRef: MaybeRefOrGetter<EventTarget>;
    onToggle?: (e: ToggleEvent) => void;
    onBeforeToggle?: (e: ToggleEvent) => void;
}): {
    active: Ref<boolean>;
    open: () => void;
    close: () => void;
    toggle: () => void;
} {
    const {
        position,
        behavior = "auto",
        delay,
        triggerRef,
        contentRef,
    } = options;

    let timeout: ReturnType<typeof setTimeout> | undefined;

    const active = ref(false);

    function open(): void {
        const trigger = unrefElement(triggerRef);
        const content = unrefElement(contentRef);
        if (!content || !trigger || active.value) return;

        // always open on the next JS loop after all events have been handled
        timeout = setTimeout(() => {
            content.showPopover({ source: trigger }); // open popover with native api
            timeout = undefined;
            active.value = true;
        }, delay);
    }

    function close(): void {
        if (timeout) clearTimeout(timeout);
        const content = unrefElement(contentRef);
        if (!content || !active.value) return;
        content.hidePopover(); // hide popover with native api
        active.value = false;
    }

    function toggle(): void {
        const content = unrefElement(contentRef);
        if (!content) return;
        content.togglePopover(); // toggle popover state with native api
        active.value = !active.value;
    }

    function onTriggerClick(event: Event): void {
        if (
            event.target instanceof HTMLButtonElement ||
            (event.target instanceof HTMLInputElement &&
                event.target.type === "button")
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
    useEventListener(triggerRef, "click", onTriggerClick);
    useEventListener(triggerRef, "keydown", onTriggerKeydown);

    // add toggle event listener on content element
    if (options.onToggle)
        useEventListener(contentRef, "toggle", options.onToggle);
    if (options.onBeforeToggle)
        useEventListener(contentRef, "beforetoggle", options.onBeforeToggle);

    onMounted(() => {
        const content = unrefElement(contentRef);
        const trigger = unrefElement(triggerRef);
        if (!content || !trigger) {
            console.warn(
                "Content or trigger element is missing for the popover api initialisation.",
            );
            return;
        }

        // check content has id
        if (!Object.hasOwn(content, "id") && !content.getAttribute("id")) {
            console.warn("The content element does not have an id.");
            return;
        }

        const id = content.getAttribute("id")!;

        // place popover attribute on content
        content.popover = behavior;

        // check if the trigger has native popover target support
        if (
            trigger instanceof HTMLButtonElement ||
            (trigger instanceof HTMLInputElement && trigger.type === "button")
        ) {
            // add related popover properties
            trigger.setAttribute("popovertarget", id);
        } else {
            // add interactive proptiers
            trigger.role = "button";
            trigger.tabIndex = 0;
        }

        // set a11y attributes
        trigger.setAttribute("aria-details", id);
        trigger.setAttribute("aria-controls", id);

        // add content position styles
        content.style.positionArea = position.toString();
        content.style.positionTryFallbacks =
            "flip-block, flip-inline, flip-block flip-inline";
    });

    return {
        active,
        open,
        close,
        toggle,
    };
}

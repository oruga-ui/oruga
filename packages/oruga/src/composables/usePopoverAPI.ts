import {
    onMounted,
    ref,
    watch,
    isRef,
    toValue,
    watchEffect,
    type MaybeRefOrGetter,
    type WatchSource,
} from "vue";
import {
    unrefElement,
    useAnimationsAPI,
    useEventListener,
    type AnimationName,
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
     * @default 'top'
     */
    position?: MaybeRefOrGetter<"centered" | PopoverPosition>;
    /** Reference or getter resolving to the target element. */
    targetRef: MaybeRefOrGetter<EventTarget>;
    /** Reference or getter resolving to the popover content element. */
    contentRef: MaybeRefOrGetter<EventTarget>;
    /**
     * Native popover behavior - defaults to `"auto"`.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/popover#value
     * @default 'auto'
     */
    behavior?: "auto" | "hint" | "manual";
    /**
     * Defines if the target element can also trigger the popover.
     * @default true
     */
    targetTrigger?: boolean;
    /** An Optional delay (in ms) before opening the popover. */
    delay?: number;
    /**
     * Open/close animation, played via the Web Animations API.
     * Set to `false` to disable.
     * @default false
     */
    animation?: MaybeRefOrGetter<AnimationName | false | undefined>;
    /** An optional watch source which will be watched and to open or close the popover. */
    trigger?: WatchSource<boolean>;
    /** Stop interactions. */
    disabled?: MaybeRefOrGetter<boolean>;
    /** Optional listener for the native `toggle` event. */
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
    /** Open the popover. */
    open: () => void;
    /** Close the popover. */
    close: () => void;
    /** Toggle the popover. */
    toggle: () => void;
} {
    const {
        position = "top",
        behavior = "auto",
        delay,
        trigger,
        disabled,
        animation,
        targetTrigger = true,
        targetRef,
        contentRef,
    } = options;

    const active = ref(false);
    // mirrors the real native popover open state, kept in sync exclusively
    // via the `toggle` event (see `onNativeToggle`), since that's the only
    // reliable, synchronous signal for state changes we didn't initiate
    // ourselves (e.g. light-dismiss, or a native `popovertarget` click)
    let nativeOpen = false;

    let timeout: ReturnType<typeof setTimeout> | undefined;

    let targetEl: HTMLElement | undefined | null;
    let contentEl: HTMLElement | undefined | null;

    const { play } = useAnimationsAPI();

    /** plays the open/close animation (if any), resolving once it's finished */
    function playAnimation(opening: boolean): Promise<void> {
        return play(contentEl, toValue(animation), opening);
    }

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

        clearTimeout(timeout);

        // always open on the next JS loop after all events have been handled
        timeout = setTimeout(() => {
            if (!contentEl || !targetEl || active.value) return;
            // guard against double-opening while a deferred `close()` is
            // still waiting on the leave animation to actually hide it
            if (!nativeOpen) contentEl.showPopover({ source: targetEl }); // open popover with native api
            timeout = undefined;
            active.value = true;
            playAnimation(true);
        }, delay);
    }

    function close(): void {
        if (toValue(disabled)) return;
        if (timeout) clearTimeout(timeout);
        if (!active.value) return;
        // flip the visual state first (consumers watching the `trigger`/
        // model sync off this), then play the leave animation, and only
        // hide the native popover once it has actually finished - this is
        // the fix: the native hide no longer happens instantly
        active.value = false;
        playAnimation(false).then(() => {
            if (active.value || !nativeOpen || !contentEl) return;
            contentEl.hidePopover(); // hide popover with native api
        });
    }

    function toggle(): void {
        if (toValue(disabled)) return;
        if (active.value) close();
        else open();
    }

    function onTriggerClick(event: Event): void {
        if (
            event.currentTarget instanceof HTMLButtonElement ||
            (event.currentTarget instanceof HTMLInputElement &&
                event.currentTarget.type === "button")
        )
            // prevent default click event when is button
            event.preventDefault();

        open(); // open popover
    }

    function onTriggerKeydown(event: KeyboardEvent): void {
        if (event.code !== "Enter" && event.code !== "Space") return;
        event.preventDefault();

        open(); // open popover
    }

    // add event listener on trigger element
    if (behavior !== "manual") {
        useEventListener(targetRef, "click", onTriggerClick);
        useEventListener(targetRef, "keydown", onTriggerKeydown);
    }

    function onNativeToggle(event: ToggleEvent): void {
        nativeOpen = event.newState === "open";

        // keep the visual `active` state in sync with the real native
        // popover state, including changes we didn't initiate ourselves
        // (light-dismiss, Escape, popover group exclusivity, ...)
        if (nativeOpen && !active.value) active.value = true;
        else if (!nativeOpen && active.value) active.value = false;

        options.onToggle?.(event);
    }

    // add toggle event listener on content element
    useEventListener(contentRef, "toggle", onNativeToggle);
    if (typeof options.onBeforeToggle === "function")
        useEventListener(contentRef, "beforetoggle", options.onBeforeToggle);

    // apply position
    watchEffect(
        () => {
            contentEl = unrefElement(contentRef);
            if (!contentEl) return;

            const _position = toValue(position);

            // add content position styles
            contentEl.style.positionArea =
                _position === "centered"
                    ? "none"
                    : Array.isArray(_position)
                      ? _position.join(" ")
                      : _position;

            contentEl.style.positionTryFallbacks =
                "flip-block, flip-inline, flip-block flip-inline";

            // add position data attribute
            contentEl.dataset.position = _position.toString();
        },
        { flush: "sync" },
    );

    onMounted(() => {
        contentEl = unrefElement(contentRef);
        if (!contentEl) {
            console.warn(
                "Content element is missing for the popover api initialisation.",
            );
            return;
        }

        targetEl = unrefElement(targetRef);
        if (!targetEl) {
            console.warn(
                "Trigger element is missing for the popover api initialisation.",
            );
            return;
        }

        if (targetEl.firstElementChild instanceof HTMLButtonElement)
            targetEl = targetEl.firstElementChild;

        if (import.meta.env?.VITEST === "true") {
            // polyfill for test environment - this is normally set in the browser
            contentEl.style.display = "none";
        }

        // place popover attribute on content
        contentEl.popover = behavior;

        if (targetTrigger && behavior !== "manual") {
            // get content id
            const contentId = contentEl.getAttribute("id");

            // check if the trigger has native popover target support
            if (
                targetEl instanceof HTMLButtonElement ||
                (targetEl instanceof HTMLInputElement &&
                    targetEl.type === "button")
            ) {
                // add related popover properties
                if (contentId)
                    targetEl.setAttribute("popovertarget", contentId);
            } else if (!(targetEl instanceof HTMLInputElement)) {
                // add interactive properties
                if (!targetEl.role) targetEl.role = "button";
                targetEl.tabIndex = 0;

                // set a11y attributes
                if (contentId)
                    targetEl.setAttribute("aria-controls", contentId);
            }
        }

        // open on mount
        if (typeof trigger === "undefined" || toValue(trigger)) open();
    });

    return {
        open,
        close,
        toggle,
    };
}

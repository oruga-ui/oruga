import {
    onMounted,
    onUnmounted,
    ref,
    type Ref,
    type MaybeRefOrGetter,
} from "vue";
import { unrefElement, type MaybeElement } from "@/composables";

type BasePosition = "top" | "bottom" | "left" | "right" | "center";
export type PopupPosition = BasePosition | [BasePosition, BasePosition];

/**
 * TODO: remove @ts-expect-error
 * @param options
 * @returns Popover API handler
 */
export function usePopoverAPI(options: {
    position: PopupPosition;
    /** see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/popover#value */
    behavior: "auto" | "hint" | "manuell";
    delay?: number;
    triggerRef: MaybeRefOrGetter<MaybeElement>;
    contentRef: MaybeRefOrGetter<MaybeElement>;
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
            // @ts-expect-error Popover API is not yet fully included in TypeScript
            content.showPopover({ source: trigger });
            timeout = undefined;
            active.value = true;
        }, delay);
    }

    function close(): void {
        if (timeout) clearTimeout(timeout);
        const content = unrefElement(contentRef);
        if (!content || !active.value) return;
        content.hidePopover();
        active.value = false;
    }

    function toggle(): void {
        const content = unrefElement(contentRef);
        if (!content) return;
        content.togglePopover();
        active.value = !active.value;
    }

    onMounted(() => {
        const content = unrefElement(contentRef);
        const trigger = unrefElement(triggerRef);
        if (!content || !trigger) {
            console.warn(
                "No content or trigger defined for the popover api initialisation.",
            );
            return;
        }

        // check content has id
        if (!Object.hasOwn(content, "id") && !content.getAttribute("id")) {
            console.warn("The content element does not have an id.");
            return;
        }

        const id = content.getAttribute("id")!;

        // check content has popover attribute
        if (!Object.hasOwn(content, "popover")) {
            console.warn(
                "The content element does not support the Popover API.",
            );
            return;
        }
        content.popover = behavior;

        // check if the trigger has native popover target support
        if (
            trigger instanceof HTMLButtonElement ||
            (trigger instanceof HTMLInputElement && trigger.type === "button")
        ) {
            // add related poper properties
            trigger.setAttribute("popovertarget", id);
        }

        // set a11y attributes
        trigger.setAttribute("aria-details", id);

        // add content position styles
        // @ts-expect-error Popover API is not yet fully included in TypeScript
        content.style.positionArea = position;
        // @ts-expect-error Popover API is not yet fully included in TypeScript
        content.style.positionTryFallbacks =
            "flip-block, flip-inline, flip-block flip-inline";

        // add event handler
        if (options.onToggle)
            content.addEventListener("toggle", options.onToggle);
        if (options.onBeforeToggle)
            content.addEventListener("toggle", options.onBeforeToggle);
    });

    onUnmounted(() => {
        const content = unrefElement(contentRef);
        if (!content) return;

        // remove event handler
        if (options.onToggle)
            content.removeEventListener("toggle", options.onToggle);
        if (options.onBeforeToggle)
            content.removeEventListener("toggle", options.onBeforeToggle);
    });

    return {
        active,
        open,
        close,
        toggle,
    };
}

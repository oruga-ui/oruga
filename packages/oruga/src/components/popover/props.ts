import type { PopoverPosition } from "@/composables";
import type { ComponentClass } from "@/types";

export type { PopoverPosition };

export type PopoverProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether popover is active or not, use v-model:active to make it two-way binding */
    active?: boolean;
    /** A unique HTML id for the popover element */
    id?: string;
    /** Content text, unnecessary when content slot is used */
    content?: string;
    /**
     * The behavior of the popover.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/popover#value
     * @values auto, hint, manual
     */
    behavior?: "auto" | "hint" | "manual";
    /**
     * The position of the popover relative to the trigger
     * @values top, bottom, left, right, center
     */
    position?: "top" | "bottom" | "left" | "right" | "center";
    /** Defines a delay (in ms) before the content appears */
    delay?: number;
    /** The component will be disabled */
    disabled?: boolean;
    /** Adds a backdrop to the background */
    backdrop?: boolean;
    /** Defines if the popover should be shown as centered modal - the position is ignored when `true` */
    modal?: boolean;
    /** Show and dismiss animation */
    animation?: string;
    /**
     * Set `true` to remove the body scrollbar.
     * When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,
     * but will set the body to a fixed position, which may break some layouts.
     */
    clipScroll?: boolean;
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport?: boolean | string | object;
} & PopoverClasses;

// class props (will not be displayed in the docs)
export type PopoverClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when teleported */
    teleportClass: ComponentClass;
    /** Class of the trigger element */
    triggerClass: ComponentClass;
    /** Class of the content element */
    contentClass: ComponentClass;
    /** Class of the content element when the element should be shown as centered modal */
    modalClass: ComponentClass;
    /** Class of the content elemetn when a backdrop should be shown */
    backdropClass: ComponentClass;
    /** Class of the body when popover has backdrop and scroll is clipped */
    scrollClipClass: ComponentClass;
    /** Class of the body when popover has backdrop and scroll is keeped */
    scrollKeepClass: ComponentClass;
}>;

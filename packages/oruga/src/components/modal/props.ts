import type { Component } from "vue";
import type { ComponentClass } from "@/types";
import type { ComponentEmit, ComponentProps } from "vue-component-type-helpers";

export type ModalProps<C extends Component> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether modal is active or not, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Display modal as full screen */
    fullScreen?: boolean;
    /** Text content, unnecessary when default slot is used */
    content?: string;
    /** Width of the Modal */
    width?: string | number;
    /** Custom animation (transition name) */
    animation?: string;
    /** Show an overlay  */
    overlay?: boolean;
    /**
     * Is Modal cancleable by clicking 'X', pressing escape or clicking outside
     * @values escape, x, outside, button, true, false
     */
    cancelable?: string[] | boolean;
    /**
     * Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
     * but will set body to position fixed, might break some layouts.
     * @values keep, clip
     */
    scroll?: "keep" | "clip";
    /** Trap focus inside the modal */
    trapFocus?: boolean;
    /**
     * Role attribute to be passed to the div wrapper for better accessibility.
     * @values dialog, alertdialog
     */
    ariaRole?: "dialog" | "alertdialog";
    /** Accessibility aria-label to be passed to the div wrapper element */
    ariaLabel?: string;
    /** Automatically focus modal when active */
    autoFocus?: boolean;
    /** Close icon name */
    closeIcon?: string;
    /**
     * Size of close icon
     * @values small, medium, large
     */
    closeIconSize?: string;
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint?: string;
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport?: boolean | string | object;
    /**
     * Component to be injected, used to open a component modal programmatically.
     * Close modal within the component by emitting a 'close' event — emits('close')
     */
    component?: C;
    /** Props to be binded to the injected component */
    props?: ComponentProps<C>;
    /** Events to be binded to the injected component */
    events?: ComponentEmit<C>;
} & ModalClasses;

// class props (will not be displayed in the docs)
type ModalClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of modal component when its active */
    activeClass: ComponentClass;
    /** Class of the modal overlay */
    overlayClass: ComponentClass;
    /** Class of the modal content */
    contentClass: ComponentClass;
    /** Class of the close button */
    closeClass: ComponentClass;
    /** Class of the modal when fullscreen */
    fullScreenClass: ComponentClass;
    /** Class of modal component when on mobile */
    mobileClass: ComponentClass;
    /** Class of the body when modal is open and scroll is clip */
    scrollClipClass: ComponentClass;
    /** Class of the body when modal is open and scroll is not clip */
    noScrollClass: ComponentClass;
}>;

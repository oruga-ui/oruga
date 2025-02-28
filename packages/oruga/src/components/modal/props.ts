import type { Component } from "vue";
import type { ComponentClass, ComponentEmits } from "@/types";
import type { ComponentProps } from "vue-component-type-helpers";

export type ModalProps<C extends Component = Component> = {
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
     * Set `true` to remove the body scrollbar.
     * When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,
     * but will set the body to a fixed position, which may break some layouts.
     */
    clipScroll?: boolean;
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
     * Component to be injected.
     * Close the component by emitting a 'close' event — `$emit('close')`
     */
    component?: C;
    /** Props to be binded to the injected component */
    props?: ComponentProps<C>;
    /** Events to be binded to the injected component */
    events?: ComponentEmits<C>;
} & ModalClasses;

// class props (will not be displayed in the docs)
export type ModalClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when on mobile */
    mobileClass: ComponentClass;
    /** Class of the root element when active */
    activeClass: ComponentClass;
    /** Class of the overlay element */
    overlayClass: ComponentClass;
    /** Class of the content element */
    contentClass: ComponentClass;
    /** Class of the content element when fullscreen */
    fullScreenClass: ComponentClass;
    /** Class of the close button element */
    closeClass: ComponentClass;
    /** Class of the body when modal is open and scroll is clipped */
    scrollClipClass: ComponentClass;
    /** Class of the body when modal is open and scroll is keeped */
    scrollKeepClass: ComponentClass;
}>;

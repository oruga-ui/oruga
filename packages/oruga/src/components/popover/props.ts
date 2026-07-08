import type { Component } from "vue";
import type { MaybeElement, PopoverPosition } from "@/composables";
import type { ComponentClass, ComponentEmits } from "@/types";
import type { ComponentProps } from "vue-component-type-helpers";

export type { PopoverPosition };

export type PopoverProps<C extends Component = Component> = {
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
     * @values top, bottom, left, right, center, [top, right], [top, left], [bottom, left], [bottom, right]
     */
    position?: PopoverPosition;
    /** Defines a delay (in ms) before the content appears */
    delay?: number;
    /** The component will be disabled */
    disabled?: boolean;
    /** Adds a backdrop to the background */
    backdrop?: boolean;
    /** A role for the content element. */
    role?: "dialog" | "menu" | "tooltip";
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
    /** Define a trigger element as default slot alternative. */
    trigger?: MaybeElement;
    /**
     * DOM container element for programmatic usage.
     * @ignore internal property
     */
    container?: HTMLElement;
    /**
     * Component to be injected.
     * Close the component by emitting a 'close' event — `$emit('close')`
     */
    component?: C;
    /** Props to be binded to the injected component */
    props?: ComponentProps<C>;
    /** Events to be binded to the injected component */
    events?: ComponentEmits<C>;
} & PopoverClasses;

// class props (will not be displayed in the docs)
export type PopoverClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when disabled */
    disabledClass: ComponentClass;
    /** Class of the root element when shown as modal */
    modalClass: ComponentClass;
    /** Class for the root element when active  */
    activeClass: ComponentClass;
    /** Class of the root element when teleported */
    teleportClass: ComponentClass;
    /** Class of the trigger element */
    triggerClass: ComponentClass;
    /** Class of the content element */
    contentClass: ComponentClass;
    /** Class of the content element when active */
    contentActiveClass: ComponentClass;
    /** Class of the content element when should has a backdrop */
    contentBackdropClass: ComponentClass;
    /** Class of the content element when a backdrop should be shown */
    backdropClass: ComponentClass;
    /** Class of the body when popover has backdrop and scroll is clipped */
    scrollClipClass: ComponentClass;
    /** Class of the body when popover has backdrop and scroll is keeped */
    scrollKeepClass: ComponentClass;
}>;

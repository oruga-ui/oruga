import type { Component } from "vue";
import type { ComponentClass, ComponentEmits } from "@/types";
import type { ComponentProps } from "vue-component-type-helpers";

export type SidebarProps<C extends Component> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether siedbar is active or not, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Show an overlay like modal */
    overlay?: boolean;
    /** Display the Sidebear inline */
    inline?: boolean;
    /**
     * Sidebar position
     * @values top, right, bottom, left
     */
    position?: "top" | "right" | "bottom" | "left";
    /** Show sidebar in fullheight */
    fullheight?: boolean;
    /** Show sidebar in fullwidth */
    fullwidth?: boolean;
    /** Show a small sidebar */
    reduce?: boolean;
    /**
     * Custom layout on mobile
     * @values expanded, reduced, hidden
     */
    mobile?: "expanded" | "reduced" | "hidden";
    /** Expand sidebar on hover when reduced or mobile is reduce */
    expandOnHover?: boolean;
    /** Custom animation (transition name) */
    animation?: string;
    /**
     * Is Sidebar cancleable by pressing escape or clicking outside.
     * @values escape, outside, true, false
     */
    cancelable?: string[] | boolean;
    /**
     * Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
     * but will set body to position fixed, might break some layouts.
     * @values keep, clip
     */
    scroll?: "clip" | "keep";
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
} & SidebarClasses;

// class props (will not be displayed in the docs)
export type SidebarClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when on mobile */
    mobileClass: ComponentClass;
    /** Class of the root element when its active */
    activeClass: ComponentClass;
    /** Class of the root element when teleported */
    teleportClass: ComponentClass;
    /** Class of the root element when inlined */
    inlineClass: ComponentClass;
    /** Class of the overlay element */
    overlayClass: ComponentClass;
    /** Class of the content element */
    contentClass: ComponentClass;
    /** Class of the content element when hidden */
    hiddenClass: ComponentClass;
    /** Class of the content element when visible */
    visibleClass: ComponentClass;
    /** Class of the content element with position */
    positionClass: ComponentClass;
    /** Class of the content element when is fullheight */
    fullheightClass: ComponentClass;
    /** Class of the content element when is fullwidth */
    fullwidthClass: ComponentClass;
    /** Class of the content element when reduced */
    reduceClass: ComponentClass;
    /** Class of the content element when expanded on hover */
    expandOnHoverClass: ComponentClass;
    /** Class of the body when is visible and scroll is clip */
    scrollClipClass: ComponentClass;
    /** Class of the body when is visible and scroll is not clip */
    noScrollClass: ComponentClass;
}>;

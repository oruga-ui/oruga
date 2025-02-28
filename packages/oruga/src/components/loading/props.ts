import type { ComponentClass } from "@/types";

export type LoadingProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether loading is active or not, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Loader will overlay the full page. */
    fullPage?: boolean;
    /** Notification label, unnecessary when default slot is used. */
    label?: string;
    /** Custom animation (transition name) */
    animation?: string;
    /** Is Loading cancable by pressing escape or clicking outside. */
    cancelable?: boolean;
    /** Icon name to show, unnecessary when default slot is used. */
    icon?: string;
    /** Enable spin effect on icon */
    iconSpin?: boolean;
    /**
     * Icon size
     * @values small, medium, large
     */
    iconSize?: string;
    /**
     * Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
     * but will set body to position fixed, might break some layouts.
     * @values keep, clip
     */
    scroll?: "keep" | "clip";
    /** Role attribute to be passed to the div wrapper for better accessibility */
    role?: string;
    /**
     * DOM container element for programmatic usage.
     * @ignore internal property
     */
    container: HTMLElement;
} & LoadingClasses;

// class props (will not be displayed in the docs)
export type LoadingClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class for the root element when fullpage */
    fullPageClass: ComponentClass;
    /** Class of the overlay element*/
    overlayClass: ComponentClass;
    /** Class for the icon element*/
    iconClass: ComponentClass;
    /** Class for the label element*/
    labelClass: ComponentClass;
    /** Class of the body when fullpage and scroll is clip */
    scrollClipClass: ComponentClass;
    /** Class of the body when fullpage and scroll is not clip */
    noScrollClass: ComponentClass;
}>;

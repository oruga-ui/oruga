import type { ComponentClass } from "@/types";

export type LoadingProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether loading is active or not, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Loader will overlay the full page */
    fullPage?: boolean;
    /** Show a label beside the icon, unnecessary when default slot is used */
    label?: string;
    /** Custom animation (transition name) */
    animation?: string;
    /** Close when clicked outside of the panel */
    closeOnOutside?: boolean;
    /** Close when pressing escape key */
    closeOnEscape?: boolean;
    /** Icon name to show, unnecessary when default slot is used */
    icon?: string;
    /**
     * Icon pack to use for the close icon
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Enable spin effect on icon */
    iconSpin?: boolean;
    /**
     * Icon size
     * @values small, medium, large
     */
    iconSize?: string;
    /**
     * Strategy used to prevent background scrolling when fullpage is active.
     * `clip` removes the body scrollbar via `overflow: hidden`.
     * `keep` maintains a phantom scrollbar via `position: fixed` to prevent layout shift.
     * @values clip, keep
     */
    scrollStrategy?: "clip" | "keep";
    /**
     * DOM container element for programmatic usage
     * @ignore internal property
     */
    container?: HTMLElement;
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
}>;

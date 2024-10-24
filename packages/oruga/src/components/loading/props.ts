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
} & LoadingClasses;

// class props (will not be displayed in the docs)
type LoadingClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class for the root element when fullpage */
    fullPageClass: ComponentClass;
    /** Class of the loading overlay */
    overlayClass: ComponentClass;
    /** Class for the loading icon */
    iconClass: ComponentClass;
    /** Class for the loading label */
    labelClass: ComponentClass;
}>;

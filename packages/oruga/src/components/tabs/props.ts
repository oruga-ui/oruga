import type { ComponentClass } from "@/types";
import type { OptionsProp } from "@/composables";

export type TabsProps<T extends string | number | object> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * The selected item value
     * @type string|number|object
     */
    modelValue?: T;
    /** Tabs options, unnecessary when default slot is used */
    options?: OptionsProp<T>;
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Tab size
     * @values small, medium, large
     */
    size?: string;
    /** Show tab in vertical layout */
    vertical?: boolean;
    /**
     * Position of the tabs
     * @values left, centered, right
     */
    position?: "left" | "centered" | "right";
    /**
     * Tab type
     * @values default, boxed, toggle, pills
     */
    type?: string;
    /** Tabs will be expanded (full-width) */
    expanded?: boolean;
    /** Destroy tabItem on hide */
    destroyOnHide?: boolean;
    /** Tab will have an animation */
    animated?: boolean;
    /**
     * Transition animation name
     * @values [next, prev], [right, left, down, up]
     */
    animation?: [string, string] | [string, string, string, string];
    /** Apply animation on the initial render */
    animateInitially?: boolean;
    /** Show tab items multiline when there is no space */
    multiline?: boolean;
} & TabsClasses;

// class props (will not be displayed in the docs)
type TabsClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of Tabs component when when is vertical and its position changes */
    positionClass: ComponentClass;
    /** Class of Tabs component when expanded */
    expandedClass: ComponentClass;
    /** Class of Tabs component when vertical */
    verticalClass: ComponentClass;
    /** Class of Tabs component when multiline */
    multilineClass: ComponentClass;
    /** Class of the Tabs component nav tabs */
    navClass: ComponentClass;
    /** Size of the navigation */
    navSizeClass: ComponentClass;
    /** Class of the Tabs component nav position */
    navPositionClass: ComponentClass;
    /** Type of the navigation */
    navTypeClass: ComponentClass;
    /** Class of the tab item */
    navItemClass: ComponentClass;
    /** Class of the tab content */
    contentClass: ComponentClass;
    /** Class of the tab content when transitioning */
    transitioningClass: ComponentClass;
}>;

import type { ComponentClass } from "@/types";
import type { OptionsProp } from "@/composables";

export type StepsProps<T extends string | number | object> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * The selected item value
     * @type string|number|object
     */
    modelValue?: T;
    /** Steps options, unnecessary when default slot is used */
    options?: OptionsProp<T>;
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Step size
     * @values small, medium, large
     */
    size?: string;
    /** Show step in vertical layout */
    vertical?: boolean;
    /**
     * Position of the step
     * @values left, centered, right
     */
    position?: "left" | "centered" | "right";
    /**
     * Icon pack to use for the navigation
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Icon to use for navigation button */
    iconPrev?: string;
    /** Icon to use for navigation button */
    iconNext?: string;
    /**
     * Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items.
     */
    hasNavigation?: boolean;
    /** Destroy stepItem on hide */
    destroyOnHide?: boolean;
    /** Step navigation is animated */
    animated?: boolean;
    /**
     * Transition animation name
     * @values [next, prev], [right, left, down, up]
     */
    animation?: [string, string] | [string, string, string, string];
    /** Apply animation on the initial render */
    animateInitially?: boolean;
    /**
     * Position of the marker label
     * @values bottom, right, left
     */
    labelPosition?: "bottom" | "right" | "left";
    /** Rounded step markers */
    rounded?: boolean;
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint?: string;
    /** Accessibility next button aria label */
    ariaNextLabel?: string;
    /** Accessibility previous button aria label  */
    ariaPreviousLabel?: string;
} & StepsClasses;

// class props (will not be displayed in the docs)
type StepsClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Size of the steps */
    sizeClass: ComponentClass;
    /** Class of the steps variant */
    variantClass: ComponentClass;
    /** Class of the tooltip trigger */
    verticalClass: ComponentClass;
    /** Class of the Steps component when is vertical and its position changes */
    positionClass: ComponentClass;
    /** Class of the steps container */
    stepsClass: ComponentClass;
    /** Class of Steps component when animation gets triggered */
    animatedClass: ComponentClass;
    /** Class of the Steps markers trigger when are rounded */
    stepMarkerRoundedClass: ComponentClass;
    /** Class of the Steps component dividers */
    stepDividerClass: ComponentClass;
    /** Class of the Steps component marker */
    stepMarkerClass: ComponentClass;
    /** Class of the Steps component content */
    stepContentClass: ComponentClass;
    /** Class of the Steps component content when transition is happening */
    stepContentTransitioningClass: ComponentClass;
    /** Class of the Steps component navigation element */
    stepNavigationClass: ComponentClass;
    /** Class of the Steps component link */
    stepLinkClass: ComponentClass;
    /** Class of the Steps component link when clickable */
    stepLinkClickableClass: ComponentClass;
    /** Class of the Step component link label */
    stepLinkLabelClass: ComponentClass;
    /** Class of the Step component link label when positioned */
    stepLinkLabelPositionClass: ComponentClass;
    /** Class of steps component when on mobile */
    mobileClass: ComponentClass;
}>;

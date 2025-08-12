import type { Component } from "vue";
import type {
    ComponentClass,
    ComponentEmits,
    Numberish,
    OptionsProp,
} from "@/types";
import type { ComponentProps } from "vue-component-type-helpers";

export type StepsProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * The selected item value, use v-model to make it two-way binding
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
    /** Set the step active on navigation focus */
    activateOnFocus?: boolean;
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
    /** Accessibility aria-label to be passed to the tablist wrapper element */
    ariaLabel?: string;
    /** Accessibility next button aria label */
    ariaNextLabel?: string;
    /** Accessibility previous button aria label  */
    ariaPreviousLabel?: string;
} & StepsClasses;

// class props (will not be displayed in the docs)
export type StepsClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when on mobile */
    mobileClass: ComponentClass;
    /** Size of the root element with size */
    sizeClass: ComponentClass;
    /** Class of the root element with variant */
    variantClass: ComponentClass;
    /** Class of the root element when is vertical */
    verticalClass: ComponentClass;
    /** Class of the root element when is vertical and has position */
    positionClass: ComponentClass;
    /** Class of the list container element */
    listClass: ComponentClass;
    /** Class of the list container when animated */
    animatedClass: ComponentClass;
    /** Class of the item divider element */
    dividerClass: ComponentClass;
    /** Class of the item marker element */
    markerClass: ComponentClass;
    /** Class of the item marker element when rounded */
    markerRoundedClass: ComponentClass;
    /** Class of the panel container element */
    contentClass: ComponentClass;
    /** Class of the panel container element when transitioning */
    transitioningClass: ComponentClass;
    /** Class of the navigation element */
    navigationClass: ComponentClass;
}>;

export type StepItemProps<T, C extends Component = Component> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * Item value (it will be used as v-model of wrapper component) - default is an uuid
     * @type string|number|object
     */
    value?: T;
    /** Item label */
    label?: string;
    /** Step marker content (when there is no icon) */
    step?: Numberish;
    /**
     * Default style for the step.
     * This will override parent type.
     * Could be used to set a completed step to "success" for example
     */
    variant?: string;
    /** Item will be disabled */
    disabled?: boolean;
    /**
     * Item can be used directly to navigate.
     * If undefined, previous steps are clickable while the others are not
     */
    clickable?: boolean;
    /** Show/hide item */
    visible?: boolean;
    /** Icon on the left */
    icon?: string;
    /** Icon pack */
    iconPack?: string;
    /** Text content, unnecessary when default slot is used */
    content?: string;
    /** Component to be injected. */
    component?: C;
    /** Props to be binded to the injected component */
    props?: ComponentProps<C>;
    /** Events to be binded to the injected component */
    events?: ComponentEmits<C>;
} & StepItemClasses;

// class props (will not be displayed in the docs)
export type StepItemClasses = Partial<{
    /** Class of the step item element. */
    stepClass: ComponentClass;
    /** Class of the step item element when active */
    stepActiveClass: ComponentClass;
    /** Class of the step item element with variant (default value by parent steps component) */
    stepVariantClass: ComponentClass;
    /** Class of the step item element when positioned */
    stepPositionClass: ComponentClass;
    /** Class of the step item element when clickable */
    stepClickableClass: ComponentClass;
    /** Class of the step item element when disabled */
    stepDisabledClass: ComponentClass;
    /** Class of the step item element before the active one */
    stepPreviousClass: ComponentClass;
    /** Class of the step item element after the active one */
    stepNextClass: ComponentClass;
    /** Class of the step item label element */
    stepLabelClass: ComponentClass;
    /** Class of the step item icon element */
    stepIconClass: ComponentClass;
    /** Class of the step panel element */
    stepPanelClass: ComponentClass;
}>;

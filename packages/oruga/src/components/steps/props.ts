import type { Component } from "vue";
import type {
    ComponentClass,
    ComponentEmits,
    DynamicComponent,
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
    /** Class of steps component when on mobile */
    mobileClass: ComponentClass;
    /** Class of the steps nav container */
    navClass: ComponentClass;
    /** Class of Steps component when animation gets triggered */
    animatedClass: ComponentClass;
    /** Class of the Steps component dividers */
    dividerClass: ComponentClass;
    /** Class of the Steps markers trigger when are rounded */
    markerRoundedClass: ComponentClass;
    /** Class of the Steps component marker */
    markerClass: ComponentClass;
    /** Class of the Steps component content */
    contentClass: ComponentClass;
    /** Class of the Steps component content when transition is happening */
    transitioningClass: ComponentClass;
    /** Class of the Steps component navigation element */
    navigationClass: ComponentClass;
}>;

export type StepItemProps<T, C extends Component> = {
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
    step?: string | number;
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
    /** Step item tag name */
    tag?: DynamicComponent;
    /** Role attribute to be passed to the li wrapper for better accessibility */
    ariaRole?: string;
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
type StepItemClasses = Partial<{
    /** Class of the nav item */
    navItemClass: ComponentClass;
    /** Class of the nav item when active */
    navItemActiveClass: ComponentClass;
    /** Class of the nav item before the active one */
    navItemPreviousClass: ComponentClass;
    /** Class of the nav item after the active one */
    navItemNextClass: ComponentClass;
    /** Class of the nav item with variant (default value by parent steps component) */
    navItemVariantClass: ComponentClass;
    /** Class of the step item */
    stepClass: ComponentClass;
    /** Class of the tab item when active */
    stepActiveClass: ComponentClass;
    /** Class of the step item when clickable */
    stepClickableClass: ComponentClass;
    /** Class of the step item when disabled */
    stepDisabledClass: ComponentClass;
    /** Class of the step item label when positioned */
    stepLabelPositionClass: ComponentClass;
    /** Class of the step item label */
    stepLabelClass: ComponentClass;
    /** Class of the step item icon */
    stepIconClass: ComponentClass;
    /** Class of the content item */
    stepPanelClass: ComponentClass;
}>;

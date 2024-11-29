import type { Component } from "vue";
import type {
    ComponentClass,
    ComponentEmits,
    DynamicComponent,
    OptionsProp,
} from "@/types";
import type { ComponentProps } from "vue-component-type-helpers";

export type TabsProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * The selected item value, use v-model to make it two-way binding
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
    /** Class of the tab content */
    contentClass: ComponentClass;
    /** Class of the tab content when transitioning */
    transitioningClass: ComponentClass;
}>;

export type TabItemProps<T, C extends Component> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * Item value (it will be used as v-model of wrapper component) - default is an uuid
     * @type string|number|object
     */
    value?: T;
    /** Item label */
    label?: string;
    /** Item will be disabled */
    disabled?: boolean;
    /** Show/hide item */
    visible?: boolean;
    /** Icon on the left */
    icon?: string;
    /** Icon pack */
    iconPack?: string;
    /** Tabs item tag name */
    tag?: DynamicComponent;
    /** Text content, unnecessary when default slot is used */
    content?: string;
    /** Component to be injected. */
    component?: C;
    /** Props to be binded to the injected component */
    props?: ComponentProps<C>;
    /** Events to be binded to the injected component */
    events?: ComponentEmits<C>;
} & TabItemClasses;

// class props (will not be displayed in the docs)
type TabItemClasses = Partial<{
    /** Class of the tab item */
    navItemClass: ComponentClass;
    /** Class of the nav item when active */
    navItemActiveClass: ComponentClass;
    /** Class of the nav item before the active one */
    navItemPreviousClass: ComponentClass;
    /** Class of the nav item after the active one */
    navItemNextClass: ComponentClass;
    /** Class of the tab item */
    tabClass: ComponentClass;
    /** Class of the tab item when active */
    tabActiveClass: ComponentClass;
    /** Class of the tab item when disabled */
    tabDisabledClass: ComponentClass;
    /** Class of the tab item type */
    tabTypeClass: ComponentClass;
    /** Class of the tab item icon */
    tabIconClass: ComponentClass;
    /** Class of the tab item label */
    tabLabelClass: ComponentClass;
    /** Class of the tab item */
    tabPanelClass: ComponentClass;
}>;

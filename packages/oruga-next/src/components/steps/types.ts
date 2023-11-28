import type { ProviderItem } from "@/composables";
import StepItem from "./StepItem.vue";
import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

export type StepItemProps = InstanceType<typeof StepItem>["$props"];

export type StepItemSlots = InstanceType<typeof StepItem>["$slots"];

export type StepItemComponent = StepItemProps & {
    $slots: StepItemSlots;
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type StepsComponent = {
    activeId: string | number;
    vertical: boolean;
};

export type StepItem = Omit<ProviderItem, "data"> & StepItemComponent;

declare module "@/types" {
    interface OrugaOptions {
        steps?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Size of the steps */
                sizeClass: ClassDefinition;
                /** Class of the tooltip trigger */
                verticalClass: ClassDefinition;
                /** Class of the Steps component when is vertical and its position changes */
                positionClass: ClassDefinition;
                /** Class of the steps container */
                stepsClass: ClassDefinition;
                /** Class of Steps component when animation gets triggered */
                animatedClass: ClassDefinition;
                /** Class of the Steps markers trigger when are rounded */
                stepMarkerRoundedClass: ClassDefinition;
                /** Class of the Steps component dividers */
                stepDividerClass: ClassDefinition;
                /** Class of the Steps component marker */
                stepMarkerClass: ClassDefinition;
                /** Class of the Steps component content */
                stepContentClass: ClassDefinition;
                /** Class of the Steps component content when transition is happening */
                stepContentTransitioningClass: ClassDefinition;
                /** Class of the Steps component navigation element */
                stepNavigationClass: ClassDefinition;
                /** Class of the Steps component link */
                stepLinkClass: ClassDefinition;
                /** Class of the Steps component link when clickable */
                stepLinkClickableClass: ClassDefinition;
                /** Class of the Step component link label */
                stepLinkLabelClass: ClassDefinition;
                /** Class of the Step component link label when positioned */
                stepLinkLabelPositionClass: ClassDefinition;
                /** Class of steps component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the content item */
                itemClass: ClassDefinition;
                /** Class of the nav item */
                itemHeaderClass: ClassDefinition;
                /** Class of the nav item when active */
                itemHeaderActiveClass: ClassDefinition;
                /** Class of the nav item behind the active one */
                itemHeaderPreviousClass: ClassDefinition;
                /** Class of the nav item with variant (default value by parent steps component) */
                itemHeaderVariantClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Color of the control */
                variant: string;
                /** Tab size  */
                size: string;
                /** Icon pack to use for the navigation */
                iconPack: string;
                /** Icon to use for navigation button */
                iconPrev: string;
                /** Icon to use for navigation button */
                iconNext: string;
                /** Step navigation is animated */
                animated: string;
                /** Position of the marker label */
                labelPosition: string;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Accessibility next button aria label */
                ariaNextLabel: string;
                /** Accessibility previous button aria label  */
                ariaPreviousLabel: string;
                /** Role attribute to be passed to the div wrapper for better accessibility. */
                ariaRole: string;
                /** Tabs item tag name */
                tag: DynamicComponent;
                /** Icon on the left */
                icon: string;
            }>;
    }
}

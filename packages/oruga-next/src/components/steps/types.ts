import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        steps?: ComponentConfigBase &
            Partial<{
                /** Icon pack */
                iconPack: string;
                /** Icon on the left */
                icon: string;
                /** Class of the content item */
                itemClass: ClassDefinition;
                /** Class of the nav item */
                itemHeaderClass: ClassDefinition;
                /** Step item tag name */
                itemTag: DynamicComponent;
                /** Role attribute to be passed to the div wrapper for better accessibility */
                ariaRole: string;
                /** Sets a class to the item header */
                headerClass: string;
                /** Class of the nav item when active */
                itemHeaderActiveClass: ClassDefinition;
                /** Class of the nav item behind the active one */
                itemHeaderPreviousClass: ClassDefinition;
                /** Class of the nav item with variant (default value by parent steps component) */
                itemHeaderVariantClass: ClassDefinition;
                /** Tab size */
                size: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Size of the steps */
                sizeClass: ClassDefinition;
                /** Icon to use for navigation button */
                iconPrev: string;
                /** Icon to use for navigation button */
                iconNext: string;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Accessibility next button aria label */
                ariaNextLabel: string;
                /** Accessibility previous button aria label */
                ariaPreviousLabel: string;
                /** Class of steps component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the Steps component when is vertical and its position changes */
                positionClass: ClassDefinition;
                /** Step navigation is animated */
                animated: boolean;
                /** Position of the marker label */
                labelPosition: string;
                /** Class of the tooltip trigger */
                verticalClass: ClassDefinition;
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
            }>;
    }
}

import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        pagination?: ComponentConfigBase &
            Partial<{
                /** Pagination size */
                size: string;
                /** Rounded button style */
                rounded: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the pagination when rounded */
                roundedClass: ClassDefinition;
                /** Class for the pagination size */
                sizeClass: ClassDefinition;
                /** Icon to use for previous button */
                iconPrev: string;
                /** Icon to use for next button */
                iconNext: string;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Accessibility label for the next page button. */
                ariaNextLabel: string;
                /** Accessibility label for the previous page button. */
                ariaPreviousLabel: string;
                /** Class of the prev button */
                prevButtonClass: ClassDefinition;
                /** Class of the next button */
                nextButtonClass: ClassDefinition;
                /** Class of pagination component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the pagination list */
                listClass: ClassDefinition;
                /** Items count for each page */
                perPage: string | number;
                /** Simple style */
                simple: boolean;
                /** Buttons order */
                order: string;
                /** Accessibility label for the page button. */
                ariaPageLabel: string;
                /** Accessibility label for the current page button. */
                ariaCurrentLabel: string;
                /** Class of the pagination list items */
                listItemClass: ClassDefinition;
                /** Class of the link button */
                linkClass: ClassDefinition;
                /** Class of the current link */
                linkCurrentClass: ClassDefinition;
                /** Class of the pagination ellipsis */
                ellipsisClass: ClassDefinition;
                /** Class of the info in `simple` mode */
                infoClass: ClassDefinition;
                /** Class of the pagination order */
                orderClass: ClassDefinition;
                /** Class of the pagination in `simple` mode */
                simpleClass: ClassDefinition;
                /** Class of the disabled link */
                linkDisabledClass: ClassDefinition;
            }>;
    }
}

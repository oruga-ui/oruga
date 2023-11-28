import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "@/types" {
    interface OrugaOptions {
        pagination?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the prev button */
                prevButtonClass: ClassDefinition;
                /** Class of the next button */
                nextButtonClass: ClassDefinition;
                /** Class of the pagination list */
                listClass: ClassDefinition;
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
                /** Class of the pagination when rounded */
                roundedClass: ClassDefinition;
                /** Class of the disabled link */
                linkDisabledClass: ClassDefinition;
                /** Class for the pagination size */
                sizeClass: ClassDefinition;
                /** Class of pagination component when on mobile */
                mobileClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Items count for each page */
                perPage: number | string;
                /** Pagination size */
                size: string;
                /** Simple style */
                simple: boolean;
                /** Rounded button style */
                rounded: boolean;
                /** Buttons order */
                order: string;
                /** Icon pack to use */
                iconPack: string;
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
                /** Accessibility label for the page button. */
                ariaPageLabel: string;
                /** Accessibility label for the current page button. */
                ariaCurrentLabel: string;
            }>;
    }
}

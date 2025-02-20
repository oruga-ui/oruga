import type { ComponentClass, DynamicComponent } from "@/types";

export type PaginationProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Total count of items */
    total?: number;
    /** Items count for each page */
    perPage?: number | string;
    /** Current page number, use v-model:current to make it two-way binding */
    current?: number;
    /** Number of pagination items to show before current page. */
    rangeBefore?: number;
    /** Number of pagination items to show after current page. */
    rangeAfter?: number;
    /**
     * Pagination size
     * @values small, medium, large
     */
    size?: string;
    /** Enable simple style */
    simple?: boolean;
    /** Enable rounded button style */
    rounded?: boolean;
    /**
     * Buttons order
     * @values centered, right, left
     */
    order?: "centered" | "right" | "left";
    /** Pagination button tag name */
    buttonTag?: DynamicComponent;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Icon to use for previous button */
    iconPrev?: string;
    /** Icon to use for next button */
    iconNext?: string;
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint?: string;
    /** Accessibility label for the next page button. */
    ariaNextLabel?: string;
    /** Accessibility label for the previous page button. */
    ariaPreviousLabel?: string;
    /** Accessibility label for the page button. */
    ariaPageLabel?: string;
    /** Accessibility label for the current page button. */
    ariaCurrentLabel?: string;
} & PaginationClasses;

// class props (will not be displayed in the docs)
export type PaginationClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when on mobile */
    mobileClass: ComponentClass;
    /** Class of the root element with order */
    orderClass: ComponentClass;
    /** Class of the root element with size */
    sizeClass: ComponentClass;
    /** Class of the root element when in `simple` mode */
    simpleClass: ComponentClass;
    /** Class of the page info in `simple` mode */
    infoClass: ComponentClass;
    /** Class of the items list element */
    listClass: ComponentClass;
    /** Class of an list item element */
    listItemClass: ComponentClass;
    /** Class of the ellipsis element */
    ellipsisClass: ComponentClass;
    /** Class of the button element */
    buttonClass: ComponentClass;
    /** Class of the button element when rounded */
    roundedClass: ComponentClass;
    /** Class of the current button element */
    buttonCurrentClass: ComponentClass;
    /** Class of the prev button element */
    buttonPrevClass: ComponentClass;
    /** Class of the next button element */
    buttonNextClass: ComponentClass;
    /** Class of the prev or next button when disabled */
    buttonDisabledClass: ComponentClass;
}>;

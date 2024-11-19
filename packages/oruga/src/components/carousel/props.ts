import type { ComponentClass } from "@/types";

export type CarouselProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The index of the current active element */
    modelValue?: number;
    /** Enable drag mode */
    dragable?: boolean;
    /** Timer interval for `autoplay` */
    interval?: number;
    /** Move item automaticalls after `interval` */
    autoplay?: boolean;
    /** Pause autoplay on hover */
    pauseHover?: boolean;
    /** Repeat from the beginning after reaching the end */
    repeat?: boolean;
    /** Show an overlay */
    overlay?: boolean;
    /** Enable indicators */
    indicators?: boolean;
    /** Place indicators inside the carousel */
    indicatorInside?: boolean;
    /**
     * Indicator interaction mode
     * @values click, hover
     */
    indicatorMode?: "click" | "hover";
    /** Position of the indicator - depends on used theme */
    indicatorPosition?: string;
    /** Style of the indicator - depends on used theme */
    indicatorStyle?: string;
    /** Number of items to show at once*/
    itemsToShow?: number;
    /** Number of items to switch at once */
    itemsToList?: number;
    /** Show next / prev arrows */
    arrows?: boolean;
    /** Show next / prev arrows only on hover */
    arrowsHover?: boolean;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /**
     * Icon size
     * @values small, medium, large
     */
    iconSize?: string;
    /** Icon name for previous icon */
    iconPrev?: string;
    /** Icon name for next icon */
    iconNext?: string;
    /** Define these props for different screen sizes */
    breakpoints?: Record<number, any>;
} & CarouselClasses;

// class props (will not be displayed in the docs)
type CarouselClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element in overlay */
    overlayClass: ComponentClass;
    /** Class of the wrapper element of carousel items */
    wrapperClass: ComponentClass;
    /** Class of slider items */
    itemsClass: ComponentClass;
    /** Class of slider items on drag */
    itemsDraggingClass: ComponentClass;
    /** Class of arrow elements */
    arrowIconClass: ComponentClass;
    /** Class of prev arrow element */
    arrowIconPrevClass: ComponentClass;
    /** Class of next arrow element */
    arrowIconNextClass: ComponentClass;
    /** Class of indicator link element */
    indicatorClass: ComponentClass;
    /** Class of indicators wrapper element */
    indicatorsClass: ComponentClass;
    /** Class of indicators wrapper element when inside */
    indicatorsInsideClass: ComponentClass;
    /** Class of indicators wrapper element when inside and position */
    indicatorsInsidePositionClass: ComponentClass;
    /** Class of indicator item element */
    indicatorItemClass: ComponentClass;
    /** Class of indicator element when is active */
    indicatorItemActiveClass: ComponentClass;
    /** Class of indicator element to separate different styles */
    indicatorItemStyleClass: ComponentClass;
}>;

export type CarouselItemProps = {
    override?: boolean;
    /** Make item clickable */
    clickable?: boolean;
    /** Role attribute to be passed to the div wrapper for better accessibility */
    ariaRole?: string;
} & CarouselItemClasses;

// class props (will not be displayed in the docs)
type CarouselItemClasses = Partial<{
    /** Class of carousel item */
    itemClass: ComponentClass;
    /** Class of carousel item when is active */
    itemActiveClass: ComponentClass;
    /** Class of carousel item when is clickable */
    itemClickableClass: ComponentClass;
}>;

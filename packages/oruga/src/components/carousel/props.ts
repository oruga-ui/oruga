import type { Booleanish, ComponentClass } from "@/types";

export type CarouselProps = {
    /** Override existing theme classes completely */
    override?: Booleanish;
    /** The index of the current active element */
    modelValue?: number;
    /** Enable drag mode */
    dragable?: boolean;
    /** Move item automaticalls after `interval` */
    autoplay?: boolean;
    /** Timer interval for `autoplay` */
    interval?: number;
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
    /** Icon name for previous button */
    iconPrev?: string;
    /** Icon name for next button */
    iconNext?: string;
    /** Icon name for autoplay pause button */
    iconAutoplayPause?: string;
    /** Icon name for autoplay resume button */
    iconAutoplayResume?: string;
    /** Define these props for different screen sizes */
    breakpoints?: Record<number, any>;
    /** Accessibility autoplay pause button aria label */
    ariaAutoplayPauseLabel?: string;
    /** Accessibility autoplay resume button aria label  */
    ariaAutoplayResumeLabel?: string;
    /** Accessibility next button aria label */
    ariaNextLabel?: string;
    /** Accessibility previous button aria label  */
    ariaPreviousLabel?: string;
} & CarouselClasses;

// class props (will not be displayed in the docs)
export type CarouselClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element in overlay */
    overlayClass: ComponentClass;
    /** Class of the inner wrapper element */
    wrapperClass: ComponentClass;
    /** Class of items container element */
    itemsClass: ComponentClass;
    /* Class of items container element when dragging */
    itemsDraggingClass: ComponentClass;
    /** Class of icon button elements */
    iconClass: ComponentClass;
    /** Class of prev icon button element */
    iconPrevClass: ComponentClass;
    /** Class of next icon button element */
    iconNextClass: ComponentClass;
    /** Class of autoplay icon button element */
    iconAutoplayClass: ComponentClass;
    /** Class of indicators tablist element */
    indicatorsClass: ComponentClass;
    /** Class of indicators tablist element when inside */
    indicatorsInsideClass: ComponentClass;
    /** Class of indicators tablist element with position */
    indicatorsPositionClass: ComponentClass;
    /** Class of indicator tab element */
    indicatorClass: ComponentClass;
    /** Class of indicator item element */
    indicatorItemClass: ComponentClass;
    /** Class of indicator element when active */
    indicatorItemActiveClass: ComponentClass;
    /** Class of indicator element to separate different styles */
    indicatorItemStyleClass: ComponentClass;
}>;

export type CarouselItemProps = {
    /** Override existing theme classes completely */
    override?: Booleanish;
    /** Make item clickable */
    clickable?: boolean;
} & CarouselItemClasses;

// class props (will not be displayed in the docs)
export type CarouselItemClasses = Partial<{
    /** Class of item element */
    itemClass: ComponentClass;
    /** Class of item element when active */
    itemActiveClass: ComponentClass;
    /** Class of item element when clickable */
    itemClickableClass: ComponentClass;
}>;

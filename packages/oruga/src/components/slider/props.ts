import type { ComponentClass } from "@/types";

export type SliderProps<IsRange extends boolean = false> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The input value state */
    modelValue?: IsRange extends true ? [number, number] : number;
    /** Enable range slider */
    range?: IsRange;
    /** Minimum value */
    min?: number;
    /** Maximum  value */
    max?: number;
    /** Step interval of ticks */
    step?: number;
    /**
     * Color of the slider
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Vertical size of slider
     * @values small, medium, large
     */
    size?: string;
    /** Show tick marks */
    ticks?: boolean;
    /** Show tooltip when thumb is being dragged */
    tooltip?: boolean;
    /**
     * Color of the tooltip
     * @values primary, info, success, warning, danger, and any other custom color
     */
    tooltipVariant?: string;
    /** Tooltip displays always */
    tooltipAlways?: boolean;
    /** Rounded thumb */
    rounded?: boolean;
    /** Slider will be disabled */
    disabled?: boolean;
    /** Update v-model only when dragging is finished */
    lazy?: boolean;
    /** Function to format the tooltip label for display */
    formatter?: (value: number) => string;
    /** Increases slider size on focus */
    biggerSliderFocus?: boolean;
    /** Show indicators */
    indicator?: boolean;
    /**
     * Define v-model format
     * @values row, percent
     */
    format?: "raw" | "percent";
    /** Date format locale */
    locale?: string | string[];
    /** Accessibility aria-label to to be passed to the slider thumb element. */
    ariaLabel?: string;
} & SliderClasses;

// class props (will not be displayed in the docs)
export type SliderClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element with size */
    sizeClass: ComponentClass;
    /** Class of the root element when disabled */
    disabledClass: ComponentClass;
    /** Class of the slider track element. */
    trackClass: ComponentClass;
    /** Class of the filled part of the slider */
    fillClass: ComponentClass;
    /** Class of the filled part of the slider with variant */
    variantClass: ComponentClass;
    /** Class of the thumb wrapper element */
    thumbWrapperClass: ComponentClass;
    /** Class to the thumb wrapper element when the slider is dragged */
    thumbWrapperDraggingClass: ComponentClass;
    /** Class of the thumb element */
    thumbClass: ComponentClass;
    /** Class of the thumb element when rounded */
    thumbRoundedClass: ComponentClass;
    /** Class of the thumb element when is dragged */
    thumbDraggingClass: ComponentClass;
    /** Class of the slider tick element */
    tickClass: ComponentClass;
    /** Class of the slider tick element when is hidden */
    tickHiddenClass: ComponentClass;
    /** Class of the slider tick label element */
    tickLabelClass: ComponentClass;
}>;

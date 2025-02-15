import type { ComponentClass } from "@/types";

export type SliderProps<IsRange extends boolean> = {
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
} & SelectClasses;

// class props (will not be displayed in the docs)
export type SelectClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the vertical slider size */
    sizeClass: ComponentClass;
    /** Class of the slider track */
    trackClass: ComponentClass;
    /** Class of the filled part of the slider */
    fillClass: ComponentClass;
    /** Class when slider is disabled */
    disabledClass: ComponentClass;
    /** Class of the slider variant */
    variantClass: ComponentClass;
    /** Class of the thumb wrapper */
    thumbWrapperClass: ComponentClass;
    /** Class to display on the wrapper element when the slider is dragged */
    thumbWrapperDraggingClass: ComponentClass;
    /** Class of the thumb */
    thumbClass: ComponentClass;
    /** Class when the slider is rounded */
    thumbRoundedClass: ComponentClass;
    /** Class when the thumb gets dragged */
    thumbDraggingClass: ComponentClass;
    /** Class of slider tick */
    tickClass: ComponentClass;
    /** Class when slider tick is hidden */
    tickHiddenClass: ComponentClass;
    /** Class of tick label */
    tickLabelClass: ComponentClass;
}>;

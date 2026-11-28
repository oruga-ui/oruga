import type { ComponentClass } from "@/types";

export type ProgressProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Current progress value, leave it undefined to display an indeterminate progress */
    value?: number;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /**
     * Color variant of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Size of the control
     * @values small, medium, large
     */
    size?: string;
    /** Enable rounded style */
    rounded?: boolean;
    /** Show the formatted progress value as a label */
    showValue?: boolean;
    /**
     * Define the label format
     * @values raw, percent
     */
    format?: "raw" | "percent";
    /** Function to format the progress value for display, replaces the `format` prop */
    formatter?: (value: number) => string;
    /** Number format locale */
    locale?: string | string[];
} & ProgressClasses;

// class props (will not be displayed in the docs)
export type ProgressClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element with variant */
    variantClass: ComponentClass;
    /** Class of the root element with size */
    sizeClass: ComponentClass;
    /** Class of the root element when rounded */
    roundedClass: ComponentClass;
    /** Class of the root element when indeterminate */
    indeterminateClass: ComponentClass;
    /** Class of the native progress element */
    barClass: ComponentClass;
    /** Class of the label element */
    labelClass: ComponentClass;
}>;

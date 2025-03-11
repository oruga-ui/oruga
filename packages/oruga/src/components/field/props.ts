import type { ComponentClass, DynamicComponent } from "@/types";

export type FieldProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * Color of the field and help message, also adds a matching icon.
     * Used by Input, Select and Autocomplete.
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /** Field label */
    label?: string;
    /**
     * Vertical size of input
     * @values small, medium, large
     */
    labelSize?: string;
    /** Same as native `for` set on the label */
    labelFor?: string;
    /** A unique HTML id for the field label to associate an input with */
    labelId?: string;
    /** Help message text */
    message?: string;
    /** Message element tag name */
    messageTag?: DynamicComponent;
    /** A unique HTML id for the field message to associate an input with */
    messageId?: string;
    /**
     * Direct child components/elements of Field will be grouped horizontally
     * (see which ones at the top of the page).
     */
    grouped?: boolean;
    /** Field automatically attach controls together */
    addons?: boolean;
    /** Group label and control on the same line for horizontal forms */
    horizontal?: boolean;
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint?: string;
} & FieldClasses;

// class props (will not be displayed in the docs)
export type FieldClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when on mobile */
    mobileClass: ComponentClass;
    /** Class of the root element when the form element is focused */
    focusedClass: ComponentClass;
    /** Class of the root element when the form element is filled */
    filledClass: ComponentClass;
    /** Class for the body wrapper element*/
    bodyClass: ComponentClass;
    /** Class for inner wrapper element when grouped */
    groupedClass: ComponentClass;
    /** Class of the inner wrapper element when element get automatically attached together inside a field */
    addonsClass: ComponentClass;
    /** Class to align label and control in horizontal forms */
    horizontalClass: ComponentClass;
    /** Class for the label element when horizontal */
    horizontalLabelClass: ComponentClass;
    /** Class for the body element when horizontal */
    horizontalBodyClass: ComponentClass;
    /** Class for the label element*/
    labelClass: ComponentClass;
    /** Class for the label element with size */
    labelSizeClass: ComponentClass;
    /** Class for the label element with variant */
    labelVariantClass: ComponentClass;
    /** Class for the message element */
    messageClass: ComponentClass;
    /** Class for the message element with variant */
    messageVariantClass: ComponentClass;
}>;

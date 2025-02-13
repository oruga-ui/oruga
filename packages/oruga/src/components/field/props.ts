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
    /** Allow controls to fill up multiple lines, making it responsive */
    groupMultiline?: boolean;
    /** Group label and control on the same line for horizontal forms */
    horizontal?: boolean;
    /** Field automatically attach controls together */
    addons?: boolean;
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint?: string;
} & FieldClasses;

// class props (will not be displayed in the docs)
type FieldClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class to align label and control in horizontal forms */
    horizontalClass: ComponentClass;
    /** Class for field label when horizontal */
    horizontalLabelClass: ComponentClass;
    /** "Class for field body when horizontal */
    horizontalBodyClass: ComponentClass;
    /** Class when fields are grouped together */
    groupedClass: ComponentClass;
    /** Class when fields fill up multiple lines */
    groupMultilineClass: ComponentClass;
    /** Class for field label */
    labelClass: ComponentClass;
    /** Class for field label size */
    labelSizeClass: ComponentClass;
    /** Class of the label field variant */
    labelVariantClass: ComponentClass;
    /** Class for field body */
    bodyClass: ComponentClass;
    /** Class for components automatically attached together when inside a field */
    addonsClass: ComponentClass;
    /** Class for the field message */
    messageClass: ComponentClass;
    /** Class of the message field variant */
    messageVariantClass: ComponentClass;
    /** Class of file component when on mobile */
    mobileClass: ComponentClass;
    /** Class for the focused field */
    focusedClass: ComponentClass;
    /** Class for the filled field */
    filledClass: ComponentClass;
}>;

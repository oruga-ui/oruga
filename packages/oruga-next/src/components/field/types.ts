import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        field?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class for field label */
                labelClass: ClassDefinition;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Class of file component when on mobile */
                mobileClass: ClassDefinition;
                /** Vertical size of input */
                labelsize: string;
                /** Class to align label and control in horizontal forms */
                horizontalClass: ClassDefinition;
                /** Class when fields are grouped together */
                groupedClass: ClassDefinition;
                /** Class when fields fill up multiple lines */
                groupMultilineClass: ClassDefinition;
                /** Class for field label size */
                labelSizeClass: ClassDefinition;
                /** Class for field label when horizontal */
                labelHorizontalClass: ClassDefinition;
                /** Class for field body */
                bodyClass: ClassDefinition;
                /** "Class for field body when horizontal */
                bodyHorizontalClass: ClassDefinition;
                /** Class for components automatically attached together when inside a field */
                addonsClass: ClassDefinition;
                /** Class for the field message */
                messageClass: ClassDefinition;
                /** Class of the message field variant */
                variantMessageClass: ClassDefinition;
                /** Class of the label field variant */
                variantLabelClass: ClassDefinition;
                /** Class for the focused field */
                focusedClass: ClassDefinition;
                /** Class for the filled field */
                filledClass: ClassDefinition;
            }>;
    }
}

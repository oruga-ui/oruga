import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        input?: ComponentConfigBase &
            Partial<{
                /** Size of the control */
                size: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Add a button/icon to clear the inputed text */
                clearable: boolean;
                /** Icon name to be added on the clear button */
                clearIcon: string;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class of input when expanded */
                expandedClass: ClassDefinition;
                /** Class of input when rounded */
                roundedClass: ClassDefinition;
                /** Class of input when disabled */
                disabledClass: ClassDefinition;
                /** Class of the left icon */
                iconLeftClass: ClassDefinition;
                /** Class of the right icon */
                iconRightClass: ClassDefinition;
                /** Class of the input size */
                sizeClass: ClassDefinition;
                /** Class of the input variant */
                variantClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Show character counter when maxlength prop is passed */
                counter: boolean;
                /** Class of input when type textarea */
                textareaClass: ClassDefinition;
                /** Class of the left icon space inside the input */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the right icon space inside the input */
                iconRightSpaceClass: ClassDefinition;
                /** Class of the counter element */
                counterClass: ClassDefinition;
            }>;
    }
}

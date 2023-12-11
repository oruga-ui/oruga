import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        input?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of input when expanded */
                expandedClass: ClassDefinition;
                /** Class of the left icon space inside the input */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the right icon space inside the input */
                iconRightSpaceClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Class of input when rounded */
                roundedClass: ClassDefinition;
                /** Class of the left icon */
                iconLeftClass: ClassDefinition;
                /** Class of the right icon */
                iconRightClass: ClassDefinition;
                /** Class of the counter element */
                counterClass: ClassDefinition;
                /** Class of the input size */
                sizeClass: ClassDefinition;
                /** Class of the input variant */
                variantClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Color of the control */
                variant: string;
                /** Size of the control */
                size: string;
                /** Show character counter when maxlength prop is passed */
                counter: boolean;
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
            }>;
    }
}

import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        radio?: ComponentConfigBase &
            Partial<{
                /** Size of the control */
                size: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class when radio is disabled */
                disabledClass: ClassDefinition;
                /** Class of the radio label */
                labelClass: ClassDefinition;
                /** Class of the radio size */
                sizeClass: ClassDefinition;
                /** Class of the radio variant */
                variantClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Class of the native input element when checked */
                inputCheckedClass: ClassDefinition;
            }>;
    }
}

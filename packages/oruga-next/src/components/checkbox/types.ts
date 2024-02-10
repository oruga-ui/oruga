import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        checkbox?: ComponentConfigBase &
            Partial<{
                /** Size of the control */
                size: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class when checkbox is disabled */
                disabledClass: ClassDefinition;
                /** Class of the checkbox labe */
                labelClass: ClassDefinition;
                /** Class of the checkbox size */
                sizeClass: ClassDefinition;
                /** Class of the checkbox variant */
                variantClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
                /** Class of the checkbox input */
                inputClass: ClassDefinition;
                /** Class of the checkbox input when checked */
                inputCheckedClass: ClassDefinition;
                /** Class when checkbox is indeterminate */
                indeterminateClass: ClassDefinition;
            }>;
    }
}

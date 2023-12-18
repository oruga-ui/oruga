import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        radio?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class when radio is disabled */
                disabledClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Class of the native input element when checked */
                inputCheckedClass: ClassDefinition;
                /** Class of the radio label */
                labelClass: ClassDefinition;
                /** Class of the radio size */
                sizeClass: ClassDefinition;
                /** Class of the radio variant */
                variantClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Size of the control */
                size: string;
                /** Color of the control */
                variant: string;
            }>;
    }
}

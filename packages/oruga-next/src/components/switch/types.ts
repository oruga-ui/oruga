import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        switch?: ComponentConfigBase &
            Partial<{
                /** Size of the control */
                size: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class of the switch when rounded */
                roundedClass: ClassDefinition;
                /** Class when switch is disabled */
                disabledClass: ClassDefinition;
                /** Class of the switch label */
                labelClass: ClassDefinition;
                /** Class of the switch size */
                sizeClass: ClassDefinition;
                /** Class of the switch variant */
                variantClass: ClassDefinition;
                /** Root class of the native input checkbox */
                inputClass: ClassDefinition;
                /** Class of the native input element when checked */
                inputCheckedClass: ClassDefinition;
                /** Class of switch label position */
                positionClass: ClassDefinition;
                /** Color of the switch when is passive */
                passiveVariant: string;
                /** Class of the outer switch check */
                switchClass: ClassDefinition;
                /** Class of the outer switch check when checked */
                switchCheckedClass: ClassDefinition;
                /** Class of the inner switch check */
                switchCheckClass: ClassDefinition;
                /** Class of the switch passive variant */
                passiveVariantClass: ClassDefinition;
            }>;
    }
}

import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "@/types" {
    interface OrugaOptions {
        switch?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class when slider is disabled */
                disabledClass: ClassDefinition;
                /** Class of the outer switch check */
                checkClass: ClassDefinition;
                /** Class of the outer switch check when checked */
                checkCheckedClass: ClassDefinition;
                /** Class of the inner switch check */
                checkSwitchClass: ClassDefinition;
                /** Class of the switch when rounded */
                roundedClass: ClassDefinition;
                /** Class of switch label position */
                positionClass: ClassDefinition;
                /** Root class of the native input checkbox */
                inputClass: ClassDefinition;
                /** Class of the switch label */
                labelClass: ClassDefinition;
                /** Class of the switch size */
                sizeClass: ClassDefinition;
                /** Class of the switch variant */
                variantClass: ClassDefinition;
                /** Class of the switch passive variant */
                passiveVariantClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Size of the control */
                size: string;
                /** Color of the control */
                variant: string;
                /** Color of the switch when is passive */
                passiveVariant: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
            }>;
    }
}

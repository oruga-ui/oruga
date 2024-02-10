import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        select?: ComponentConfigBase &
            Partial<{
                /** Vertical size of input */
                size: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class of select when expanded */
                expandedClass: ClassDefinition;
                /** Class of select when rounded */
                roundedClass: ClassDefinition;
                /** Class of select when disabled */
                disabledClass: ClassDefinition;
                /** Class of the left icon */
                iconLeftClass: ClassDefinition;
                /** Class of the right icon */
                iconRightClass: ClassDefinition;
                /** Class of the select size */
                sizeClass: ClassDefinition;
                /** Class of the select variant */
                variantClass: ClassDefinition;
                /** Class of the left icon space inside the select */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the right icon space inside the select */
                iconRightSpaceClass: ClassDefinition;
                /** Class of the native select element */
                selectClass: ClassDefinition;
                /** Class of the select when multiple mode is active */
                multipleClass: ClassDefinition;
                /** Class of the select placeholder */
                placeholderClass: ClassDefinition;
                /** Class of the select arrow */
                arrowClass: ClassDefinition;
            }>;
    }
}

import type { ClassDefinition, ComponentConfigBase } from "@/types";

/**
 * Options should always be formatted as an array of objects with label and value
 * properties.
 */
export interface OptionsItem<V = unknown> {
    label: string;
    value: V;
    attrs?: {
        disabled?: boolean;
    } & Record<string, any>;
    [index: string]: any;
}

declare module "../../index" {
    interface OrugaOptions {
        select?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the native select element */
                selectClass: ClassDefinition;
                /** Class of the left icon space inside the select */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the right icon space inside the select */
                iconRightSpaceClass: ClassDefinition;
                /** Class of select when rounded */
                roundedClass: ClassDefinition;
                /** Class of the select when multiple mode is active */
                multipleClass: ClassDefinition;
                /** Class of select when expanded */
                expandedClass: ClassDefinition;
                /** Class of the left icon */
                iconLeftClass: ClassDefinition;
                /** Class of the right icon */
                iconRightClass: ClassDefinition;
                /** Class of the select size */
                sizeClass: ClassDefinition;
                /** Class of the select variant */
                variantClass: ClassDefinition;
                /** Class of the select placeholder */
                placeholderClass: ClassDefinition;
                /** Class of the select arrow */
                arrowClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Vertical size of input */
                size: string;
                /** Color of the control */
                variant: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
            }>;
    }
}

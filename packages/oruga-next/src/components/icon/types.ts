import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        icon?: ComponentConfigBase &
            Partial<{
                /** Icon size */
                size: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the icon */
                variant: string;
                /** Class of the icon size */
                sizeClass: ClassDefinition;
                /** Class of the icon variant */
                variantClass: ClassDefinition;
                /** Add class to icon font.
See icon library documentation for custom classes. */
                customClass: string;
                /** Class of the icon when clickable */
                clickableClass: ClassDefinition;
                /** Class of the element when spin */
                spinClass: ClassDefinition;
            }>;
    }
}

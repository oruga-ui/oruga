import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "@/types" {
    interface OrugaOptions {
        icon?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the icon when clickable */
                clickableClass: ClassDefinition;
                /** Class of the element when spin */
                spinClass: ClassDefinition;
                /** Class of the icon size */
                sizeClass: ClassDefinition;
                /** Class of the icon variant */
                variantClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Color of the icon */
                variant: string;
                /** Icon size */
                size: string;
            }>;
    }
}

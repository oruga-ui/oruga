import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        skeleton?: ComponentConfigBase &
            Partial<{
                /** Enable rounded style */
                rounded: boolean;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the skeleton item */
                itemClass: ClassDefinition;
                /** Class of the skeleton size */
                sizeClass: ClassDefinition;
                /** Class of the skeleton position */
                positionClass: ClassDefinition;
                /** Show a loading animation */
                animated: boolean;
                /** Class of the skeleton animation */
                animationClass: ClassDefinition;
                /** Class of the skeleton item rounded */
                itemRoundedClass: ClassDefinition;
            }>;
    }
}

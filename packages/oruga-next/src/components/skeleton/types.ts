import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        skeleton?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the skeleton animation */
                animationClass: ClassDefinition;
                /** Class of the skeleton position */
                positionClass: ClassDefinition;
                /** Class of the skeleton item */
                itemClass: ClassDefinition;
                /** Class of the skeleton item rounded */
                itemRoundedClass: ClassDefinition;
                /** Class of the skeleton size */
                sizeClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Show a loading animation */
                animated: boolean;
                /** Enable rounded style */
                rounded: boolean;
                /** Skeleton position in relation to the element */
                position: string;
            }>;
    }
}

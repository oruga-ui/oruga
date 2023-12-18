import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        upload?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the Upload when draggable */
                draggableClass: ClassDefinition;
                /** Class of the Upload variant */
                variantClass: ClassDefinition;
                /** Class of the Upload when expanded */
                expandedClass: ClassDefinition;
                /** Class of the Upload when disabled */
                disabledClass: ClassDefinition;
                /** Class of the Upload when hovered */
                hoveredClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Color of the control */
                variant: string;
            }>;
    }
}

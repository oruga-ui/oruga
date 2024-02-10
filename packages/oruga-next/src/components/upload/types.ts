import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        upload?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class of the Upload when expanded */
                expandedClass: ClassDefinition;
                /** Class of the Upload when disabled */
                disabledClass: ClassDefinition;
                /** Class of the Upload variant */
                variantClass: ClassDefinition;
                /** Class of the Upload when draggable */
                draggableClass: ClassDefinition;
                /** Class of the Upload when hovered */
                hoveredClass: ClassDefinition;
            }>;
    }
}

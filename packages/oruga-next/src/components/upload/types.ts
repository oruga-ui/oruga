import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "@/types" {
    interface OrugaOptions {
        upload?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Upload class when draggable */
                draggableClass: ClassDefinition;
                /** Class of the upload variant */
                variantClass: ClassDefinition;
                /** Upload class when expanded */
                expandedClass: ClassDefinition;
                /** Upload class when disabled */
                disabledClass: ClassDefinition;
                /** Upload class when hovered */
                hoveredClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Color of the control */
                variant: string;
            }>;
    }
}

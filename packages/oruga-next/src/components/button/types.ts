import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        button?: ComponentConfigBase &
            Partial<{
                /** Size of the control */
                size: string;
                /** Enable rounded style */
                rounded: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Button tag name */
                tag: DynamicComponent;
                /** Color variant of the control */
                variant: string;
                /** Accessibility Role attribute to be passed to the button. */
                role: string;
                /** Class of the button elements wrapper */
                wrapperClass: ClassDefinition;
                /** Class of the button when outlined */
                outlinedClass: ClassDefinition;
                /** Class of the button with loading */
                loadingClass: ClassDefinition;
                /** Class of the button when inverted */
                invertedClass: ClassDefinition;
                /** Class of the button when expanded */
                expandedClass: ClassDefinition;
                /** Class of the button when rounded */
                roundedClass: ClassDefinition;
                /** Class of the button when disabled */
                disabledClass: ClassDefinition;
                /** Class of the button icon */
                iconClass: ClassDefinition;
                /** Class of the button icon on the left */
                iconLeftClass: ClassDefinition;
                /** Class of the button icon on the right */
                iconRightClass: ClassDefinition;
                /** Class of the button label */
                labelClass: ClassDefinition;
                /** Class of the button size */
                sizeClass: ClassDefinition;
                /** Class of the button variant */
                variantClass: ClassDefinition;
            }>;
    }
}

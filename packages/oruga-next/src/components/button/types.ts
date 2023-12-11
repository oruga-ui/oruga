import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        button?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
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
                /** Class of the button label */
                labelClass: ClassDefinition;
                /** Class of the button icon */
                iconClass: ClassDefinition;
                /** Class of the button icon on the left */
                iconLeftClass: ClassDefinition;
                /** Class of the button icon on the right */
                iconRightClass: ClassDefinition;
                /** Class of the button size */
                sizeClass: ClassDefinition;
                /** Class of the button variant */
                variantClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Button tag name */
                tag: DynamicComponent;
                /** Color variant of the control */
                variant: string;
                /** Size of the control */
                size: string;
                /** Icon pack to use */
                iconPack: string;
                /** Enable rounded style */
                rounded: boolean;
                /** Accessibility Role attribute to be passed to the button. */
                role: string;
            }>;
    }
}

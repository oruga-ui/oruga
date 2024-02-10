import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        notification?: ComponentConfigBase &
            Partial<{
                /** Which position the notification will appear when programmatically */
                position: string;
                /** Custom animation (transition name) */
                animation: string;
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class of the wrapper element */
                wrapperClass: ClassDefinition;
                /** Class of the icon on the left */
                iconClass: ClassDefinition;
                /** Class of the notification variant */
                variantClass: ClassDefinition;
                /** Icon size */
                iconSize: string;
                /** Class of the content element */
                contentClass: ClassDefinition;
                /** Close icon name */
                closeIcon: string;
                /** Size of close icon */
                closeIconSize: string;
                /** Class of the close button container */
                closeClass: ClassDefinition;
                /** Accessibility label for the close button */
                ariaCloseLabel: string;
                /** Class of the element when positioned */
                positionClass: ClassDefinition;
            }>;
    }
}

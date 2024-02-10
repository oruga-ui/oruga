import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        loading?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the loading overlay */
                overlayClass: ClassDefinition;
                /** Class for the root element when fullpage */
                fullPageClass: ClassDefinition;
                /** Class for the loading icon */
                iconClass: ClassDefinition;
                /** Class for the loading label */
                labelClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /**  DOM element where the loading component will be created on */
                container: string | HTMLElement;
                /** Icon size */
                iconSize: string;
                /** Enable spin effect on icon */
                iconSpin: boolean;
                /** Custom animation (transition name) */
                animation: string;
            }>;
    }
}

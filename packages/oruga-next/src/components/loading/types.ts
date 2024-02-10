import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        loading?: ComponentConfigBase &
            Partial<{
                /** Custom animation (transition name) */
                animation: string;
                /** Icon name to show, unnecessary when default slot is used. */
                icon: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class for the loading icon */
                iconClass: ClassDefinition;
                /** Class for the loading label */
                labelClass: ClassDefinition;
                /** Icon size */
                iconSize: string;
                /** Class of the loading overlay */
                overlayClass: ClassDefinition;
                /** Enable spin effect on icon */
                iconSpin: boolean;
                /** DOM element where the loading component will be created on (for programmatic usage).
Note that this also changes fullPage to false. */
                container: string | HTMLElement;
                /** Class for the root element when fullpage */
                fullPageClass: ClassDefinition;
            }>;
    }
}

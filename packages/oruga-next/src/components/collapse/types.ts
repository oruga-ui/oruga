import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        collapse?: ComponentConfigBase &
            Partial<{
                /** Trigger position */
                position: "top" | "bottom";
                /** Custom animation (transition name) */
                animation: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
                /** Class of the content */
                contentClass: ClassDefinition;
            }>;
    }
}

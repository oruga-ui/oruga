import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        collapse?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
                /** Class of the content */
                contentClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Custom animation (transition name) */
                animation: string;
                /** Trigger position */
                position: string;
            }>;
    }
}

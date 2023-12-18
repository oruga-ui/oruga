import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        tooltip?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class when the dropdown is teleported */
                teleportClass: ClassDefinition;
                /** Class of the tooltip content */
                contentClass: ClassDefinition;
                /** Class of the tooltip trigger position */
                positionClass: ClassDefinition;
                /** Class of the tooltip trigger */
                triggerClass: ClassDefinition;
                /** Class of the tooltip content when is multiline */
                multilineClass: ClassDefinition;
                /** Class of the tooltip trigger when is always visible */
                alwaysClass: ClassDefinition;
                /** Class of the tooltip variant */
                variantClass: ClassDefinition;
                /** Class of the tooltip arrow */
                arrowClass: ClassDefinition;
                /** Class of the tooltip arrow position */
                arrowPositionClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Color of the tooltip */
                variant: string;
                /**  Position of the Tooltip relative to the trigger */
                position: string;
                /** Tooltip default animation */
                animation: string;
                /** Tooltip trigger tag name */
                triggerTag: DynamicComponent;
                /** Tooltip trigger events */
                triggers: string[];
                /** Tooltip auto close options */
                closeable: boolean | string[];
                /** Append the component to another part of the DOM */
                teleport: boolean | string;
            }>;
    }
}

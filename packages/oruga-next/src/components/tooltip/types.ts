import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        tooltip?: ComponentConfigBase &
            Partial<{
                /** Position of the Tooltip relative to the trigger */
                position: string;
                /** Tooltip default animation */
                animation: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the tooltip */
                variant: string;
                /** Class of the tooltip variant */
                variantClass: ClassDefinition;
                /** Class of the tooltip trigger */
                triggerClass: ClassDefinition;
                /** Class of the tooltip content */
                contentClass: ClassDefinition;
                /** Tooltip trigger tag name */
                triggerTag: DynamicComponent;
                /** Tooltip trigger events */
                triggers: string[];
                /** Tooltip auto close options (pressing escape, clicking the content or outside) */
                closeable: boolean | string[];
                /** Class when the dropdown is teleported */
                teleportClass: ClassDefinition;
                /** Class of the tooltip arrow */
                arrowClass: ClassDefinition;
                /** Class of the tooltip trigger position */
                positionClass: ClassDefinition;
                /** Class of the tooltip content when is multiline */
                multilineClass: ClassDefinition;
                /** Class of the tooltip trigger when is always visible */
                alwaysClass: ClassDefinition;
                /** Class of the tooltip arrow position */
                arrowPositionClass: ClassDefinition;
            }>;
    }
}

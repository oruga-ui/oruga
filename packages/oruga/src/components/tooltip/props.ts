import type { ComponentClass, DynamicComponent } from "@/types";

export type TooltipProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether tooltip is active or not, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Tooltip text, unnecessary when content slot is used */
    label?: string;
    /**
     * Color of the tooltip
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Position of the Tooltip relative to the trigger
     * @values auto, top, bottom, left, right, top-right, top-left, bottom-left, bottom-right
     */
    position?:
        | "auto"
        | "top"
        | "bottom"
        | "left"
        | "right"
        | "top-right"
        | "top-left"
        | "bottom-left"
        | "bottom-right";
    /** Tooltip will be always active */
    always?: boolean;
    /** Tooltip will be disabled */
    disabled?: boolean;
    /** Tooltip default animation */
    animation?: string;
    /** Tooltip will be multilined */
    multiline?: boolean;
    /** Tooltip trigger tag name */
    triggerTag?: DynamicComponent;
    /**
     * Tooltip trigger events
     * @values hover, click, focus, contextmenu
     */
    triggers?: ("click" | "hover" | "contextmenu" | "focus")[];
    /** Tooltip delay before it appears (number in ms) */
    delay?: number;
    /**
     * Tooltip auto close options (pressing escape, clicking the content or outside)
     * @values true, false, content, outside, escape
     */
    closeable?: string[] | boolean;
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport?: boolean | string | object;
} & TooltipClasses;

// class props (will not be displayed in the docs)
type TooltipClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class when the dropdown is teleported */
    teleportClass: ComponentClass;
    /** Class of the tooltip content */
    contentClass: ComponentClass;
    /** Class of the tooltip trigger position */
    positionClass: ComponentClass;
    /** Class of the tooltip trigger */
    triggerClass: ComponentClass;
    /** Class of the tooltip content when is multiline */
    multilineClass: ComponentClass;
    /** Class of the tooltip trigger when is always visible */
    alwaysClass: ComponentClass;
    /** Class of the tooltip variant */
    variantClass: ComponentClass;
    /** Class of the tooltip arrow */
    arrowClass: ComponentClass;
    /** Class of the tooltip arrow position */
    arrowPositionClass: ComponentClass;
}>;

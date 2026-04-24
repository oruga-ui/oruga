import type { ComponentClass, DynamicComponent } from "@/types";

export type TooltipProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether tooltip is active or not, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Tooltip text, unnecessary when content slot is used */
    label?: string;
    /** A unique HTML id for the tooltip element */
    id?: string;
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
    /**
     * Tooltip will be multilined
     * @deprecated use `maxWidth` instead
     */
    multiline?: boolean;
    /** Limit the tooltip content width */
    maxWidth?: string;
    /** Tooltip trigger tag name */
    triggerTag?: DynamicComponent;
    /**
     * Show when hover over the trigger
     * @deprecated - will be removed
     */
    openOnHover?: boolean;
    /**
     * Show when trigger get focused
     * @deprecated - will be removed
     */
    openOnFocus?: boolean;
    /**
     * Show when clicked on the trigger
     * @deprecated - will be removed - use OPopover instead
     */
    openOnClick?: boolean;
    /**
     * Show when right clicked on the trigger
     * @deprecated - will be removed - use OPopover instead
     */
    openOnContextmenu?: boolean;
    /** Tooltip delay before it appears (number in ms) */
    delay?: number;
    /**
     * Close on hover out of the content
     * @deprecated - will be removed
     */
    closeable?: boolean;
    /**
     * Close when clicked outside of the panel
     * @deprecated - will be removed
     */
    closeOnOutside?: boolean;
    /**
     * Close when pressing escape key
     * @deprecated - will be removed
     */
    closeOnEscape?: boolean;
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport?: boolean | string | object;
} & TooltipClasses;

// class props (will not be displayed in the docs)
export type TooltipClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when teleported */
    teleportClass: ComponentClass;
    /** Class of the trigger element */
    triggerClass: ComponentClass;
    /** Class of the content element */
    contentClass: ComponentClass;
    /** Class of the content element with position */
    positionClass: ComponentClass;
    /** Class of the content element with variant */
    variantClass: ComponentClass;
    /**
     * Class of the content element when is multiline
     * @deprecated `multiple` prop will be removed
     */
    multilineClass: ComponentClass;
    /** Class of the content element when is always visible */
    alwaysClass: ComponentClass;
    /** Class of the arrow element */
    arrowClass: ComponentClass;
    /** Class of the arrow element with position */
    arrowPositionClass: ComponentClass;
    /** Class of the arrow element with variant */
    arrowVariantClass: ComponentClass;
}>;

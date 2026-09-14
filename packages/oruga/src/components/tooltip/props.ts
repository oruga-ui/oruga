import type { ComponentClass, PopoverPosition } from "@/types";

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
    position?: PopoverPosition;
    /** Tooltip will be always active */
    always?: boolean;
    /** Tooltip will be disabled */
    disabled?: boolean;
    /** Tooltip default animation */
    animation?: string;
    /** Limit the tooltip content width */
    maxWidth?: string;
    /** Tooltip delay before it appears (number in ms) */
    delay?: number;
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
    /** Class of the root element when disabled */
    disabledClass: ComponentClass;
    /** Class for the root element when active  */
    activeClass: ComponentClass;
    /** Class of the content element when teleported */
    teleportClass: ComponentClass;
    /** Class of the content element */
    contentClass: ComponentClass;
    /** Class of the content element when active */
    contentActiveClass: ComponentClass;
    /** Class of the content element with variant */
    contentVariantClass: ComponentClass;
    /** Class of the arrow element */
    arrowClass: ComponentClass;
    /** Class of the arrow element with variant */
    arrowVariantClass: ComponentClass;
}>;

import type { PopoverPosition } from "@/composables";
import type { ComponentClass } from "@/types";

export type { PopoverPosition };

export type PopoverProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether popover is active or not, use v-model:active to make it two-way binding */
    active?: boolean;
    /** A unique HTML id for the popover element */
    id?: string;
    /** Content text, unnecessary when content slot is used */
    content?: string;
    /** Component will be disabled */
    disabled?: boolean;
    /**
     * Color variant of the popover
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Position of the popover relative to the trigger
     * @values auto, top, bottom, left, right, top-right, top-left, bottom-left, bottom-right
     */
    position?: PopoverPosition;
    /** Delay before the content appears (number in ms) */
    delay?: number;
    /** Show and dismiss animation */
    animation?: string;
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport?: boolean | string | object;
} & PopoverClasses;

// class props (will not be displayed in the docs)
export type PopoverClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when teleported */
    teleportClass: ComponentClass;
    /** Class of the trigger element */
    triggerClass: ComponentClass;
    /** Class of the content element */
    contentClass: ComponentClass;
    /** Class of the content element with variant */
    variantClass: ComponentClass;
}>;

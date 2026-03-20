import type { ComponentClass } from "@/types";

export type CollapseProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether collapse is open or not, use v-model:open to make it two-way binding */
    open?: boolean;
    /** Some label displayed in the summary element - unnecessary when trigger slot is used */
    label?: string;
    /**
     * Setting the same name to multiple collapse elements connects them together,
     * with only one open at a time.
     * This allows to easily create UI features such as accordions.
     */
    name?: string;
    /**
     * Trigger position
     * @values top, bottom
     */
    position?: "top" | "bottom";
    /** Expand the trigger to fullwidth */
    expanded?: boolean;
    /** Id property of the content container - default is an uuid */
    contentId?: string;
    /** Id property of the trigger container - default is an uuid */
    triggerId?: string;
} & CollapseClasses;

// class props (will not be displayed in the docs)
export type CollapseClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when expanded */
    expandedClass: ComponentClass;
    /** Clas of the root element with position */
    positionClass: ComponentClass;
    /** Class of the trigger element */
    triggerClass: ComponentClass;
    /** Class of the content */
    contentClass: ComponentClass;
}>;

import type { ComponentClass } from "@/types";

export type CollapseProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether collapse is open or not, use v-model:open to make it two-way binding */
    open?: boolean;
    /** Custom animation (transition name) */
    animation?: string;
    /** Id property of the content container - default is an uuid */
    contentId?: string;
    /** Id property of the trigger container - default is an uuid */
    triggerId?: string;
    /**
     * Trigger position
     * @values top, bottom
     */
    position?: "top" | "bottom";
} & CollapseClasses;

// class props (will not be displayed in the docs)
type CollapseClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the trigger element */
    triggerClass: ComponentClass;
    /** Class of the content */
    contentClass: ComponentClass;
}>;

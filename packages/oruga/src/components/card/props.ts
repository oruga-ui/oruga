import type { ComponentClass } from "@/types";

export type ButtonProps = {
    /** Override existing theme classes completely */
    override?: boolean;
} & ButtonClasses;

// class props (will not be displayed in the docs)
export type ButtonClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
}>;

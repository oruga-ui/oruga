import type { ComponentClass } from "@/types";

export type SkeletonProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Show or hide loader	 */
    active?: boolean;
    /** Show a loading animation */
    animated?: boolean;
    /** Custom width */
    width?: number | string;
    /** Custom height */
    height?: number | string;
    /** Show a circle shape */
    circle?: boolean;
    /** Enable rounded style */
    rounded?: boolean;
    /** Number of shapes to display */
    count?: number;
    /**
     * Size of skeleton
     * @values small, medium, large
     */
    size?: string;
    /**
     * Skeleton position in relation to the element
     * @values left, centered, right
     */
    position?: "left" | "centered" | "right";
} & SkeletonClasses;

// class props (will not be displayed in the docs)
export type SkeletonClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element with position */
    positionClass: ComponentClass;
    /** Class of the skeleton item element */
    itemClass: ComponentClass;
    /** Class of the skeleton item element when rounded */
    roundedClass: ComponentClass;
    /** Class of the skeleton item element when animated */
    animatedClass: ComponentClass;
    /** Class of the skeleton item element with size */
    sizeClass: ComponentClass;
}>;

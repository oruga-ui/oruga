declare const _default: import("vue").DefineComponent<{
    /** Show or hide loader	 */
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Show a loading animation */
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Custom width */
    width: (StringConstructor | NumberConstructor)[];
    /** Custom height */
    height: (StringConstructor | NumberConstructor)[];
    /** Show a circle shape */
    circle: BooleanConstructor;
    /** Rounded style */
    rounded: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Number of shapes to display */
    count: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * Skeleton position in relation to the element
     * @values left, centered, right
     */
    position: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    /**
     * Size of skeleton
     * @values small, medium, large
     */
    size: StringConstructor;
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    animationClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    positionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemRoundedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, unknown, {}, {}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    rounded: boolean;
    position: string;
    active: boolean;
    animated: boolean;
    count: number;
} & {
    size?: string;
    rootClass?: string | Function | unknown[];
    sizeClass?: string | Function | unknown[];
    itemClass?: string | Function | unknown[];
    width?: string | number;
    positionClass?: string | Function | unknown[];
    circle?: boolean;
    height?: string | number;
    animationClass?: string | Function | unknown[];
    itemRoundedClass?: string | Function | unknown[];
}>, {
    rounded: boolean;
    position: string;
    active: boolean;
    animated: boolean;
    count: number;
}>;
/**
 * A placeholder for content to load
 * @displayName Skeleton
 * @example ./examples/Skeleton.md
 * @style _skeleton.scss
 */
export default _default;

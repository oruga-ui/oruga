declare const _default: import("vue").DefineComponent<{
    /** Value of single tick */
    value: {
        variant: NumberConstructor;
        default: number;
    };
    tickClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tickHiddenClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tickLabelClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, unknown, {
    rootClasses(): any[];
    tickLabelClasses(): any[];
    position(): number;
    hidden(): boolean;
    tickStyle(): {
        left: string;
    };
}, {}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    value: number;
} & {
    tickClass?: string | Function | unknown[];
    tickHiddenClass?: string | Function | unknown[];
    tickLabelClass?: string | Function | unknown[];
}>, {
    value: number;
}>;
/**
 * @displayName Slider Tick
 */
export default _default;

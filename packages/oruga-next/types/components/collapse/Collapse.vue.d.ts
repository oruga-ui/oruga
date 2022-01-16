declare const _default: import("vue").DefineComponent<{
    /**
     * Whether collapse is open or not, use the .sync modifier (Vue 2.x) or v-model:open (Vue 3.x) to make it two-way binding
     */
    open: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Custom animation (transition name)
     */
    animation: {
        type: StringConstructor;
        default: () => any;
    };
    ariaId: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Trigger position
     * @values top, bottom
     */
    position: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    triggerClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    contentClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    isOpen: boolean;
}, {}, {
    /**
    * Toggle and emit events
    */
    toggle(): void;
}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}>, import("vue").ComponentOptionsMixin, ("close" | "update:open" | "open")[], "close" | "update:open" | "open", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    animation: string;
    open: boolean;
    ariaId: string;
    position: string;
} & {
    rootClass?: string | Function | unknown[];
    triggerClass?: string | Function | unknown[];
    contentClass?: string | Function | unknown[];
}>, {
    animation: string;
    open: boolean;
    ariaId: string;
    position: string;
}>;
/**
 * An easy way to toggle what you want
 * @displayName Collapse
 * @example ./examples/Collapse.md
 * @style _collapse.scss
 */
export default _default;

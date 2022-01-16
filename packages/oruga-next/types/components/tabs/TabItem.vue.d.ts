declare const _default: import("vue").DefineComponent<{
    /** Item will be disabled */
    disabled: BooleanConstructor;
    /**
     * Tabs item tag name
     */
    tag: {
        type: StringConstructor;
        default: () => any;
    };
    itemClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemHeaderClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemHeaderActiveClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemHeaderDisabledClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemHeaderTypeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemHeaderIconClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemHeaderTextClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, unknown, {
    elementClasses(): any[];
    headerClasses(): any[];
    headerIconClasses(): any[];
    headerTextClasses(): any[];
}, {}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}> | import("vue").DefineComponent<{
    label: StringConstructor;
    icon: StringConstructor;
    iconPack: StringConstructor;
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    value: (StringConstructor | NumberConstructor)[];
    headerClass: {
        type: (ArrayConstructor | ObjectConstructor | StringConstructor)[];
    };
}, unknown, {
    transitionName: any;
    newValue: string | number;
}, {
    isActive(): boolean;
    elementClasses(): any[];
}, {
    activate(oldIndex: number): void;
    deactivate(newIndex: number): void;
}, import("vue").DefineComponent<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    [x: string]: any;
}> | Readonly<{
    [x: string]: any;
} & {
    [x: number]: any;
}>, {} | {
    [x: string]: any;
}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    visible: boolean;
} & {
    label?: string;
    icon?: string;
    iconPack?: string;
    value?: string | number;
    headerClass?: unknown;
}>, {
    visible: boolean;
}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    tag: string;
} & {
    itemClass?: string | Function | unknown[];
    itemHeaderClass?: string | Function | unknown[];
    disabled?: boolean;
    itemHeaderActiveClass?: string | Function | unknown[];
    itemHeaderDisabledClass?: string | Function | unknown[];
    itemHeaderTypeClass?: string | Function | unknown[];
    itemHeaderIconClass?: string | Function | unknown[];
    itemHeaderTextClass?: string | Function | unknown[];
}>, {
    tag: string;
}>;
/**
 * @displayName Tab Item
 */
export default _default;

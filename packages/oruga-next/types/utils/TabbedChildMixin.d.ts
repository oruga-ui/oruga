declare const _default: (parentCmp: string) => import("vue").DefineComponent<{
    /**
     * Item label
     */
    label: StringConstructor;
    /**
     * Icon on the left
     */
    icon: StringConstructor;
    /**
     * Icon pack
     */
    iconPack: StringConstructor;
    /**
     * Show/hide item
     */
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Item value (it will be used as v-model of wrapper component)
     */
    value: (StringConstructor | NumberConstructor)[];
    /**
     * Header class of the item
     */
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
    /**
     * Activate element, alter animation name based on the index.
     */
    activate(oldIndex: number): void;
    /**
     * Deactivate element, alter animation name based on the index.
     */
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
}>;
export default _default;

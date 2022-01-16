declare const _default: import("vue").DefineComponent<{
    page: {
        type: ObjectConstructor;
        required: true;
    };
    tag: {
        type: StringConstructor;
        default: string;
        validator: (value: unknown) => boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    linkClass: (ArrayConstructor | ObjectConstructor | StringConstructor)[];
    linkCurrentClass: (ArrayConstructor | ObjectConstructor | StringConstructor)[];
}, unknown, unknown, {
    linkClasses(): any[];
    href(): "" | "#";
    isDisabled(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    tag: string;
    disabled: boolean;
    page: Record<string, any>;
} & {
    linkClass?: unknown;
    linkCurrentClass?: unknown;
}>, {
    tag: string;
    disabled: boolean;
}>;
export default _default;

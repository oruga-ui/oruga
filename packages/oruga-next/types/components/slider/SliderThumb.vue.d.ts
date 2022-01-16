declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    variant: {
        type: StringConstructor;
        default: string;
    };
    tooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    indicator: {
        type: BooleanConstructor;
        default: boolean;
    };
    customFormatter: FunctionConstructor;
    format: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    locale: {
        type: (ArrayConstructor | StringConstructor)[];
        default: () => any;
    };
    tooltipAlways: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    isFocused: boolean;
    dragging: boolean;
    startX: number;
    startPosition: number;
    newPosition: any;
    oldValue: number;
}, {
    disabled(): any;
    max(): any;
    min(): any;
    step(): any;
    precision(): any;
    currentPosition(): string;
    wrapperStyle(): {
        left: any;
    };
    formattedValue(): any;
}, {
    onFocus(): void;
    onBlur(): void;
    onButtonDown(event: any): void;
    onLeftKeyDown(): void;
    onRightKeyDown(): void;
    onHomeKeyDown(): void;
    onEndKeyDown(): void;
    onDragStart(event: any): void;
    onDragging(event: any): void;
    onDragEnd(): void;
    setPosition(percent: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "dragend" | "dragstart")[], "update:modelValue" | "dragend" | "dragstart", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    variant: string;
    modelValue: number;
    indicator: boolean;
    locale: string | unknown[];
    tooltip: boolean;
    format: string;
    tooltipAlways: boolean;
} & {
    customFormatter?: Function;
}>, {
    variant: string;
    modelValue: number;
    indicator: boolean;
    locale: string | unknown[];
    tooltip: boolean;
    format: string;
    tooltipAlways: boolean;
}>;
export default _default;

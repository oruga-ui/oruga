declare const _default: import("vue").DefineComponent<{
    /** @model */
    modelValue: {
        type: (ArrayConstructor | NumberConstructor)[];
        default: number;
    };
    /** Minimum value */
    min: {
        type: NumberConstructor;
        default: number;
    };
    /** Maximum  value */
    max: {
        type: NumberConstructor;
        default: number;
    };
    /** Step interval of ticks */
    step: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * Color of the slider
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: StringConstructor;
    };
    /**
     * Vertical size of slider, optional
     * @values small, medium, large
     */
    size: StringConstructor;
    /** Show tick marks */
    ticks: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Show tooltip when thumb is being dragged */
    tooltip: {
        type: BooleanConstructor;
        default: () => any;
    };
    /**
     * Color of the tooltip
     * @values primary, info, success, warning, danger, and any other custom color
     */
    tooltipVariant: StringConstructor;
    /** Rounded thumb */
    rounded: {
        type: BooleanConstructor;
        default: () => any;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Update v-model only when dragging is finished */
    lazy: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Function to format the tooltip label for display */
    customFormatter: FunctionConstructor;
    ariaLabel: (ArrayConstructor | StringConstructor)[];
    /** Increases slider size on focus */
    biggerSliderFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    indicator: {
        type: BooleanConstructor;
        default: boolean;
    };
    format: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    locale: {
        type: (ArrayConstructor | StringConstructor)[];
        default: () => any;
    };
    /** Tooltip displays always */
    tooltipAlways: {
        type: BooleanConstructor;
        default: boolean;
    };
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    trackClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    fillClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thumbRoundedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thumbDraggingClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    disabledClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thumbWrapperClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thumbClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    value1: any;
    value2: any;
    dragging: boolean;
    isRange: boolean;
}, {
    rootClasses(): any[];
    trackClasses(): any[];
    fillClasses(): any[];
    thumbClasses(): any[];
    thumbWrapperClasses(): any[];
    newTooltipVariant(): any;
    tickValues(): any[];
    minValue(): number;
    maxValue(): number;
    barSize(): string;
    barStart(): string;
    precision(): number;
    barStyle(): {
        width: any;
        left: any;
    };
}, {
    setValues(newValue: any): void;
    onInternalValueUpdate(): void;
    sliderSize(): any;
    onSliderClick(event: any): void;
    onDragStart(): void;
    onDragEnd(): void;
    emitValue(event: any): void;
}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}>, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "dragend" | "dragstart" | "dragging")[], "update:modelValue" | "change" | "dragend" | "dragstart" | "dragging", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    rounded: boolean;
    modelValue: number | unknown[];
    disabled: boolean;
    indicator: boolean;
    locale: string | unknown[];
    tooltip: boolean;
    format: string;
    tooltipAlways: boolean;
    max: number;
    min: number;
    step: number;
    ticks: boolean;
    lazy: boolean;
    biggerSliderFocus: boolean;
} & {
    variant?: string;
    size?: string;
    rootClass?: string | Function | unknown[];
    sizeClass?: string | Function | unknown[];
    variantClass?: string | Function | unknown[];
    customFormatter?: Function;
    disabledClass?: string | Function | unknown[];
    ariaLabel?: string | unknown[];
    tooltipVariant?: string;
    trackClass?: string | Function | unknown[];
    fillClass?: string | Function | unknown[];
    thumbRoundedClass?: string | Function | unknown[];
    thumbDraggingClass?: string | Function | unknown[];
    thumbWrapperClass?: string | Function | unknown[];
    thumbClass?: string | Function | unknown[];
}>, {
    rounded: boolean;
    modelValue: number | unknown[];
    disabled: boolean;
    indicator: boolean;
    locale: string | unknown[];
    tooltip: boolean;
    format: string;
    tooltipAlways: boolean;
    max: number;
    min: number;
    step: number;
    ticks: boolean;
    lazy: boolean;
    biggerSliderFocus: boolean;
}>;
/**
 * A slider to select a value or range from a given range
 * @displayName Slider
 * @requires ./SliderTick.vue
 * @example ./examples/Slider.md
 * @style _slider.scss
 */
export default _default;

declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    interval: {
        type: NumberConstructor;
        default: () => void;
    };
    hasDrag: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    pauseHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    repeat: {
        type: BooleanConstructor;
        default: boolean;
    };
    indicator: {
        type: BooleanConstructor;
        default: boolean;
    };
    indicatorInside: {
        type: BooleanConstructor;
        default: boolean;
    };
    indicatorMode: {
        type: StringConstructor;
        default: string;
    };
    indicatorPosition: {
        type: StringConstructor;
        default: string;
    };
    indicatorStyle: {
        type: StringConstructor;
        default: string;
    };
    overlay: BooleanConstructor;
    itemsToShow: {
        type: NumberConstructor;
        default: number;
    };
    itemsToList: {
        type: NumberConstructor;
        default: number;
    };
    asIndicator: BooleanConstructor;
    arrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    arrowHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    iconPack: StringConstructor;
    iconSize: StringConstructor;
    iconPrev: {
        type: StringConstructor;
        default: () => any;
    };
    iconNext: {
        type: StringConstructor;
        default: () => any;
    };
    breakpoints: {
        type: ObjectConstructor;
        default: () => {};
    };
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    overlayClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sceneClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemsDraggingClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    arrowIconClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    arrowIconPrevClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    arrowIconNextClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    indicatorsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    indicatorsInsideClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    indicatorsInsidePositionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    indicatorItemClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    indicatorItemActiveClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    indicatorItemStyleClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    activeIndex: number;
    scrollIndex: number;
    delta: number;
    dragX: boolean;
    hold: number;
    windowWidth: number;
    touch: boolean;
    observer: any;
    refresh_: number;
    itemsHovered: boolean;
    isPause: boolean;
    timer: any;
}, {
    rootClasses(): any[];
    sceneClasses(): any[];
    itemsClasses(): any[];
    arrowIconClasses(): any[];
    arrowIconPrevClasses(): any[];
    arrowIconNextClasses(): any[];
    indicatorsClasses(): any[];
    indicatorClasses(): any[];
    dragging(): boolean;
    itemStyle(): string;
    translation(): number;
    total(): number;
    indicatorCount(): number;
    indicatorIndex(): number;
    hasArrows(): any;
    hasPrev(): any;
    hasNext(): any;
    breakpointKeys(): number[];
    settings(): any;
    itemWidth(): number;
}, {
    indicatorItemClasses(index: any): any[];
    onMouseEnter(): void;
    onMouseLeave(): void;
    startTimer(): void;
    pauseTimer(): void;
    restartTimer(): void;
    checkPause(): void;
    modeChange(trigger: any, value: any): any;
    resized(): void;
    switchTo(newIndex: any, onlyMove?: any): void;
    next(): void;
    prev(): void;
    dragStart(event: any): void;
    dragMove(event: any): void;
    dragEnd(event: any): void;
    refresh(): void;
}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}> | import("vue").DefineComponent<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    [x: string]: any;
}> | Readonly<{
    [x: string]: any;
} & {
    [x: number]: any;
}>, {} | {
    [x: string]: any;
}>, import("vue").ComponentOptionsMixin, ("update:modelValue" | "click" | "scroll")[], "update:modelValue" | "click" | "scroll", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue: number;
    interval: number;
    hasDrag: boolean;
    autoplay: boolean;
    pauseHover: boolean;
    repeat: boolean;
    indicator: boolean;
    indicatorInside: boolean;
    indicatorMode: string;
    indicatorPosition: string;
    indicatorStyle: string;
    itemsToShow: number;
    itemsToList: number;
    arrow: boolean;
    arrowHover: boolean;
    iconPrev: string;
    iconNext: string;
    breakpoints: Record<string, any>;
} & {
    rootClass?: string | Function | unknown[];
    iconPack?: string;
    overlay?: boolean;
    asIndicator?: boolean;
    iconSize?: string;
    overlayClass?: string | Function | unknown[];
    sceneClass?: string | Function | unknown[];
    itemsClass?: string | Function | unknown[];
    itemsDraggingClass?: string | Function | unknown[];
    arrowIconClass?: string | Function | unknown[];
    arrowIconPrevClass?: string | Function | unknown[];
    arrowIconNextClass?: string | Function | unknown[];
    indicatorsClass?: string | Function | unknown[];
    indicatorsInsideClass?: string | Function | unknown[];
    indicatorsInsidePositionClass?: string | Function | unknown[];
    indicatorItemClass?: string | Function | unknown[];
    indicatorItemActiveClass?: string | Function | unknown[];
    indicatorItemStyleClass?: string | Function | unknown[];
}>, {
    modelValue: number;
    interval: number;
    hasDrag: boolean;
    autoplay: boolean;
    pauseHover: boolean;
    repeat: boolean;
    indicator: boolean;
    indicatorInside: boolean;
    indicatorMode: string;
    indicatorPosition: string;
    indicatorStyle: string;
    itemsToShow: number;
    itemsToList: number;
    arrow: boolean;
    arrowHover: boolean;
    iconPrev: string;
    iconNext: string;
    breakpoints: Record<string, any>;
}>;
/**
 * A Slideshow for cycling images in confined spaces
 * @displayName Carousel
 * @example ./examples/Carousel.md
 * @style _carousel.scss
 */
export default _default;

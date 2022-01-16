declare const _default: import("vue").DefineComponent<{
    propsNotification: ObjectConstructor;
    noticeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    noticePositionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, unknown, {}, {
    rootClasses(): any[];
    positionClasses(position: any): any[];
    timeoutCallback(): any;
}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}> | {
    props: {
        type: {
            type: StringConstructor;
        };
        message: (ArrayConstructor | StringConstructor)[];
        duration: {
            type: NumberConstructor;
            default: any;
        };
        queue: {
            type: BooleanConstructor;
            default: any;
        };
        indefinite: {
            type: BooleanConstructor;
            default: boolean;
        };
        position: {
            type: StringConstructor;
            default: string;
            validator(value: any): boolean;
        };
        container: {
            type: StringConstructor;
            default: any;
        };
        onClose: {
            type: FunctionConstructor;
            default: () => void;
        };
    };
    data(): {
        isActive: boolean;
        parentTop: any;
        parentBottom: any;
        newDuration: any;
        newContainer: any;
    };
    computed: {
        correctParent(): any;
        transition(): {
            enter: string;
            leave: string;
        };
    };
    methods: {
        shouldQueue(): boolean;
        close(): void;
        showNotice(): void;
        setupContainer(): void;
        timeoutCallback(): any;
    };
    beforeMount(): void;
    mounted(): void;
}, import("vue").ComponentOptionsMixin, ("close" | "update:active")[], "close" | "update:active", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    propsNotification?: Record<string, any>;
    noticeClass?: string | Function | unknown[];
    noticePositionClass?: string | Function | unknown[];
}>, {}>;
/**
 * @displayName Notification Notice
 */
export default _default;

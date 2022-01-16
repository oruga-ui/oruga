declare const _default: {
    name: string;
    configField: string;
    mixins: (import("vue").DefineComponent<{
        override: BooleanConstructor;
    }, unknown, unknown, {}, {
        computedClass(field: string, defaultValue: string, suffix?: string): string;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
        override?: boolean;
    }>, {}> | {
        components: {
            [x: string]: import("vue").DefineComponent<{
                variant: (ObjectConstructor | StringConstructor)[];
                component: StringConstructor;
                pack: StringConstructor;
                icon: StringConstructor;
                size: StringConstructor;
                customSize: StringConstructor;
                customClass: StringConstructor;
                clickable: BooleanConstructor;
                spin: BooleanConstructor;
                rotation: (StringConstructor | NumberConstructor)[]; /** Events to be binded to the injected component */
                both: BooleanConstructor;
                rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
                clickableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
                spinClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
                sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
                variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
            }, unknown, unknown, {
                rootClasses(): any[];
                rootStyle(): {};
                iconConfig(): any;
                iconPrefix(): any;
                newIcon(): string;
                newPack(): any;
                newVariant(): string;
                newCustomSize(): any;
                customSizeByPack(): any;
                useIconComponent(): any;
            }, {
                getEquivalentIconOf(value: any): any;
            }, import("vue").DefineComponent<{
                override: BooleanConstructor;
            }, unknown, unknown, {}, {
                computedClass(field: string, defaultValue: string, suffix?: string): string;
            }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
                override?: boolean;
            }>, {}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
                icon?: string;
                variant?: unknown;
                component?: string;
                pack?: string;
                size?: string;
                customSize?: string;
                customClass?: string;
                clickable?: boolean;
                spin?: boolean;
                rotation?: string | number;
                both?: boolean;
                rootClass?: string | Function | unknown[];
                clickableClass?: string | Function | unknown[];
                spinClass?: string | Function | unknown[];
                sizeClass?: string | Function | unknown[];
                variantClass?: string | Function | unknown[];
            }>, {}>;
        };
        props: {
            active: {
                type: BooleanConstructor;
                default: boolean;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            message: StringConstructor;
            type: StringConstructor;
            hasIcon: BooleanConstructor;
            icon: StringConstructor;
            iconPack: StringConstructor;
            iconSize: {
                type: StringConstructor;
                default: string;
            };
            autoClose: {
                type: BooleanConstructor; /**
                 * Size of close icon
                 */
                default: boolean;
            };
            duration: {
                type: NumberConstructor;
                default: number;
            };
        };
        data(): {
            isActive: any;
        };
        watch: {
            active(value: any): void;
            isActive(value: any): void;
        };
        computed: {
            computedIcon(): any;
        };
        methods: {
            close(): void;
            setAutoClose(): void;
        };
        mounted(): void;
    })[];
    emits: string[];
    props: {
        /**
        * Which position the notification will appear when programmatically
        * @values top-right, top, top-left, bottom-right, bottom, bottom-left
        */
        position: StringConstructor;
        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: (ObjectConstructor | StringConstructor)[];
        /**
         * Label for the close button, to be read by accessibility screenreaders.
         */
        ariaCloseLabel: StringConstructor;
        /**
         * Size of close icon
         */
        closeIconSize: {
            type: StringConstructor;
            default: string;
        };
        /**
         * Custom animation (transition name).
         */
        animation: {
            type: StringConstructor;
            default: string;
        };
        /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
        component: (ObjectConstructor | FunctionConstructor)[];
        /** Props to be binded to the injected component */
        props: ObjectConstructor;
        /** Events to be binded to the injected component */
        events: {
            type: ObjectConstructor;
            default: {};
        };
        /** Close icon name */
        closeIcon: {
            type: StringConstructor;
            default: () => any;
        };
        rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
        closeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
        contentClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
        iconClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
        positionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
        variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
        wrapperClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    };
    computed: {
        rootClasses(): any[];
        wrapperClasses(): any[];
        iconClasses(): any[];
        contentClasses(): any[];
        closeClasses(): any[];
    };
};
/**
 * Bold notification blocks to alert your users of something
 * @displayName Notification
 * @requires ./NotificationNotice.vue
 * @example ./examples/Notification.md
 * @style _notification.scss
 */
export default _default;

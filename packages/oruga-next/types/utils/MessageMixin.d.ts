declare const _default: {
    components: {
        [x: string]: import("vue").DefineComponent<{
            variant: (ObjectConstructor | StringConstructor)[];
            component: StringConstructor;
            /** Icon name to use with has-icon. */
            pack: StringConstructor; /** Icon size */
            icon: StringConstructor;
            size: StringConstructor;
            customSize: StringConstructor;
            customClass: StringConstructor;
            clickable: BooleanConstructor;
            spin: BooleanConstructor;
            rotation: (StringConstructor | NumberConstructor)[]; /**
             * Icon name (MDI) based on type.
             */
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
        /** Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        /** Adds an 'X' button that closes the notification. */
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        /** Message text (can contain HTML). */
        message: StringConstructor;
        /** Type (color) of the notification, optional. */
        type: StringConstructor;
        /** Adds an icon on the left side depending on the type (or the icon prop if defined). */
        hasIcon: BooleanConstructor;
        /** Icon name to use with has-icon. */
        icon: StringConstructor;
        /** Icon pack to use. */
        iconPack: StringConstructor;
        /** Icon size */
        iconSize: {
            type: StringConstructor;
            default: string;
        };
        /** Hide notification after duration only not programmatic. */
        autoClose: {
            type: BooleanConstructor;
            default: boolean;
        };
        /** Visibility duration in miliseconds. */
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
        /**
         * Icon name (MDI) based on type.
         */
        computedIcon(): any;
    };
    methods: {
        /**
         * Close the Message and emit events.
         */
        close(): void;
        /**
         * Set timer to auto close message
         */
        setAutoClose(): void;
    };
    mounted(): void;
};
export default _default;

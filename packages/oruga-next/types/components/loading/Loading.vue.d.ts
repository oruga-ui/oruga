declare const _default: import("vue").DefineComponent<{
    /** Whether modal is active or not,  use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
    active: BooleanConstructor;
    programmatic: BooleanConstructor;
    container: (ObjectConstructor | FunctionConstructor | {
        new (): HTMLElement;
        prototype: HTMLElement;
    })[];
    /** Loader will overlay the full page */
    fullPage: {
        type: BooleanConstructor;
        default: boolean;
    };
    animation: {
        type: StringConstructor;
        default: () => any;
    };
    /** Can close Loading by pressing escape or clicking outside */
    canCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Callback function to call after user canceled (pressed escape / clicked outside) */
    onCancel: {
        type: FunctionConstructor;
        default: () => void;
    };
    /** Icon name */
    icon: {
        type: StringConstructor;
        default: () => any;
    };
    /** Enable spin effect on icon */
    iconSpin: {
        type: BooleanConstructor;
        default: boolean;
    };
    iconSize: {
        type: StringConstructor;
        default: string;
    };
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    overlayClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    fullPageClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    isActive: boolean;
    displayInFullPage: boolean;
}, {
    rootClasses(): any[];
    overlayClasses(): any[];
    iconClasses(): any[];
}, {
    /**
    * Close the Modal if canCancel.
    */
    cancel(): void;
    /**
    * Emit events, and destroy modal if it's programmatic.
    */
    close(): void;
    /**
    * Keypress event that is bound to the document.
    */
    keyPress({ key }: {
        key: any;
    }): void;
}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}>, import("vue").ComponentOptionsMixin, ("close" | "update:active" | "update:full-page")[], "close" | "update:active" | "update:full-page", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    icon: string;
    animation: string;
    iconSize: string;
    fullPage: boolean;
    canCancel: boolean;
    onCancel: Function;
    iconSpin: boolean;
} & {
    rootClass?: string | Function | unknown[];
    iconClass?: string | Function | unknown[];
    overlayClass?: string | Function | unknown[];
    active?: boolean;
    programmatic?: boolean;
    container?: unknown;
    fullPageClass?: string | Function | unknown[];
}>, {
    icon: string;
    animation: string;
    iconSize: string;
    fullPage: boolean;
    canCancel: boolean;
    onCancel: Function;
    iconSpin: boolean;
}>;
/**
 * A simple loading overlay
 * @displayName Loading
 * @example ./examples/Loading.md
 * @style _loading.scss
 */
export default _default;

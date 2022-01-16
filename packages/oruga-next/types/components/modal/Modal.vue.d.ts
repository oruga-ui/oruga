declare const _default: import("vue").DefineComponent<{
    /** Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
    active: BooleanConstructor;
    /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
    component: (ObjectConstructor | FunctionConstructor)[];
    /** Text content */
    content: StringConstructor;
    programmatic: BooleanConstructor;
    /** Props to be binded to the injected component */
    props: ObjectConstructor;
    /** Events to be binded to the injected component */
    events: ObjectConstructor;
    /** Width of the Modal */
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: () => any;
    };
    /** Enable custom style on modal content */
    custom: BooleanConstructor;
    /** Custom animation (transition name) */
    animation: {
        type: StringConstructor;
        default: () => any;
    };
    /**
     * Can close Modal by clicking 'X', pressing escape or clicking outside
     * @values escape, x, outside, button
     */
    canCancel: {
        type: (ArrayConstructor | BooleanConstructor)[];
        default: () => any;
    };
    /** Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside) */
    onCancel: {
        type: FunctionConstructor;
        default: () => void;
    };
    /** Callback function to call after close (programmatically close or user canceled) */
    onClose: {
        type: FunctionConstructor;
        default: () => void;
    };
    /**
     * clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts
     * @values keep, clip
     */
    scroll: {
        type: StringConstructor;
        default: () => any;
    };
    /** Display modal as full screen */
    fullScreen: BooleanConstructor;
    /** Trap focus inside the modal. */
    trapFocus: {
        type: BooleanConstructor;
        default: () => any;
    };
    ariaRole: {
        type: StringConstructor;
        validator: (value: string) => boolean;
    };
    ariaModal: BooleanConstructor;
    ariaLabel: StringConstructor;
    /** Destroy modal on hide */
    destroyOnHide: {
        type: BooleanConstructor;
        default: () => any;
    };
    /** Automatically focus modal when active */
    autoFocus: {
        type: BooleanConstructor;
        default: () => any;
    };
    /** Icon name */
    closeIcon: {
        type: StringConstructor;
        default: () => any;
    };
    closeIconSize: {
        type: StringConstructor;
        default: string;
    };
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    overlayClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    contentClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    closeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    fullScreenClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    mobileClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    isActive: boolean;
    savedScrollTop: any;
    newWidth: string | number;
    animating: boolean;
    destroyed: boolean;
}, {
    rootClasses(): any[];
    overlayClasses(): any[];
    contentClasses(): {
        [x: number]: any;
    }[];
    closeClasses(): any[];
    cancelOptions(): any;
    showX(): boolean;
    customStyle(): {
        maxWidth: any;
    };
}, {
    handleScroll(): void;
    /**
    * Close the Modal if canCancel and call the onCancel prop (function).
    */
    cancel(method: any): void;
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
    /**
    * Transition after-enter hook
    */
    afterEnter(): void;
    /**
    * Transition before-leave hook
    */
    beforeLeave(): void;
}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}> | import("vue").DefineComponent<{
    mobileBreakpoint: StringConstructor;
}, unknown, {
    $matchMediaRef: any;
    isMatchMedia: any;
}, {}, {
    onMatchMedia(event: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    mobileBreakpoint?: string;
}>, {}>, import("vue").ComponentOptionsMixin, ("close" | "update:active")[], "close" | "update:active", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    animation: string;
    scroll: string;
    trapFocus: boolean;
    closeIcon: string;
    canCancel: boolean | unknown[];
    onCancel: Function;
    width: string | number;
    onClose: Function;
    destroyOnHide: boolean;
    autoFocus: boolean;
    closeIconSize: string;
} & {
    component?: unknown;
    rootClass?: string | Function | unknown[];
    overlayClass?: string | Function | unknown[];
    contentClass?: string | Function | unknown[];
    mobileClass?: string | Function | unknown[];
    events?: Record<string, any>;
    ariaRole?: string;
    closeClass?: string | Function | unknown[];
    active?: boolean;
    programmatic?: boolean;
    content?: string;
    props?: Record<string, any>;
    custom?: boolean;
    fullScreen?: boolean;
    ariaModal?: boolean;
    ariaLabel?: string;
    fullScreenClass?: string | Function | unknown[];
}>, {
    animation: string;
    scroll: string;
    trapFocus: boolean;
    closeIcon: string;
    canCancel: boolean | unknown[];
    onCancel: Function;
    width: string | number;
    onClose: Function;
    destroyOnHide: boolean;
    autoFocus: boolean;
    closeIconSize: string;
}>;
/**
 * Classic modal overlay to include any content you may need
 * @displayName Modal
 * @example ./examples/Modal.md
 * @style _modal.scss
 */
export default _default;

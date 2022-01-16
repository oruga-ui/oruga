declare const _default: import("vue").DefineComponent<{
    /**
     * 	Color of the icon, optional
     *  @values primary, info, success, warning, danger, and any other custom color
     */
    variant: (ObjectConstructor | StringConstructor)[];
    /**
     * Icon component name
     */
    component: StringConstructor;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    pack: StringConstructor;
    /**
     * Icon name
     */
    icon: StringConstructor;
    /**
     * Icon size, optional
     * @values small, medium, large
     */
    size: StringConstructor;
    /**
     * Overrides icon font size, optional
     * @values Depends on library: null (smallest), fa-lg, fa-2x, fa-3x, fa-4x, fa-5x, mdi-18px, mdi-24px, mdi-36px, mdi-48px
     */
    customSize: StringConstructor;
    /**
     * Add class to icon font, optional. See here for MDI, here for FontAwesome 4 and here for FontAwesome 5 custom classes
     */
    customClass: StringConstructor;
    /**
     * When true makes icon clickable
     */
    clickable: BooleanConstructor;
    /** Enable spin effect on icon */
    spin: BooleanConstructor;
    /** Rotation 0-360 */
    rotation: (StringConstructor | NumberConstructor)[];
    /** @ignore */
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
    /**
    * Internal icon name based on the pack.
    * If pack is 'fa', gets the equivalent FA icon name of the MDI,
    * internal icons are always MDI.
    */
    newIcon(): string;
    newPack(): any;
    newVariant(): string;
    newCustomSize(): any;
    customSizeByPack(): any;
    useIconComponent(): any;
}, {
    /**
    * Equivalent icon name of the MDI.
    */
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
/**
 * Icons take an important role of any application
 * @displayName Icon
 * @example ./examples/Icon.md
 * @style _icon.scss
 */
export default _default;

declare const _default: import("vue").DefineComponent<{
    currentSortColumn: ObjectConstructor;
    columns: ArrayConstructor;
    placeholder: StringConstructor;
    iconPack: StringConstructor;
    sortIcon: {
        type: StringConstructor;
        default: string;
    };
    sortIconSize: {
        type: StringConstructor;
        default: string;
    };
    isAsc: BooleanConstructor;
}, unknown, {
    mobileSort: any;
    defaultEvent: {
        shiftKey: boolean;
        altKey: boolean;
        ctrlKey: boolean;
    };
    ignoreSort: boolean;
}, {
    showPlaceholder(): boolean;
    sortableColumns(): any;
    isCurrentSort(): boolean;
}, {
    sort(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "sort"[], "sort", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    sortIcon: string;
    sortIconSize: string;
} & {
    iconPack?: string;
    placeholder?: string;
    currentSortColumn?: Record<string, any>;
    columns?: unknown[];
    isAsc?: boolean;
}>, {
    sortIcon: string;
    sortIconSize: string;
}>;
export default _default;

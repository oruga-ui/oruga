export type ThemeConfig = {
    label: string;
    key: string;
    path: string;
    git: string;
    src: string;
    cdn: string;
};

export type InspectData<T = object> = {
    [K in keyof Required<T>]: InspectClassDescription<T, K>;
};

export type InspectClassDescription<T = object, C extends keyof T = keyof T> = {
    /** class name */
    class: C;
    /** class description */
    description: string;
    /** needs subitem to be shown */
    subitem?: string;
    /** info message */
    info?: string;
    /**
     * @deprecated
     * related class which is needed to be shown
     */
    specificity?: string;
    /** properties related by the class */
    properties?: string[];
    /** suffixes the class can have */
    suffixes?: string[];
    /** disables the inspect button */
    nospec?: boolean;
    /** related component name */
    relatedComponent?: string;
    /** related class of another component */
    relatedClass?: string;
    /** function which get called on inspect button clicked */
    action?: (cmp: HTMLElement, data: any) => void;
};

export type InspectClass = {
    className: string;
    action?: (cmp: HTMLElement, data: unknown) => void;
};

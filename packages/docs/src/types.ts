export type InspectData<
    T extends object = object,
    P extends object = object,
> = {
    [K in keyof Required<T>]: InspectClassDescription<T, K, P>;
};

export type InspectClassDescription<
    T = object,
    C extends keyof T = keyof T,
    P extends object = object,
> = {
    /** class name */
    class: C;
    /** class description */
    description: string;
    /** needs subitem to be shown */
    subitem?: string;
    /** info message */
    info?: string;
    /** properties related by the class */
    properties?: (keyof P)[];
    /** suffixes the class can have */
    suffixes?: string[];
    /** disables the inspect button */
    nospec?: boolean;
    /** show deprecation warning */
    deprecated?: true | string;
    /** related component name */
    relatedComponent?: string;
    /** related class of another component */
    relatedClass?: string;
    /** function which get called on inspect button clicked */
    action?: (data: P) => void;
};

export type InspectClass<P extends object = object> = {
    className: string;
    action?: (data: P) => void;
};

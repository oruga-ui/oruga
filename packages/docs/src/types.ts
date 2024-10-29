export type InspectData<T = object> = {
    [K in keyof Required<T>]: InspectClassDescription<T, K>;
};

export type InspectClassDescription<T = object, c extends keyof T = keyof T> = {
    /** classn name */
    class: c;
    /** class description */
    description: string;
    /** needs subitems to be shown */
    subitem?: boolean;
    /** warning message */
    warning?: string;
    /** related class which is needed to be shown  */
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

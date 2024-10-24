export type DropdownComponent<T extends string | number | object> = {
    disabled: boolean;
    multiple: boolean;
    selected: T | T[] | undefined;
    selectItem: (value: T) => void;
};

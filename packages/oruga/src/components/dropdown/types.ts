export type DropdownComponent<T> = {
    disabled: boolean;
    multiple: boolean;
    selected: T | T[] | undefined;
    selectItem: (value: T) => void;
};

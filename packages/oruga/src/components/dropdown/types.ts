import type { ProviderItem } from "@/composables";

export type DropdownComponent<T> = {
    menuId: string;
    disabled: boolean;
    multiple: boolean;
    selectable: boolean;
    selected: T | T[] | undefined;
    focsuedIdentifier: string | undefined;
    selectItem: (value: DropdownChildItem<T>, event: Event) => void;
    focusItem: (value: DropdownChildItem<T>) => void;
};

export type DropdownItemComponent<T> = {
    value: T;
    label: string;
    isHidden: boolean;
    isViable: boolean;
    setHidden: (hidden: boolean) => void;
    matches: (value: string) => boolean;
    selectItem: (event: Event) => void;
};

export type DropdownChildItem<T> = ProviderItem<DropdownItemComponent<T>>;

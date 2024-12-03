import type { ProviderItem } from "@/composables";

export type DropdownComponent<T> = {
    disabled: boolean;
    multiple: boolean;
    menuId: string;
    selected: T | T[] | undefined;
    selectItem: (value: ProviderItem<DropdownItemComponent<T>>) => void;
};

export type DropdownItemComponent<T> = {
    value: string | T;
    clickable: boolean;
};

import type { ProviderItem } from "@/composables";
import type { DropdownItemProps } from "./props";

export type DropdownComponent<T> = {
    disabled: boolean;
    multiple: boolean;
    menuId: string;
    selected: T | T[] | undefined;
    focsuedIdentifier: string | undefined;
    selectItem: (value: T, event: Event) => void;
};

export type DropdownItemComponent<T> = DropdownItemProps<T> & {
    $el: Element | null;
    selectItem: (event: Event) => void;
};

export type DropdownChildItem<T> = ProviderItem<DropdownItemComponent<T>>;

// export type DropdownItem<T> = Omit<ProviderItem, "data"> &
//     DropdownItemComponent<T>;

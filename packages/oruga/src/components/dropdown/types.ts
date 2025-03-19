import type { ProviderItem } from "@/composables";
import type { DropdownItemProps } from "./props";

export type DropdownComponent<T> = {
    disabled: boolean;
    multiple: boolean;
    selectable: boolean;
    menuId: string;
    selected: T | T[] | undefined;
    focsuedIdentifier: string | undefined;
    selectItem: (value: DropdownChildItem<T>, event: Event) => void;
    focusItem: (value: DropdownChildItem<T>) => void;
};

export type DropdownItemComponent<T> = DropdownItemProps<T> & {
    $el: Element | null;
    selectItem: (event: Event) => void;
};

export type DropdownChildItem<T> = ProviderItem<DropdownItemComponent<T>>;

import type { ProviderItem } from "@/composables";
import type { DynamicComponent } from "@/types";

export type DropdownComponent<T> = {
    menuId: string;
    itemTag: DynamicComponent;
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
    isViable: boolean;
    setHidden: (hidden: boolean) => void;
    selectItem: (event: Event) => void;
};

export type DropdownChildItem<T> = ProviderItem<DropdownItemComponent<T>>;

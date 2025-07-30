import type { ProviderItem } from "@/composables";
import type { ListboxItemProps } from "./props";

export type ListboxComponent<T> = {
    id: string;
    disabled: boolean;
    multiple: boolean;
    selectable: boolean;
    selected: T | T[] | undefined;
    focsuedIdentifier: string | undefined;
    selectItem: (value: ListboxChildItem<T>, event: Event) => void;
    focusItem: (value: ListboxChildItem<T>) => void;
};

export type ListboxItemComponent<T> = ListboxItemProps<T> & {
    selectItem: (event: Event) => void;
};

export type ListboxChildItem<T> = ProviderItem<ListboxItemComponent<T>>;

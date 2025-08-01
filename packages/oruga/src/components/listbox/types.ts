import type { ProviderItem } from "@/composables";
import type { ListItemProps } from "./props";

export type ListboxComponent<T> = {
    id: string;
    disabled: boolean;
    multiple: boolean;
    selectable: boolean;
    selected: T | T[] | undefined;
    focsuedIdentifier: string | undefined;
    selectItem: (value: ListItem<T>, selection: boolean) => void;
    focusItem: (value: ListItem<T>) => void;
};

export type ListItemComponent<T> = ListItemProps<T> & {
    clickItem: (event: Event) => void;
};

export type ListItem<T> = ProviderItem<ListItemComponent<T>>;

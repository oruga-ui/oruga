import type { ProviderItem } from "@/composables";
import type { ListItemProps } from "./props";

export type ListboxComponent<T> = {
    id: string;
    disabled: boolean;
    multiple: boolean;
    selectable: boolean;
    // checkable: boolean;
    selected: T | T[] | undefined;
    focsuedItem: ListItem<T> | undefined;
    selectItem: (value: ListItem<T>, selection: boolean) => void;
    focusItem: (value: ListItem<T>) => void;
};

export type ListItemComponent<T> = Pick<
    ListItemProps<T>,
    "value" | "hidden"
> & {
    isViable: boolean;
    setHidden: (hidden: boolean) => void;
    matches: (value: string) => boolean;
};

export type ListItem<T> = ProviderItem<ListItemComponent<T>>;

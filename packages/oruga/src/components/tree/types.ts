import type { Indexer, ProviderItem } from "@/composables";
import type { TreeItemProps } from "./props";

export type TreeComponent<T> = {
    id: string;
    disabled: boolean;
    multiple: boolean;
    collapsable: boolean;
    checkable: boolean;
    selectable: boolean;
    selected: T | T[] | undefined;
    focsuedItem: TreeItem<T> | undefined;
    toggleIcon: string;
    iconPack: string;
    iconSize: string;
    filterActive: boolean;
    indexer: Indexer;
    selectItem: (value: TreeItem<T>, selection: boolean) => void;
    focusItem: (value: TreeItem<T>) => void;
};

export type TreeItemComponent<T> = Required<
    Pick<TreeItemProps<T>, "value" | "expanded" | "label">
> & {
    children: TreeItem<T>[];
    hasChildren: boolean;
    isViable: boolean;
    setExpand: (state: boolean) => void;
    setHidden: (state: boolean) => void;
};

export type TreeItem<T> = ProviderItem<TreeItemComponent<T>>;

export type SubtreeComponent = {
    expanded: boolean;
};

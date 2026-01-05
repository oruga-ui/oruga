import type { ProviderItem } from "@/composables";
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
    nextSequence: () => string;
    selectItem: (value: TreeItem<T>, selection: boolean) => void;
    focusItem: (value: TreeItem<T>) => void;
    // resetSelection: (
    //     excludedItems?: ProviderItem<TreeItemComponent<T>>[],
    // ) => void;
};

export type TreeItemComponent<T> = Pick<
    TreeItemProps<T>,
    "value" | "hidden" | "expanded"
> & {
    hasChildren: boolean;
    isViable: boolean;
    setExpand: (state: boolean) => void;
    // reset: () => void;
    matches: (value: string) => boolean;
};

export type TreeItem<T> = ProviderItem<TreeItemComponent<T>>;

// export type SubtreeComponent = {
//     // expanded: boolean;
//     // setExpand: (state: boolean) => void;
//     // bubbleReset: (childs?: ProviderItem<TreeItemComponent<T>>[]) => void;
// };

export type SubtreeItemComponent = {
    setHidden: (state: boolean) => void;
};

import type { ProviderItem } from "@/composables";
import type { MenuItemProps } from "./props";

export type MenuComponent<T> = {
    focsuedIdentifier: string | undefined;
    accordion: boolean;
    role: string;
    menuId: string;
    nextSequence: () => string;
    selectItem: (value: ProviderItem<MenuItemComponent<T>> | undefined) => void;
    resetMenu: (excludedItems?: ProviderItem<MenuItemComponent<T>>[]) => void;
};

export type MenuItemComponent<T> = MenuItemProps<T> & {
    parent: MenuItemProvider<T> | undefined;
    hasChildren: boolean;
    expanded: boolean;
    reset: () => void;
    setExpand: (state: boolean) => void;
    selectItem: (event: Event) => void;
};

export type MenuItemProvider<T> = {
    expanded: boolean;
    setExpand: (state: boolean) => void;
    triggerReset: (childs?: ProviderItem<MenuItemComponent<T>>[]) => void;
};

export type MenuChildItem<T> = ProviderItem<MenuItemComponent<T>>;

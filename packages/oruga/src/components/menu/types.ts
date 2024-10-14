import type { ProviderItem } from "@/composables";

export type MenuComponent = {
    activable: boolean;
    accordion: boolean;
    resetMenu: (excludedItems?: ProviderItem<MenuItemComponent>[]) => void;
};

export type MenuItemComponent = {
    reset: () => void;
};

export type MenuItemProvider = {
    triggerReset: (child?: ProviderItem<MenuItemComponent>) => void;
};

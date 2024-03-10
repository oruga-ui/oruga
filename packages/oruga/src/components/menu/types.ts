import type { ProviderItem } from "@/composables";

export type MenuComponent = {
    activable: boolean;
    accordion: boolean;
    resetMenu: (excludedItems?: ProviderItem[]) => void;
};

export type MenuItemComponent = {
    reset: () => void;
};

export type MenuItemProvider = {
    triggerReset: (child?: ProviderItem) => void;
};

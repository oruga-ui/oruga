import type { Component, Slots } from "vue";
import type { ProviderItem } from "@/composables";
import type { ClassBind } from "@/types";

import type { TabItemProps } from "./props";

export type TabsComponent = {
    activeIndex: number;
    type: string;
    vertical: boolean;
    animated: boolean;
    animation: string[];
    animateInitially: boolean;
    destroyOnHide: boolean;
};

export type TabItemComponent<T> = TabItemProps<T, Component> & {
    $slots: Slots;
    navClasses: ClassBind[];
    tabClasses: ClassBind[];
    iconClasses: ClassBind[];
    labelClasses: ClassBind[];
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type TabItem<T> = Omit<ProviderItem, "data"> & TabItemComponent<T>;

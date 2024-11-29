import type { Component, Slots } from "vue";
import type { ProviderItem } from "@/composables";
import type { ClassBind } from "@/types";

import type { TabItemProps } from "./props";

export type TabItemComponent<T> = TabItemProps<T, Component> & {
    $slots: Slots;
    tabClasses: ClassBind[];
    iconClasses: ClassBind[];
    labelClasses: ClassBind[];
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type TabsComponent = {
    activeIndex: number;
    type: string;
    vertical: boolean;
    animated: boolean;
    animation: string[];
    animateInitially: boolean;
    destroyOnHide: boolean;
};

export type TabItem<T> = Omit<ProviderItem<T>, "data"> & TabItemComponent<T>;

import type { Component, Slots } from "vue";
import type { ProviderItem } from "@/composables";
import type { ClassBinding } from "@/types";

import type { TabItemProps } from "./props";

export type TabsComponent = {
    activeIndex: number;
    type: string;
    vertical: boolean;
    animated: boolean;
    animation: string[];
    animateInitially: boolean;
};

export type TabItemComponent<T> = TabItemProps<T, Component> & {
    $slots: Slots;
    tabClasses: ClassBinding[];
    iconClasses: ClassBinding[];
    labelClasses: ClassBinding[];
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type TabItem<T> = Omit<ProviderItem<T>, "data"> & TabItemComponent<T>;

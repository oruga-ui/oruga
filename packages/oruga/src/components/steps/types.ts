import type { Component, Slots } from "vue";
import type { ProviderItem } from "@/composables";
import type { ClassBind } from "@/types";

import type { StepItemProps } from "./props";

export type StepsComponent = {
    activeIndex: number;
    labelPosition: string;
    vertical: boolean;
    animated: boolean;
    animation: string[];
    animateInitially: boolean;
    variant: string;
};

export type StepItemComponent<T> = StepItemProps<T, Component> & {
    $slots: Slots;
    navClasses: ClassBind[];
    stepClasses: ClassBind[];
    iconClasses: ClassBind[];
    labelClasses: ClassBind[];
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type StepItem<T> = Omit<ProviderItem, "data"> & StepItemComponent<T>;

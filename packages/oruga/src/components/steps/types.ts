import type { Component, Slots } from "vue";
import type { ProviderItem } from "@/composables";
import type { ClassBind } from "@/types";

import type { StepItemProps } from "./props";

export type StepItemComponent<T> = StepItemProps<T, Component> & {
    $slots: Slots;
    navClasses: ClassBind[];
    classes: ClassBind[];
    iconClasses: ClassBind[];
    labelClasses: ClassBind[];
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type StepsComponent = {
    activeIndex: number;
    labelPosition: string;
    vertical: boolean;
    animated: boolean;
    animation: string[];
    animateInitially: boolean;
    destroyOnHide: boolean;
    variant: string;
};

export type StepItem<T> = Omit<ProviderItem<T>, "data"> & StepItemComponent<T>;

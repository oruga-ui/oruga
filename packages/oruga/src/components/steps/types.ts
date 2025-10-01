import type { Component, Slots } from "vue";
import type { ProviderItem } from "@/composables";
import type { ClassBinding } from "@/types";

import type { StepItemProps } from "./props";

export type StepsComponent = {
    activeIndex: number;
    labelPosition: string;
    vertical: boolean;
    variant: string;
    animated: boolean;
    animation: string[];
    animateInitially: boolean;
};

export type StepItemComponent<T> = Pick<
    StepItemProps<T, Component>,
    "value" | "label" | "step" | "disabled" | "visible" | "icon" | "iconPack"
> & {
    $slots: Slots;
    stepClasses: ClassBinding[];
    iconClasses: ClassBinding[];
    labelClasses: ClassBinding[];
    isClickable: boolean;
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type StepItem<T> = ProviderItem<StepItemComponent<T>>;

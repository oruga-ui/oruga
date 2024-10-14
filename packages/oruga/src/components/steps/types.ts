import type { Slots } from "vue";
import type {
    ComponentProps,
    ComponentSlots,
} from "vue-component-type-helpers";
import type { ProviderItem } from "@/composables";
import type { ClassBind } from "@/types";

import StepItem from "./StepItem.vue";

export type StepItemProps<T extends string | number | object> = ComponentProps<
    typeof StepItem<T>
>;

export type StepItemSlots<T extends string | number | object> = ComponentSlots<
    typeof StepItem<T>
>;

export type StepItemComponent<T extends string | number | object> =
    StepItemProps<T> & {
        $slots: Slots;
        isTransitioning: boolean;
        classes: ClassBind[];
        activate: (index: number) => void;
        deactivate: (index: number) => void;
    };

export type StepsComponent<T extends string | number | object> = {
    activeValue: T;
    activeIndex: number;
    vertical: boolean;
    animated: boolean;
    animation: string[];
    animateInitially: boolean;
    destroyOnHide: boolean;
    variant: string;
};

export type StepItem<T extends string | number | object> = Omit<
    ProviderItem,
    "data"
> &
    StepItemComponent<T>;

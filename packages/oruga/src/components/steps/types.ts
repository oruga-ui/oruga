import type {
    ComponentProps,
    ComponentSlots,
} from "vue-component-type-helpers";
import type { ProviderItem } from "@/composables";
import type { ClassBind } from "@/types";

import StepItem from "./StepItem.vue";

export type StepItemProps = ComponentProps<typeof StepItem>;

export type StepItemSlots = ComponentSlots<typeof StepItem>;

export type StepItemComponent = StepItemProps & {
    $slots: StepItemSlots;
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

export type StepItem = Omit<ProviderItem, "data"> & StepItemComponent;

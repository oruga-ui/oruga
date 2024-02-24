import type {
    ComponentProps,
    ComponentSlots,
} from "vue-component-type-helpers";
import type { ProviderItem } from "@/composables";

import StepItem from "./StepItem.vue";

export type StepItemProps = ComponentProps<typeof StepItem>;

export type StepItemSlots = ComponentSlots<typeof StepItem>;

export type StepItemComponent = StepItemProps & {
    $slots: StepItemSlots;
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type StepsComponent = {
    activeId: string | number;
    vertical: boolean;
    animated: boolean;
    animation: string[];
    animateInitially: boolean;
};

export type StepItem = Omit<ProviderItem, "data"> & StepItemComponent;

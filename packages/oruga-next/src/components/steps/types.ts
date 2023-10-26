import type { ProviderItem } from "@/composables";
import StepItem from "./StepItem.vue";

export type StepItemProps = InstanceType<typeof StepItem>["$props"];

export type StepItemSlots = InstanceType<typeof StepItem>["$slots"];

export type StepItemComponent = StepItemProps & {
    $slots: StepItemSlots;
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type StepsComponent = {
    activeId: string | number;
    vertical: boolean;
};

export type StepItem = Omit<ProviderItem, "data"> & StepItemComponent;

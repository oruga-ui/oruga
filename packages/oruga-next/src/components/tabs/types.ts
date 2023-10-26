import type { ProviderItem } from "@/composables";
import TabItem from "./TabItem.vue";
import type { BindProp } from "@/types";

export type TabItemProps = InstanceType<typeof TabItem>["$props"];

export type TabItemSlots = InstanceType<typeof TabItem>["$slots"];

export type TabItemComponent = TabItemProps & {
    $slots: TabItemSlots;
    headerIconClasses: BindProp;
    headerTextClasses: BindProp;
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type TabsComponent = {
    activeId: number;
    type: string;
    vertical: boolean;
};

export type TabItem = Omit<ProviderItem, "data"> & TabItemComponent;

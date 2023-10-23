import TabItem from "./TabItem.vue";
import type { BindProp } from "@/types";

export type TabItemProps = InstanceType<typeof TabItem>["$props"];

export type TabItemSlots = InstanceType<typeof TabItem>["$slots"];

export type TabItemComponent = TabItemProps & {
    $slots: TabItemSlots;
    headerClasses: BindProp;
    headerIconClasses: BindProp;
    headerTextClasses: BindProp;
    isActive: boolean;
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type TabsComponent = {
    activeIndex: number;
    type: string;
    vertical: boolean;
    setTransitioning: (value: boolean) => void;
};

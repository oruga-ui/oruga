import type {
    ComponentProps,
    ComponentSlots,
} from "vue-component-type-helpers";
import type { ProviderItem } from "@/composables";
import type { ClassBind } from "@/types";

import TabItem from "./TabItem.vue";

export type TabItemProps = ComponentProps<typeof TabItem>;

export type TabItemSlots = ComponentSlots<typeof TabItem>;

export type TabItemComponent = TabItemProps & {
    $slots: TabItemSlots;
    headerIconClasses: ClassBind[];
    headerTextClasses: ClassBind[];
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type TabsComponent = {
    activeId: number;
    type: string;
    vertical: boolean;
    animated: boolean;
    animation: string[];
    animateInitially: boolean;
};

export type TabItem = Omit<ProviderItem, "data"> & TabItemComponent;

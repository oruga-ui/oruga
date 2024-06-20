import type {
    ComponentProps,
    // ComponentSlots,
} from "vue-component-type-helpers";
import type { ProviderItem } from "@/composables";
import type { ClassBind } from "@/types";

import TabItem from "./TabItem.vue";

export type TabItemProps = ComponentProps<typeof TabItem>;

export type TabItemSlots = any; //ComponentSlots<typeof TabItem>; TODO: can be reentered with vue 3.5

export type TabItemComponent = TabItemProps & {
    $slots: TabItemSlots;
    headerIconClasses: ClassBind[];
    headerTextClasses: ClassBind[];
    isTransitioning: boolean;
    activate: (index: number) => void;
    deactivate: (index: number) => void;
};

export type TabsComponent<T extends string | number | object> = {
    activeValue: T;
    type: string;
    vertical: boolean;
    animated: boolean;
    animation: string[];
    animateInitially: boolean;
    destroyOnHide: boolean;
};

export type TabItem = Omit<ProviderItem, "data"> & TabItemComponent;

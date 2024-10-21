import type { Slots } from "vue";
import type {
    ComponentProps,
    ComponentSlots,
} from "vue-component-type-helpers";
import type { ProviderItem } from "@/composables";
import type { ClassBind } from "@/types";

import TabItem from "./TabItem.vue";

export type TabItemProps<T extends string | number | object> = ComponentProps<
    typeof TabItem<T>
>;

export type TabItemSlots<T extends string | number | object> = ComponentSlots<
    typeof TabItem<T>
>;

export type TabItemComponent<T extends string | number | object> =
    TabItemProps<T> & {
        $slots: Slots;
        classes: ClassBind[];
        iconClasses: ClassBind[];
        labelClasses: ClassBind[];
        isTransitioning: boolean;
        activate: (index: number) => void;
        deactivate: (index: number) => void;
    };

export type TabsComponent<T> = {
    activeValue: T;
    type: string;
    vertical: boolean;
    animated: boolean;
    animation: string[];
    animateInitially: boolean;
    destroyOnHide: boolean;
};

export type TabItem<T extends string | number | object> = Omit<
    ProviderItem<T>,
    "data"
> &
    TabItemComponent<T>;

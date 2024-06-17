import type { ComponentProps } from "vue-component-type-helpers";

import Dropdown from "./Dropdown.vue";

export type DropdownProps<T, B extends boolean> = ComponentProps<
    typeof Dropdown<T, B>
>;

export type DropdownComponent<T, B extends boolean = false> = {
    props: DropdownProps<T, B>;
    selected: T | T[];
    selectItem: (value: T) => void;
};

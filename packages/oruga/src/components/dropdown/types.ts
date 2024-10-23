import type { ComponentProps } from "vue-component-type-helpers";

import Dropdown from "./Dropdown.vue";

export type DropdownProps = ComponentProps<typeof Dropdown>;

export type DropdownComponent<T> = {
    props: DropdownProps;
    selected?: T | T[];
    selectItem: (value: T) => void;
};

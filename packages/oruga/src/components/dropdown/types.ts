import type { ComponentProps } from "vue-component-type-helpers";

import Dropdown from "./Dropdown.vue";

export type DropdownProps = ComponentProps<typeof Dropdown>;

export type DropdownComponent<T = unknown> = {
    props: DropdownProps;
    selected: T[];
    selectItem: (value: T) => void;
};

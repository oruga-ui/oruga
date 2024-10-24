import type { DropdownProps } from "./props";

export type DropdownComponent<
    T extends string | number | object,
    M extends boolean,
> = {
    props: DropdownProps<T, M>;
    selected?: T | T[];
    selectItem: (value: T) => void;
};

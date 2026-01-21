import type { ProviderItem } from "@/composables";
import type { DropdownItemProps } from "./props";

export type DropdownComponent<T> = {
  disabled: boolean;
  multiple: boolean;
  selectable: boolean;
  menuId: string;
  selected: T | T[] | undefined;
  focsuedIdentifier: string | undefined;
  selectItem: (value: DropdownChildItem<T>, event: Event) => void;
  focusItem: (value: DropdownChildItem<T>) => void;
};

export type DropdownItemComponent<T> = Pick<
  DropdownItemProps<T>,
    "value" | "disabled" | "hidden" | "clickable"
> & {
  selectItem: (event: Event) => void;
};

export type DropdownChildItem<T> = ProviderItem<DropdownItemComponent<T>>;

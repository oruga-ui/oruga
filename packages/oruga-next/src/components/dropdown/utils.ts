import { inject, provide, type ComputedRef } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import Dropdown from "./Dropdown.vue";

export type DropdownProps = Readonly<ComponentProps<typeof Dropdown>>;

export type DropdownData<T> = {
    props: DropdownProps;
    selected: T[] | T;
    selectItem: (value: T) => void;
};

/** provide/inject key */
const $dropdown = Symbol();

/** provide/inject type */
type ProvidedDropdownData<T> = ComputedRef<DropdownData<T>>;

/**
 * Provide field component data via dependency injection.
 * Provided data is a computed ref to enjure reactivity.
 */
export function provideDropdown<T>(data: ProvidedDropdownData<T>): void {
    provide<ProvidedDropdownData<T>>($dropdown, data);
}

/** Inject parent field component if used inside one. **/
export function injectDropdown<T>(): {
    dropdown: ProvidedDropdownData<T>;
} {
    const dropdown = inject<ProvidedDropdownData<T>>($dropdown, undefined);
    return { dropdown };
}

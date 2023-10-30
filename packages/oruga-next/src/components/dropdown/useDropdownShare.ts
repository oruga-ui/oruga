import { inject, provide, type ComputedRef } from "vue";
import Dropdown from "./Dropdown.vue";

export type DropdownProps = InstanceType<typeof Dropdown>["$props"];

type DropdownData<T> = {
    props: DropdownProps;
    selected: T[];
    selectItem: (value: T) => void;
};

/** provide/inject key */
const $dropdown = Symbol();

/** provide/inject type */
type ProvidedDropdown<T> = ComputedRef<DropdownData<T>>;

/**
 * Provide field component data via dependency injection.
 * Provided data is a computed ref to enjure reactivity.
 */
export function provideDropdown<T>(data: ProvidedDropdown<T>): void {
    provide<ProvidedDropdown<T>>($dropdown, data);
}

/** Inject parent field component if used inside one. **/
export function injectDropdown<T>() {
    const parentDropdown = inject<ProvidedDropdown<T>>($dropdown, undefined);
    return { parentDropdown };
}

<script setup lang="ts" generic="T">
import { useId, computed, useTemplateRef, ref } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import { isDefined, isEqual } from "@/utils/helpers";
import { defineClasses, useProviderChild } from "@/composables";

import type { ListboxComponent, ListItemComponent } from "./types";
import type { ListItemProps } from "./props";

/**
 * An option item used by the listbox component.
 * @displayName Listbox Item
 */
defineOptions({
  isOruga: true,
  name: "OListItem",
  configField: "listbox",
});

const props = withDefaults(defineProps<ListItemProps<T>>(), {
  override: undefined,
  // @ts-expect-error string is not assignable of generic type T
  value: () => useId(),
  label: undefined,
  disabled: false,
  hidden: false,
  icon: undefined,
  iconPack: () => getDefault("listbox.iconPack"),
  iconSize: () => getDefault("listbox.iconSize"),
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  parentKey: undefined,
});

const emits = defineEmits<{
  /**
   * onclick event
   * @param value {unknown} value prop data
   * @param event {event} native event
   */
  click: [value: T, event: Event];
}>();

defineSlots<{
  /**
   * Override the label, default is label prop
   * @param selected {boolean} - item is selected
   * @param disabled {boolean} - item is disabled
   */
  default?(props: { selected: boolean; disabled: boolean }): void;
}>();

const key = props.parentKey ?? "listbox";

const rootRef = useTemplateRef<HTMLElement>("rootElement");

// provided data is a computed ref to ensure reactivity
const providedData = computed<ListItemComponent<T>>(() => ({
  value: props.value,
  hidden: isHidden.value,
  isViable: isViable.value,
  setHidden,
  matches,
}));

/** inject functionalities and data from the parent component */
const { parent, item } = useProviderChild<
  ListboxComponent<T>,
  ListItemComponent<T>
>(rootRef, { key, data: providedData });

const localHidden = ref(false);
const isHidden = computed(() => props.hidden || localHidden.value);

function setHidden(hidden: boolean): void {
  localHidden.value = hidden;
}

/** Shows if the item is viable or not (not disabled or hidden). */
const isViable = computed(() => !isHidden.value && !props.disabled);

const isDisabled = computed(() => parent.value.disabled || props.disabled);

const isFocused = computed(
  () => item.value.identifier === parent.value.focsuedItem?.identifier,
);

/** Shows if the item is clickable or not. */
const isSelectable = computed(
  () => !isDisabled.value && parent.value.selectable,
);

const isSelected = computed(() => {
  if (!isDefined(parent.value.selected)) return false;
  if (parent.value.multiple && Array.isArray(parent.value.selected))
    return parent.value.selected.some((selected) =>
      isEqual(item.value.data.value, selected),
    );
  return isEqual(item.value.data.value, parent.value.selected);
});

/** Hover listener, set the item as focused element. */
function focusItem(): void {
  parent.value.focusItem(item.value);
}

/** Click listener, toggle the selection of the item. */
function clickItem(event: Event): void {
  if (!isSelectable.value) return;
  parent.value.selectItem(item.value, !isSelected.value);
  emits("click", props.value as T, event);
}

/** Check if a value matches the label (startsWith). */
function matches(value: string): boolean {
  return !!props.label?.toLowerCase().startsWith(value.toLowerCase());
}

// #region --- Computed Component Classes ---

const itmeClasses = defineClasses(
  ["itemClass", `o-${key}__item`],
  ["itemSelectableClass", `o-${key}__item--selectable`, null, isSelectable],
  ["itemSelectedClass", `o-${key}__item--selected`, null, isSelected],
  ["itemFocusedClass", `o-${key}__item--focused`, null, isFocused],
  ["itemDisabledClass", `o-${key}__item--disabled`, null, isDisabled],
);

// #endregion --- Computed Component Classes ---
</script>

<template>
  <li
    v-show="!isHidden"
    :id="`${parent.id}-${item.identifier}`"
    ref="rootElement"
    :data-oruga="`${key}-item`"
    :data-id="`${key}-${item.identifier}`"
    :class="itmeClasses"
    role="option"
    tabindex="-1"
    :aria-selected="
      parent.selectable && !parent.multiple ? isSelected : undefined
    "
    :aria-checked="
      parent.selectable && parent.multiple ? isSelected : undefined
    "
    :aria-hidden="isHidden"
    :aria-disabled="isDisabled"
    :aria-label="ariaLabel ?? label"
    :aria-labelledby="ariaLabelledby"
    @click.prevent="clickItem"
    @mouseenter="focusItem">
    <!-- TODO: add checkbox for checkable -->
    <slot :selected="isSelected" :disabled="isDisabled">
      <o-icon
        v-if="icon"
        :icon="icon"
        :pack="iconPack"
        :size="iconSize" />
      <span>{{ label }}</span>
    </slot>
  </li>
</template>

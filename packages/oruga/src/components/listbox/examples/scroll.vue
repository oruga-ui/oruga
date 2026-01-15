<script setup lang="ts">
import { ref } from "vue";
import type { OptionsPropItem } from "@oruga-ui/oruga-next";

const options = ref<OptionsPropItem<number>[]>(loadData(0));
const selectedValue = ref<number>();

function loadData(start: number): OptionsPropItem<number>[] {
  return Array.from({ length: start + 20 }, (_, i) => ({
    label: `Item #${i}`,
    value: i,
  }));
}

function getMoreData(): void {
  options.value = loadData(options.value.length);
}
</script>

<template>
  <section class="odocs-spaced">
    <o-listbox
      v-model="selectedValue"
      :options="options"
      @scroll-end="getMoreData" />

    <p><b>Selected:</b> {{ selectedValue }}</p>
  </section>
</template>

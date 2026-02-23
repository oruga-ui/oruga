<script setup lang="ts">
import { ref } from "vue";
import type { ListItemProps } from "@oruga-ui/oruga-next";

const options = ref<ListItemProps<number>[]>(loadData(0));
const selected = ref<number>();

function loadData(start: number): ListItemProps<number>[] {
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
            v-model="selected"
            :options="options"
            @scroll-end="getMoreData" />

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>

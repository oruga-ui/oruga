<script setup lang="ts" generic="T extends Record<string, unknown> | string">
import { type PropType } from "vue";

import ODropdown from "@/components/dropdown/Dropdown.vue";
import ODropdownItem from "@/components/dropdown/DropdownItem.vue";

defineProps({
    value: { type: [String, Object] as PropType<T>, default: undefined },
    values: { type: Array as PropType<T[]>, required: true },
    field: { type: String, default: undefined },
});

const emits = defineEmits(["change-item"]);

const vmodel = defineModel<T>("value");

function onChange(el: T): void {
    emits("change-item", el);
}
</script>

<template>
    <o-dropdown v-model="vmodel">
        <template #trigger="{ active }">
            <button class="trigger" :class="{ active }">trigger</button>
        </template>

        <o-dropdown-item
            v-for="el in values"
            :key="field ? el[field] : el"
            :value="el"
            class="text-break"
            @click="onChange(el)">
            {{ field ? el[field] : el }}
        </o-dropdown-item>
    </o-dropdown>
</template>

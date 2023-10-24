<script setup lang="ts">
import { usePropBinding } from "@/composables";
import OPagination from "../pagination/Pagination.vue";

defineOptions({
    isOruga: true,
    name: "OTablePagination",
    configField: "table",
});

const props = defineProps({
    current: { type: Number, default: undefined },
    paginated: { type: Boolean, default: false },
    rootClass: { type: [String, Array, Object], default: undefined },
});

const emits = defineEmits<{
    /**
     * current prop two-way binding
     * @param value {number} updated current prop
     */
    (e: "update:current", value: number): void;
    /**
     * on current change event
     * @param value {number} current value
     */
    (e: "change", event: number): void;
}>();

const currentPage = usePropBinding("current", props, emits);

/** Paginator change listener. */
function pageChanged(page: number): void {
    currentPage.value = page > 0 ? page : 1;
    emits("change", currentPage.value);
}
</script>

<template>
    <div :class="rootClass">
        <div>
            <slot />
        </div>
        <div>
            <o-pagination
                v-if="paginated"
                v-bind="$attrs"
                :current="currentPage"
                @change="pageChanged" />
        </div>
    </div>
</template>

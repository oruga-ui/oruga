<script setup lang="ts">
import { computed, type PropType } from "vue";

import type { ClassBind, DynamicComponent } from "@/types";

defineOptions({
    isOruga: true,
    name: "OPaginationButton",
    configField: "pagination",
});

const props = defineProps({
    number: { type: Number, default: undefined },
    isCurrent: { type: Boolean, default: false },
    click: {
        type: Function as PropType<(event: Event) => void>,
        required: true,
    },
    ariaLabel: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    tag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: "button" as DynamicComponent,
    },
    class: { type: Array as PropType<ClassBind[]>, default: () => [] },
    linkClass: {
        type: Array as PropType<ClassBind[]>,
        required: true,
    },
    linkCurrentClass: {
        type: Array as PropType<ClassBind[]>,
        required: true,
    },
});

// --- Computed Component Classes ---

const linkClasses = computed(() => [
    ...props.linkClass,
    ...props.class,
    ...(props.isCurrent ? props.linkCurrentClass : []),
]);
</script>

<template>
    <component
        :is="tag"
        role="button"
        :tabindex="disabled ? null : 0"
        :disabled="disabled"
        :class="linkClasses"
        v-bind="$attrs"
        :aria-label="ariaLabel"
        :aria-current="isCurrent"
        @click.prevent="click"
        @keydown.enter.prevent="click">
        <slot>{{ number }}</slot>
    </component>
</template>

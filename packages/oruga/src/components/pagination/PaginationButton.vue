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
    ariaLabel: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    tag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: "button" as DynamicComponent,
    },
    rootClass: { type: Array as PropType<ClassBind[]>, default: () => [] },
    linkClass: {
        type: Array as PropType<ClassBind[]>,
        required: true,
    },
    linkCurrentClass: {
        type: Array as PropType<ClassBind[]>,
        required: true,
    },
});

defineEmits<{
    (e: "click", event: Event): void;
}>();

// --- Computed Component Classes ---

const linkClasses = computed(() => [
    ...props.rootClass,
    ...props.linkClass,
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
        @click.prevent="$emit('click', $event)"
        @keydown.enter.prevent="$emit('click', $event)">
        <slot>{{ number }}</slot>
    </component>
</template>

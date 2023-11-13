<script setup lang="ts">
import { computed, type Component, type PropType } from "vue";
import { getOption } from "@/utils/config";
import type { PropBind } from "@/types";

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
        type: [String, Object, Function] as PropType<string | Component>,
        default: "a",
        validator: (value) => {
            if (typeof value === "string")
                return (
                    getOption("linkTags", [
                        "a",
                        "button",
                        "input",
                        "router-link",
                        "nuxt-link",
                    ]).indexOf(value) >= 0
                );
            return true;
        },
    },
    class: { type: String, default: undefined },
    linkClass: {
        type: Array as PropType<PropBind>,
        required: true,
    },
    linkCurrentClass: {
        type: [Array] as PropType<Array<string>>,
        required: true,
    },
});

const href = computed(() => (props.tag === "a" ? "#" : ""));

const isDisabled = computed(() => (props.tag === "a" ? null : props.disabled));

// --- Computed Component Classes ---

const linkClasses = computed(() => [
    ...props.linkClass,
    props.class,
    ...(props.isCurrent ? props.linkCurrentClass : []),
]);
</script>

<template>
    <component
        :is="tag"
        role="button"
        :href="href"
        :disabled="isDisabled"
        :class="linkClasses"
        v-bind="$attrs"
        :aria-label="ariaLabel"
        :aria-current="isCurrent"
        @click.prevent="click">
        <slot>{{ number }}</slot>
    </component>
</template>

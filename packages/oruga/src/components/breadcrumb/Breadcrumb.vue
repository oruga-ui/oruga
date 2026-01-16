<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    normalizeOptions,
    useProviderParent,
    useIndexer,
} from "@/composables";

import type { BreadcrumbProps } from "./props";

/**
 * The classic breadcrumb, in different colors, sizes, and states
 * @displayName Breadcrumb
 * @requires ./BreadcrumbItem.vue
 * @style _breadcrumb.scss
 */
defineOptions({
    isOruga: true,
    name: "OBreadcrumb",
    configField: "breadcrumb",
});

const props = withDefaults(defineProps<BreadcrumbProps>(), {
    override: undefined,
    options: undefined,
    size: () => getDefault("breadcrumb.size"),
    variant: () => getDefault("breadcrumb.variant"),
    position: () => getDefault("breadcrumb.position"),
    separator: () => getDefault("breadcrumb.separator", "/"),
    ariaLabel: () => getDefault("modal.ariaLabel", "Breadcrumb"),
});

defineSlots<{
    /** Place breadcrumb items here  */
    default?(): void;
}>();

const rootRef = useTemplateRef("rootElement");

/** provide functionalities and data to child item components */
useProviderParent({ rootRef });

/** unique key sequencer */
const indexer = useIndexer();

/** normalized programamtic options */
const normalizedOptions = computed(() =>
    normalizeOptions(props.options, indexer),
);

const customStyle = computed(() => ({ "--seperator": `'${props.separator}'` }));

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-breadcrumb"],
    [
        "sizeClass",
        "o-breadcrumb--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-breadcrumb--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "positionClass",
        "o-breadcrumb--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
);

const listClasses = defineClasses(["listClass", "o-breadcrumb__list"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <nav
        ref="rootElement"
        data-oruga="breadcrumb"
        :class="rootClasses"
        :style="customStyle"
        :aria-label="ariaLabel">
        <ol :class="listClasses">
            <slot>
                <O-breadcrumb-item
                    v-for="option in normalizedOptions"
                    :key="option.key"
                    v-bind="option.item"
                    :hidden="option.hidden" />
            </slot>
        </ol>
    </nav>
</template>

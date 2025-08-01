<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    normalizeOptions,
    useProviderParent,
    useSequentialId,
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

const rootRef = useTemplateRef("rootElement");

/** provide functionalities and data to child item components */
useProviderParent({ rootRef });

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const normalizedOptions = computed(() =>
    normalizeOptions(props.options, nextSequence),
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
            <!--
                @slot Place breadcrumb items here 
            -->
            <slot>
                <OBreadcrumbItem
                    v-for="option in normalizedOptions"
                    :key="option.key"
                    v-bind="option.attrs"
                    :value="option.value"
                    :label="option.label"
                    :hidden="option.hidden" />
            </slot>
        </ol>
    </nav>
</template>

<script setup lang="ts">
import { computed, useId, useTemplateRef } from "vue";

import { getDefault } from "@/utils/config";
import { defineClasses, unrefElement } from "@/composables";

import type { CollapseProps } from "./props";

/**
 * An easy way to toggle what you want.
 * @displayName Collapse
 * @style _collapse.scss
 */
defineOptions({
    isOruga: true,
    name: "OCollapse",
    configField: "collapse",
});

const props = withDefaults(defineProps<CollapseProps>(), {
    override: undefined,
    open: true,
    name: undefined,
    expanded: false,
    position: () => getDefault("collapse.position", "top"),
    contentId: () => useId(),
    triggerId: () => useId(),
});

const emits = defineEmits<{
    /**
     * open prop two-way binding
     * @param value {boolean} - updated open prop
     */
    "update:open": [value: boolean];
    /** on collapse opened */
    open: [];
    /** on collapse closed */
    close: [];
}>();

defineSlots<{
    /** Content to collapse */
    default?(): void;
    /**
     * Define the collapse trigger element
     * @param open {boolean} - collapse open state
     */
    trigger?(props: { open: boolean }): void;
}>();

const detailsRef = useTemplateRef("detailsElement");

const isOpen = defineModel<boolean>("open", { default: true });

/** detail open state toggle handler */
function onToggle(): void {
    const el = unrefElement(detailsRef);
    if (!el) return;

    isOpen.value = el.open;

    if (el.open) emits("open");
    else emits("close");
}

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-collapse"],
    [
        "positionClass",
        "o-collapse--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
);

const triggerClasses = defineClasses(
    ["triggerClass", "o-collapse__trigger"],
    [
        "expandedClass",
        "o-collapse__trigger--expanded",
        null,
        computed(() => props.expanded),
    ],
);

const contentClasses = defineClasses(["contentClass", "o-collapse__content"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <details
        ref="detailsElement"
        data-oruga="collapse"
        :class="rootClasses"
        :open="isOpen"
        :name="name"
        @toggle="onToggle">
        <summary :id="triggerId" :class="triggerClasses">
            <slot name="trigger" :open="isOpen" />
        </summary>

        <div :id="contentId" :class="contentClasses">
            <slot />
        </div>
    </details>
</template>

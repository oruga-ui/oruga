<script setup lang="ts">
import { computed, useId } from "vue";

import { getDefault } from "@/utils/config";
import { defineClasses } from "@/composables";

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
    expanded: false,
    animation: () => getDefault("collapse.animation", "fade"),
    position: () => getDefault("collapse.position", "top"),
    contentId: () => useId(),
    triggerId: () => useId(),
});

const emits = defineEmits<{
    /**
     * open prop two-way binding
     * @param value {boolean} updated open prop
     */
    "update:open": [value: boolean];
    /** on collapse opened */
    open: [];
    /** on collapse closed */
    close: [];
}>();

const isOpen = defineModel<boolean>("open", { default: true });

/** Toggle and emit events */
function toggle(): void {
    isOpen.value = !isOpen.value;
    if (isOpen.value) emits("open");
    else emits("close");
}

// --- Computed Component Classes ---

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
</script>

<template>
    <div data-oruga="collapse" :class="rootClasses">
        <div
            :id="triggerId"
            :class="triggerClasses"
            role="button"
            tabindex="0"
            :aria-controls="contentId"
            :aria-expanded="isOpen"
            @click="toggle"
            @keydown.enter="toggle"
            @keydown.space="toggle">
            <!--
                @slot Define the collapse trigger
                @binding {boolean} open collapse open state 
             -->
            <slot name="trigger" :open="isOpen" />
        </div>

        <Transition :name="animation">
            <div
                v-show="isOpen"
                :id="contentId"
                :class="contentClasses"
                :aria-labelledby="triggerId">
                <!--
                    @slot Default content
                -->
                <slot />
            </div>
        </Transition>
    </div>
</template>

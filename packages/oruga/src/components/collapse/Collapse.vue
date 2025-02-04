<script setup lang="ts">
import { useId } from "vue";

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

withDefaults(defineProps<CollapseProps>(), {
    override: undefined,
    open: true,
    animation: () => getDefault("collapse.animation", "fade"),
    contentId: () => useId(),
    position: () => getDefault("collapse.position", "top"),
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

const rootClasses = defineClasses(["rootClass", "o-clps"]);

const triggerClasses = defineClasses(["triggerClass", "o-clps__trigger"]);

const contentClasses = defineClasses(["contentClass", "o-clps__content"]);
</script>

<template>
    <div :class="rootClasses" data-oruga="collapse">
        <div
            v-if="position === 'top'"
            :class="triggerClasses"
            role="button"
            tabindex="0"
            @click="toggle"
            @keydown.enter="toggle">
            <!--
                @slot Define the collapse trigger
                @binding {boolean} open collapse open state 
             -->
            <slot name="trigger" :open="isOpen" />
        </div>

        <Transition :name="animation">
            <div v-show="isOpen" :id="contentId" :class="contentClasses">
                <!--
                    @slot Default content
                -->
                <slot />
            </div>
        </Transition>

        <div
            v-if="position === 'bottom'"
            :class="triggerClasses"
            role="button"
            tabindex="0"
            @click="toggle"
            @keydown.enter="toggle">
            <!--
                @slot Define the collapse trigger
                @binding {boolean} open collapse open state 
             -->
            <slot name="trigger" :open="isOpen" />
        </div>
    </div>
</template>

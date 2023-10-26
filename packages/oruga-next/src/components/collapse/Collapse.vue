<script setup lang="ts">
import { computed, type PropType } from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { useComputedClass, useClassProps, usePropBinding } from "@/composables";
import { uuid } from "@/utils/helpers";

/**
 * An easy way to toggle what you want
 * @displayName Collapse
 * @style _collapse.scss
 */
defineOptions({
    isOruga: true,
    name: "OCollapse",
    configField: "collapse",
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Whether collapse is open or not, use v-model:open to make it two-way binding */
    open: { type: Boolean, default: true },
    /** Custom animation (transition name) */
    animation: {
        type: String,
        default: () => getOption("collapse.animation", "fade"),
    },
    /** Id property of the content container */
    contentId: { type: String, default: () => uuid() },
    /**
     * Trigger position
     * @values top, bottom
     */
    position: {
        type: String as PropType<"top" | "bottom">,
        default: () => getOption("collapse.position", "top"),
        validator: (value: string) => ["top", "bottom"].indexOf(value) > -1,
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps(["rootClass", "triggerClass", "contentClass"]),
});

const emits = defineEmits<{
    /**
     * open prop two-way binding
     * @param value {boolean} updated modelValue open
     */
    (e: "update:open", value: boolean): void;
    /** on collapse opened */
    (e: "open"): void;
    /** on collapse closed */
    (e: "close"): void;
}>();

const isOpen = usePropBinding<boolean>("open", props, emits, { passive: true });

/** Toggle and emit events */
function toggle(): void {
    isOpen.value = !isOpen.value;
    isOpen.value ? emits("open") : emits("close");
}

// --- Computed Component Classes ---

const rootClass = computed(() => [useComputedClass("rootClass", "o-clps")]);

const triggerClass = computed(() => [
    useComputedClass("triggerClass", "o-clps__trigger"),
]);

const contentClass = computed(() => [
    useComputedClass("contentClass", "o-clps__content"),
]);
</script>

<template>
    <div :class="rootClass" data-oruga="collapse">
        <div v-if="position === 'top'" :class="triggerClass" @click="toggle">
            <slot name="trigger" :open="isOpen" />
        </div>

        <Transition :name="animation">
            <div v-show="isOpen" :id="contentId" :class="contentClass">
                <slot />
            </div>
        </Transition>

        <div v-if="position === 'bottom'" :class="triggerClass" @click="toggle">
            <slot name="trigger" :open="isOpen" />
        </div>
    </div>
</template>

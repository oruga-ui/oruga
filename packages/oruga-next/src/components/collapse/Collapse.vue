<script setup lang="ts">
import { computed, type PropType } from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { uuid } from "@/utils/helpers";
import { useComputedClass, usePropBinding } from "@/composables";

import type { ComponentClass } from "@/types";

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
    // class props (will not be displayed in the docs)
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    triggerClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    contentClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * open prop two-way binding
     * @param value {boolean} updated open prop
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

const rootClasses = computed(() => [useComputedClass("rootClass", "o-clps")]);

const triggerClasses = computed(() => [
    useComputedClass("triggerClass", "o-clps__trigger"),
]);

const contentClasses = computed(() => [
    useComputedClass("contentClass", "o-clps__content"),
]);
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

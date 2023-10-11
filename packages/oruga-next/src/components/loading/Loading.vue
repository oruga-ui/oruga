<script setup lang="ts">
import { ref, computed, onMounted, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    useProgrammaticComponent,
} from "@/composables";
import type { ProgrammaticInstance } from "@/types";

/**
 * A simple loading overlay
 * @displayName Loading
 * @style _loading.scss
 */
defineOptions({
    isOruga: true,
    name: "OLoading",
    configField: "loading",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Whether loading is active or not, use v-model:active to make it two-way binding. */
    active: { type: Boolean, default: false },
    /** Loader will overlay the full page. */
    fullPage: { type: Boolean, default: true },
    /** Notification label, unnecessary when default slot is used. */
    label: { type: String, default: undefined },
    /** Custom animation (transition name) */
    animation: {
        type: String,
        default: () => getOption("loading.animation", "fade"),
    },
    /** Can cancle Loading by pressing escape or clicking outside. */
    cancelable: { type: Boolean, default: false },
    /** Callback function to call after user canceled (pressed escape / clicked outside). */
    onCancel: { type: Function as PropType<() => void>, default: () => {} },
    /** Callback function to call after close (programmatically close or user canceled). */
    onClose: { type: Function as PropType<() => void>, default: () => {} },
    /** Icon name to show, unnecessary when default slot is used. */
    icon: {
        type: String,
        default: () => getOption("loading.icon", "loading"),
    },
    /** Enable spin effect on icon */
    iconSpin: {
        type: Boolean,
        default: () => getOption("loading.iconSpin", true),
    },
    /**
     * Icon size
     * @values small, medium, large
     */
    iconSize: {
        type: String,
        default: () => getOption("loading.iconSize", "medium"),
    },
    /**
     * DOM element where the loading component will be created on (for programmatic usage).
     * Note that this also changes fullPage to false.
     */
    container: {
        type: [HTMLElement, String],
        default: () => getOption("loading.container", document.body),
    },
    /**
     * This is used internally for programmatic usage
     * @ignore
     */
    programmatic: {
        type: Object as PropType<ProgrammaticInstance<typeof this>>,
        default: undefined,
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "overlayClass",
        "fullPageClass",
        "iconClass",
        "labelClass",
    ]),
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    (e: "update:active", value: boolean): void;
    /**
     * on loading close event
     * @param value {any}
     */
    (e: "close", ...args: any[]): void;
}>();

const rootRef = ref();

const displayInFullPage = ref(props.fullPage);

/** add programmatic usage to this component */
const { isActive, close, cancel } = useProgrammaticComponent(
    rootRef,
    props,
    emits,
    {
        cancelOptions: getOption("modal.cancelable", [
            "escape",
            "x",
            "outside",
            "button",
        ]),
    },
);

onMounted(() => {
    if (props.programmatic && props.container) {
        displayInFullPage.value = false;
    }
});

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-load"),
    {
        [useComputedClass("fullPageClass", "o-load--fullpage")]:
            displayInFullPage.value,
    },
]);

const overlayClasses = computed(() => [
    useComputedClass("overlayClass", "o-load__overlay"),
]);

const iconClasses = computed(() => [
    useComputedClass("iconClass", "o-load__icon"),
]);

const labelClasses = computed(() => [
    useComputedClass("labelClass", "o-load__label"),
]);

// --- Expose Public Functionality ---

/** expose close function for programmatic usage */
defineExpose({ close });
</script>

<template>
    <transition :name="animation">
        <div v-if="isActive" ref="rootRef" :class="rootClasses">
            <div :class="overlayClasses" @click="cancel('outside')" />
            <!-- @slot Override icon and label -->
            <slot>
                <o-icon
                    :icon="icon"
                    :spin="iconSpin"
                    :size="iconSize"
                    :class="iconClasses"
                    both />
                <span v-if="label" :class="labelClasses">
                    {{ label }}
                </span>
            </slot>
        </div>
    </transition>
</template>

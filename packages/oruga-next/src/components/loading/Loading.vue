<script setup lang="ts">
import { ref, computed, onMounted, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    usePropBinding,
    useEventListener,
} from "@/composables";
import { removeElement } from "@/utils/helpers";
import { HTMLElement, isClient } from "@/utils/ssr";
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
    onCancle: { type: Function, default: () => {} },
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
     * DOM element where the loading component will be created on.
     * Note that this also changes fullPage to false.
     */
    container: { type: HTMLElement, default: undefined },
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

const isActive = usePropBinding("active", props, emits);
const displayInFullPage = usePropBinding("fullPage", props, emits);

if (isClient)
    useEventListener("keyup", onKeyPress, props.container || document);

onMounted(() => {
    if (props.programmatic) {
        if (props.programmatic.instances) {
            props.programmatic.instances.add(this);
        }
        // Insert the Loading component in body tag
        // only if it's programmatic
        if (!props.container) {
            document.body.appendChild(rootRef.value);
        } else {
            displayInFullPage.value = false;
            props.container.appendChild(rootRef.value);
        }
        isActive.value = true;
    }
});

/** Close the Modal if canCancel. */
function cancel(method: string): void {
    if (!props.cancelable || !isActive.value) return;
    close({ action: "cancel", method });
}

/** Emit events, and destroy modal if it's programmatic. */
function close(...args: any[]): void {
    emits("close");
    props.onCancle.apply(null, args);

    // Timeout for the animation complete before destroying
    if (props.programmatic) {
        if (props.programmatic.instances)
            props.programmatic.instances.remove(this);

        if (props.programmatic.resolve)
            props.programmatic.resolve.apply(null, args);

        // Timeout for the animation complete before destroying
        setTimeout(() => {
            isActive.value = false;
            window.requestAnimationFrame(() => removeElement(rootRef.value));
        });
    } else isActive.value = false;
}

/** Keypress event that is bound to the document. */
function onKeyPress(event: KeyboardEvent): void {
    if (event.key === "Escape" || event.key === "Esc") cancel("escape");
}

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

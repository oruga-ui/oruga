<script setup lang="ts">
import { ref, type Component, type PropType } from "vue";

import { useProgrammaticComponent } from "@/composables";

import type { ProgrammaticInstance } from "@/types";

/**
 * Programmatic component wrapper composable
 * @displayName useProgrammatically
 */
defineOptions({
    isOruga: true,
    name: "OProgrammatic",
    configField: "programmatic",
    inheritAttrs: false,
});

const props = defineProps({
    /**
     * Component to be injected.
     * Terminate the component by emitting a 'close' event — emits('close')
     */
    component: {
        type: [Object, Function] as PropType<Component>,
        required: true,
    },
    /** Props to be binded to the injected component */
    props: { type: Object, default: undefined },
    /** Events to be binded to the injected component */
    events: { type: Object, default: () => ({}) },
    /** DOM element where the component will be created on */
    container: {
        type: [Object, String] as PropType<string | HTMLElement>,
        default: "body",
    },
    /** Destroy component on close event */
    destroyOnClose: {
        type: Boolean,
        default: false,
    },
    /** Callback function to call on close event */
    onClose: { type: Function as PropType<() => void>, default: () => {} },
    /**
     * This is used internally for programmatic usage
     * @ignore
     */
    programmatic: {
        type: Object as PropType<ProgrammaticInstance>,
        default: undefined,
    },
    /**
     * This is used internally for programmatic usage
     * @ignore
     */
    promise: { type: Promise, default: undefined },
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    (e: "update:active", value: boolean): void;
    /**
     * on component close event
     * @param value {any} - close event data
     */
    (e: "close", ...args: any[]): void;
}>();

const componentRef = ref();

/** add programmatic usage to this component */
const { close } = useProgrammaticComponent(
    componentRef,
    { ...props, onCancel: () => {}, active: true },
    emits,
    {
        destroyOnHide: props.destroyOnClose,
        cancelOptions: [],
    },
);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close, promise: props.promise });
</script>

<template>
    <!-- injected component for programmatic usage -->
    <component
        v-bind="$props.props"
        :is="component"
        v-if="component"
        ref="componentRef"
        v-on="$props.events"
        @close="close" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    active: {
        type: String,
        default: () => getOption("button.variant"),
    },
    tag: {
        type: String,
        default: () => getOption("button.variant"),
    },
    disabled: {
        type: String,
        default: () => getOption("button.variant"),
    },

    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */

     iconPack: {
        type: String,
        default: () => getOption("button.iconPack", undefined),
    },
    /** Icon name to show on the left */
    iconLeft: { type: String, default: undefined },
    /** Icon name to show on the right */
    iconRight: { type: String, default: undefined },
    /** Enable rounded style */
    rounded: {
        type: Boolean,
        default: () => getOption("button.rounded", false),
    },
    /**
     * This is used internally
     * @ignore
     */
    /** Class of the button icon */
    iconClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button icon on the left */
    iconLeftClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button icon on the right */
    iconRightClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});
// const computedTag = computed(()=>{});

const labelClasses = defineClasses(["labelClass", "o-btn__label"]);

const iconClasses = defineClasses(["iconClass", "o-btn__icon"]);

const iconLeftClasses = defineClasses(["iconLeftClass", "o-btn__icon-left"]);

const iconRightClasses = defineClasses(["iconRightClass", "o-btn__icon-right"]);

const wrapperClasses = defineClasses(["wrapperClass", "o-btn__wrapper"]);
</script>

<template>
     <component
        :is="computedTag"
        :type="computedNativeType"
        :class="rootClasses"
        data-oruga="breadcrumb">
        <span :class="wrapperClasses">
            <o-icon
                v-if="iconLeft"
                :pack="iconPack"
                :icon="iconLeft"
                :size="size"
                :both="iconBoth"
                :class="[...iconClasses, ...iconLeftClasses]" />
            <span v-if="label || $slots.default" :class="labelClasses">
                <!--
                    @slot Override the label, default is label prop 
                -->
                <slot>{{ label }}</slot>
            </span>
            <o-icon
                v-if="iconRight"
                :pack="iconPack"
                :icon="iconRight"
                :size="size"
                :both="iconBoth"
                :class="[...iconClasses, ...iconRightClasses]" />
        </span>
    </component>
</template>

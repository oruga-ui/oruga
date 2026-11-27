<script setup lang="ts">
import { computed, useAttrs } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import { defineClasses } from "@/composables";

import type { ButtonProps, ButtonNativeProps } from "./props";

/**
 * The classic button, in different colors, sizes, and states.
 * @displayName Button
 * @style _button.scss
 */
defineOptions({
    isOruga: true,
    name: "OButton",
    configField: "button",
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<
        ButtonProps &
            // eslint-disable-next-line vue/prop-name-casing -- aria-* keys in ButtonNativeProps are @vue-ignore'd (not Vue props, just typed fallthrough attrs)
            /* @vue-ignore */ ButtonNativeProps
    >(),
    {
        override: undefined,
        tag: () => getDefault("button.tag", "button"),
        variant: () => getDefault("button.variant"),
        size: () => getDefault("button.size"),
        label: undefined,
        rounded: () => getDefault("button.rounded", false),
        expanded: false,
        disabled: false,
        outlined: false,
        loading: false,
        inverted: false,
        type: "button",
        iconPack: () => getDefault("button.iconPack"),
        icon: undefined,
        iconRight: undefined,
        iconSize: () => getDefault("button.iconSize"),
    },
);

const emits = defineEmits<{
    /**
     * button click event
     * @param event {Event} - native event
     */
    click: [event: Event];
}>();

defineSlots<{
    /** Override the label, default is label prop */
    default?(): void;
    /** Override the left icon */
    left?(): void;
    /** Override the right icon */
    right?(): void;
}>();

const attrs = useAttrs();

const isNativeButton = computed(
    () => props.tag === "button" || props.tag === "input",
);

/**
 * Anchors and components (e.g. router-link) are links:
 * the browser handles focus and Enter, and they must stay announced as links.
 */
const isLink = computed(
    () => typeof props.tag !== "string" || (props.tag === "a" && attrs["href"]),
);

/** Any other element needs the button semantics and keyboard support added. */
const isCustomElement = computed(() => !isNativeButton.value && !isLink.value);

const computedNativeType = computed(() =>
    isNativeButton.value ? props.type : null,
);

const computedTabindex = computed(() => {
    // disabled elements which are not a native control must leave the tab order
    if (props.disabled && !isNativeButton.value) return -1;
    return isCustomElement.value ? 0 : null;
});

function onClick(event: Event): void {
    // the disabled attribute only blocks native controls
    if (props.disabled && !isNativeButton.value) {
        // do not follow links
        event.preventDefault();
        return;
    }
    emits("click", event);
}

/**
 * Keyboard activation which the browser does not provide.
 * Custom elements need Enter and Space. Links already get Enter,
 * but would scroll the page on Space, which a button must not do.
 */
function onKeydown(event: KeyboardEvent): void {
    // native buttons are activated by the browser
    if (isNativeButton.value) return;
    const keys = isCustomElement.value ? ["Enter", " "] : [" "];
    if (!keys.includes(event.key)) return;
    // prevent scrolling on space
    event.preventDefault();
    if (props.disabled) return;
    // dispatches a click, so the link is followed and click is emitted once
    (event.currentTarget as HTMLElement).click();
}

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-button"],
    [
        "sizeClass",
        "o-button--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-button--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "outlinedClass",
        "o-button--outlined",
        null,
        computed(() => props.outlined),
    ],
    [
        "invertedClass",
        "o-button--inverted",
        null,
        computed(() => props.inverted),
    ],
    [
        "expandedClass",
        "o-button--expanded",
        null,
        computed(() => props.expanded),
    ],
    ["loadingClass", "o-button--loading", null, computed(() => props.loading)],
    ["roundedClass", "o-button--rounded", null, computed(() => props.rounded)],
    [
        "disabledClass",
        "o-button--disabled",
        null,
        computed(() => props.disabled),
    ],
);

const labelClasses = defineClasses(["labelClass", "o-button__label"]);

const iconClasses = defineClasses(["iconClass", "o-button__icon"]);

const iconLeftClasses = defineClasses(["iconLeftClass", "o-button__icon-left"]);

const iconRightClasses = defineClasses([
    "iconRightClass",
    "o-button__icon-right",
]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <component
        :is="tag"
        :role="isCustomElement ? 'button' : null"
        :type="computedNativeType"
        :tabindex="computedTabindex"
        data-oruga="button"
        :class="rootClasses"
        :disabled="isNativeButton && disabled ? true : null"
        :aria-disabled="disabled ? true : null"
        v-bind="$attrs"
        @click="onClick"
        @keydown="onKeydown">
        <slot name="left">
            <o-icon
                v-if="icon"
                :pack="iconPack"
                :icon="icon"
                :size="iconSize ?? size"
                :class="[...iconClasses, ...iconLeftClasses]" />
        </slot>

        <span v-if="label || $slots.default" :class="labelClasses">
            <slot>{{ label }}</slot>
        </span>

        <slot name="right">
            <o-icon
                v-if="iconRight"
                :pack="iconPack"
                :icon="iconRight"
                :size="iconSize ?? size"
                :class="[...iconClasses, ...iconRightClasses]" />
        </slot>
    </component>
</template>

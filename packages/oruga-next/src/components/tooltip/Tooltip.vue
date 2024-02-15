<script setup lang="ts">
import { ref, computed, watch, nextTick, type PropType } from "vue";

import PositionWrapper from "../utils/PositionWrapper.vue";

import { getOption } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    usePropBinding,
    useEventListener,
    useClickOutside,
    type ComputedClass,
} from "@/composables";

import type { ComponentClass, DynamicComponent } from "@/types";

/**
 * Display a brief helper text to your user
 * @displayName Tooltip
 * @style _tooltip.scss
 */
defineOptions({
    isOruga: true,
    name: "OTooltip",
    configField: "tooltip",
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** Whether tooltip is active or not, use v-model:active to make it two-way binding */
    active: { type: Boolean, default: false },
    /** Tooltip text, unnecessary when content slot is used */
    label: { type: String, default: undefined },
    /**
     * Color of the tooltip
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("tooltip.variant"),
    },
    /**
     * Position of the Tooltip relative to the trigger
     * @values auto, top, bottom, left, right, top-right, top-left, bottom-left, bottom-right
     */
    position: {
        type: String,
        default: () => getOption("tooltip.position", "auto"),
        validator: (value: string) =>
            [
                "auto",
                "top",
                "bottom",
                "left",
                "right",
                "top-right",
                "top-left",
                "bottom-left",
                "bottom-right",
            ].indexOf(value) > -1,
    },
    /** Tooltip will be always active */
    always: { type: Boolean, default: false },
    /** Tooltip will be disabled */
    disabled: { type: Boolean, default: false },
    /** Tooltip default animation */
    animation: {
        type: String,
        default: () => getOption("tooltip.animation", "fade"),
    },
    /** Tooltip will be multilined */
    multiline: { type: Boolean, default: false },
    /** Tooltip trigger tag name */
    triggerTag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption<DynamicComponent>("tooltip.triggerTag", "div"),
    },
    /**
     * Tooltip trigger events
     * @values hover, click, focus, contextmenu
     */
    triggers: {
        type: Array as PropType<string[]>,
        default: () => getOption("tooltip.triggers", ["hover"]),
        validator: (values: string[]) =>
            values.filter(
                (value) =>
                    ["click", "hover", "contextmenu", "focus"].indexOf(value) >
                    -1,
            ).length === values.length,
    },
    /** Tooltip delay before it appears (number in ms) */
    delay: { type: Number, default: undefined },
    /**
     * Tooltip auto close options (pressing escape, clicking the content or outside)
     * @values true, false, content, outside, escape
     */
    closeable: {
        type: [Array, Boolean] as PropType<string[] | boolean>,
        default: () =>
            getOption("tooltip.closeable", ["escape", "outside", "content"]),
    },
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport: {
        type: [Boolean, String, Object],
        default: () => getOption("dropdown.teleport", false),
    },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class when the dropdown is teleported */
    teleportClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tooltip content */
    contentClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tooltip trigger position */
    positionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tooltip trigger */
    triggerClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tooltip content when is multiline */
    multilineClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tooltip trigger when is always visible */
    alwaysClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tooltip variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tooltip arrow */
    arrowClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tooltip arrow position */
    arrowPositionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    positionClassOnRoot: {
        type: Boolean,
        default: () => getOption("tooltip.positionClassOnRoot", false),
    },
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    (e: "update:active", value: boolean): void;
    /** on active change to false event */
    (e: "close"): void;
    /** on active change to true event */
    (e: "open"): void;
}>();

const isActive = usePropBinding<boolean>("active", props, emits, {
    passive: true,
});

watch(isActive, (value) => {
    if (value) emits("open");
    else emits("close");
});

const timer = ref();

const autoPosition = ref(props.position);

/** update autoPosition on prop change */
watch(
    () => props.position,
    (v) => (autoPosition.value = v),
);

// --- Event Handler ---

const contentRef = ref<HTMLElement>();
const triggerRef = ref<HTMLElement>();

const eventCleanups = ref([]);

watch(isActive, (value) => {
    // on active set event handler
    if (value && isClient) {
        setTimeout(() => {
            if (cancelOptions.value.indexOf("outside") >= 0) {
                // set outside handler
                eventCleanups.value.push(
                    useClickOutside(contentRef, onClickedOutside, [triggerRef]),
                );
            }

            if (cancelOptions.value.indexOf("escape") >= 0) {
                // set keyup handler
                eventCleanups.value.push(
                    useEventListener("keyup", onKeyPress, document, {
                        immediate: true,
                    }),
                );
            }
        });
    } else if (!value) {
        // on close cleanup event handler
        eventCleanups.value.forEach((fn) => fn());
        eventCleanups.value.length = 0;
    }
});

const cancelOptions = computed<string[]>(() =>
    typeof props.closeable === "boolean"
        ? props.closeable
            ? ["escape", "outside", "content"]
            : []
        : props.closeable,
);

/** Close tooltip if clicked outside. */
function onClickedOutside(): void {
    if (!isActive.value || props.always) return;
    if (cancelOptions.value.indexOf("outside") < 0) return;
    isActive.value = false;
}

/** Keypress event that is bound to the document */
function onKeyPress(event: KeyboardEvent): void {
    if (isActive.value && (event.key === "Escape" || event.key === "Esc")) {
        if (cancelOptions.value.indexOf("escape") < 0) return;
        isActive.value = false;
    }
}

function onClick(): void {
    if (props.triggers.indexOf("click") < 0) return;
    // if not active, toggle after clickOutside event
    // this fixes toggling programmatic
    nextTick(() => setTimeout(() => open()));
}

function onContextMenu(event: Event): void {
    if (props.triggers.indexOf("contextmenu") < 0) return;
    event.preventDefault();
    open();
}

function onFocus(): void {
    if (props.triggers.indexOf("focus") < 0) return;
    open();
}

function onHover(): void {
    if (props.triggers.indexOf("hover") < 0) return;
    open();
}

function open(): void {
    if (props.disabled) return;
    if (props.delay) {
        timer.value = setTimeout(() => {
            isActive.value = true;
            timer.value = null;
        }, props.delay);
    } else {
        isActive.value = true;
    }
}

function onClose(): void {
    if (cancelOptions.value.indexOf("content") < 0) return;
    isActive.value = !props.closeable;
    if (timer.value && props.closeable) clearTimeout(timer.value);
}

// --- Computed Component Classes ---

const positionComputedClass: ComputedClass = [
    "positionClass",
    "o-tip__content--",
    autoPosition,
    computed(() => !!autoPosition.value),
];

const rootClasses = defineClasses(
    ["rootClass", "o-tip"],
    [
        "teleportClass",
        "o-tip--teleport",
        null,
        computed(() => !!props.teleport),
    ],
    props.positionClassOnRoot ? positionComputedClass : undefined,
);

const triggerClasses = defineClasses(["triggerClass", "o-tip__trigger"]);

const arrowClasses = defineClasses(
    ["arrowClass", "o-tip__arrow"],
    [
        "arrowPositionClass",
        "o-tip__arrow--",
        autoPosition,
        computed(() => !!autoPosition.value),
    ],
    [
        "variantArrowClass",
        "o-tip__arrow--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
);

const contentClasses = defineClasses(
    ["contentClass", "o-tip__content"],
    props.positionClassOnRoot ? undefined : positionComputedClass,
    [
        "variantClass",
        "o-tip__content--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "multilineClass",
        "o-tip__content--multiline",
        null,
        computed(() => props.multiline),
    ],
    [
        "alwaysClass",
        "o-tip__content--always",
        null,
        computed(() => props.always),
    ],
);
</script>

<template>
    <div :class="rootClasses" data-oruga="tooltip">
        <PositionWrapper
            v-model:position="autoPosition"
            :teleport="teleport"
            :class="rootClasses"
            :trigger="triggerRef"
            :content="contentRef"
            default-position="top"
            :disabled="!isActive">
            <transition :name="animation">
                <div
                    v-show="isActive || (always && !disabled)"
                    ref="contentRef"
                    :class="contentClasses">
                    <span :class="arrowClasses"></span>

                    <!--
                        @slot Tooltip content, default is label prop
                    -->
                    <slot name="content">{{ label }}</slot>
                </div>
            </transition>
        </PositionWrapper>
        <component
            :is="triggerTag"
            ref="triggerRef"
            :class="triggerClasses"
            aria-haspopup="true"
            @click="onClick"
            @contextmenu="onContextMenu"
            @mouseenter="onHover"
            @focus.capture="onFocus"
            @blur.capture="onClose"
            @mouseleave="onClose">
            <!--
                @slot Tooltip trigger slot
                @binding {boolean} active - tooltip active state
            -->
            <slot :active="isActive" />
        </component>
    </div>
</template>

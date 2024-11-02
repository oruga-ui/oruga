<script setup lang="ts" generic="C extends Component">
import {
    ref,
    computed,
    watch,
    nextTick,
    onMounted,
    useTemplateRef,
    type Component,
} from "vue";

import OIcon from "../icon/Icon.vue";

import { vTrapFocus } from "@/directives/trapFocus";
import { getOption } from "@/utils/config";
import { toCssDimension } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    useClickOutside,
    useEventListener,
    useMatchMedia,
    usePreventScrolling,
} from "@/composables";

import type { ModalProps } from "./props";

/**
 * Classic modal overlay to include any content you may need
 * @displayName Modal
 * @style _modal.scss
 */
defineOptions({
    isOruga: true,
    name: "OModal",
    configField: "modal",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<ModalProps<C>>(), {
    override: undefined,
    active: false,
    fullScreen: false,
    content: undefined,
    width: () => getOption("modal.width", 960),
    animation: () => getOption("modal.animation", "zoom-out"),
    overlay: () => getOption("modal.overlay", true),
    cancelable: () => getOption("modal.cancelable", ["escape", "x", "outside"]),
    scroll: () => getOption("modal.scroll", "keep"),
    trapFocus: () => getOption("modal.trapFocus", true),
    ariaRole: () => getOption("modal.ariaRole"),
    ariaLabel: () => getOption("modal.ariaLabel"),
    autoFocus: () => getOption("modal.autoFocus", true),
    closeIcon: () => getOption("modal.closeIcon", "close"),
    closeIconSize: () => getOption("modal.closeIconSize", "medium"),
    mobileBreakpoint: () => getOption("modal.mobileBreakpoint"),
    teleport: () => getOption("modal.teleport", false),
    component: undefined,
    props: undefined,
    events: undefined,
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    (e: "update:active", value: boolean): void;
    /**
     * on component close event
     * @param value {unknown} - close event data
     */
    (e: "close", ...args: unknown[]): void;
}>();

const rootRef = useTemplateRef("rootElement");
const contentRef = useTemplateRef("contentElement");

const isActive = defineModel<boolean>("active", { default: false });

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const _teleport = computed(() =>
    typeof props.teleport === "boolean"
        ? { to: "body", disabled: !props.teleport }
        : { to: props.teleport, disabled: false },
);

const showX = computed(() =>
    Array.isArray(props.cancelable)
        ? props.cancelable.indexOf("x") >= 0
        : props.cancelable,
);

const customStyle = computed(() =>
    !props.fullScreen ? { maxWidth: toCssDimension(props.width) } : null,
);

const toggleScroll = usePreventScrolling(props.scroll === "keep");

watch(isActive, (value) => {
    if (props.overlay) toggleScroll(value);
    // if autoFocus focus the element
    if (value && props.autoFocus)
        nextTick(() => {
            if (rootRef.value) rootRef.value.focus();
        });
});

onMounted(() => {
    if (isActive.value && props.overlay) toggleScroll(isActive.value);
});

// --- Events Feature ---

if (isClient) {
    // register onKeyPress event listener when is active
    useEventListener("keyup", onKeyPress, rootRef, { trigger: isActive });

    if (!props.overlay)
        // register outside click event listener when is active
        useClickOutside(contentRef, onClickedOutside, {
            trigger: isActive,
        });
}

/** Keypress event that is bound to the document. */
function onKeyPress(event: KeyboardEvent): void {
    if (!isActive.value) return;
    if (event.key === "Escape" || event.key === "Esc") cancel("escape");
}

/** Close fixed sidebar if clicked outside. */
function onClickedOutside(event: Event): void {
    if (!isActive.value || isAnimating.value) return;
    if (
        props.overlay ||
        (contentRef.value && !event.composedPath().includes(contentRef.value))
    )
        event.preventDefault();
    cancel("outside");
}

/**
 * Check if method is cancelable.
 * Call close() with action `cancel`.
 * @param method Cancel method
 */
function cancel(method: string): void {
    // check if method is cancelable
    if (
        (typeof props.cancelable === "boolean" && !props.cancelable) ||
        !props.cancelable ||
        (Array.isArray(props.cancelable) && !props.cancelable.includes(method))
    )
        return;
    close({ action: "cancel", method });
}

/** set active to false and emit close event */
function close(...args: unknown[]): void {
    isActive.value = false;
    emits("close", args);
}

// --- Animation Feature ---

const isAnimating = ref(!props.active);

/** Transition after-enter hook */
function afterEnter(): void {
    isAnimating.value = false;
}

/** Transition before-leave hook */
function beforeLeave(): void {
    isAnimating.value = true;
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-modal"],
    ["mobileClass", "o-modal--mobile", null, isMobile],
    ["activeClass", "o-modal--active", null, isActive],
);

const overlayClasses = defineClasses(["overlayClass", "o-modal__overlay"]);

const contentClasses = defineClasses(
    ["contentClass", "o-modal__content"],
    [
        "fullScreenClass",
        "o-modal__content--full-screen",
        null,
        computed(() => props.fullScreen),
    ],
);

const closeClasses = defineClasses(["closeClass", "o-modal__close"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close });
</script>

<template>
    <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
        <transition
            :name="animation"
            @after-enter="afterEnter"
            @before-leave="beforeLeave">
            <div
                v-show="isActive"
                v-bind="$attrs"
                ref="rootElement"
                v-trap-focus="trapFocus"
                data-oruga="modal"
                :class="rootClasses"
                :tabindex="-1"
                :role="ariaRole"
                :aria-label="ariaLabel"
                :aria-modal="isActive">
                <div
                    v-if="overlay"
                    :class="overlayClasses"
                    tabindex="-1"
                    @click="onClickedOutside" />

                <div
                    ref="contentElement"
                    :class="contentClasses"
                    :style="customStyle">
                    <!-- injected component for programmatic usage -->
                    <component
                        :is="component"
                        v-if="component"
                        v-bind="$props.props"
                        v-on="$props.events || {}"
                        @close="close" />
                    <!--
                        @slot Modal default content, default is content prop
                        @binding {(...args): void} close - function to close the component
                    -->
                    <slot v-else :close="close">
                        <div v-if="content">{{ content }}</div>
                    </slot>

                    <o-icon
                        v-if="showX"
                        v-show="!isAnimating"
                        clickable
                        both
                        :class="closeClasses"
                        :icon="closeIcon"
                        :size="closeIconSize"
                        @click="cancel('x')" />
                </div>
            </div>
        </transition>
    </Teleport>
</template>

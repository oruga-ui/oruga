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

import CloseButton from "../utils/CloseButton.vue";

import { getDefault } from "@/utils/config";
import { toCssDimension } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    useClickOutside,
    useMatchMedia,
    usePreventScrolling,
    getTeleportDefault,
    useTrapFocus,
} from "@/composables";
import type { CloseEventArgs } from "../programmatic";

import type { ModalProps } from "./props";

/**
 * Classic modal overlay to include any content you may need.
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
    content: undefined,
    animation: () => getDefault("modal.animation", "zoom-out"),
    overlay: () => getDefault("modal.overlay", true),
    width: () => getDefault("modal.width"),
    hieght: () => getDefault("modal.height"),
    fullscreen: false,
    fullheight: false,
    fullwidth: false,
    cancelable: () =>
        getDefault("modal.cancelable", ["escape", "x", "outside"]),
    trapFocus: () => getDefault("modal.trapFocus", true),
    alert: () => getDefault("modal.alert", false),
    ariaLabel: () => getDefault("modal.ariaLabel"),
    autoFocus: () => getDefault("modal.autoFocus", true),
    iconPack: () => getDefault("modal.iconPack"),
    closeIcon: () => getDefault("modal.closeIcon", "close"),
    closeIconSize: () => getDefault("modal.closeIconSize", "medium"),
    ariaCloseLabel: () => getDefault("modal.ariaCloseLabel", "Close"),
    mobileBreakpoint: () => getDefault("modal.mobileBreakpoint"),
    teleport: () => getDefault("modal.teleport", false),
    clipScroll: () => getDefault("modal.clipScroll", false),
    component: undefined,
    props: undefined,
    events: undefined,
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /**
     * on component close event
     * @param value {string} - close event method
     */
    close: [...args: [] | [string] | CloseEventArgs<C>];
}>();

const { vTrapFocus } = useTrapFocus();

const rootRef = useTemplateRef("rootElement");
const contentRef = useTemplateRef("contentElement");

const isActive = defineModel<boolean>("active", { default: false });

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const _teleport = computed(() =>
    typeof props.teleport === "boolean"
        ? { to: getTeleportDefault(), disabled: !props.teleport }
        : { to: props.teleport, disabled: false },
);

const showX = computed(() =>
    Array.isArray(props.cancelable)
        ? props.cancelable.indexOf("x") >= 0
        : props.cancelable,
);

// TODO: Maybe remove?!
const customStyle = computed(() => ({
    width:
        !props.fullscreen && !props.fullwidth
            ? toCssDimension(props.width)
            : undefined,
    height:
        !props.fullscreen && !props.fullheight
            ? toCssDimension(props.hieght)
            : undefined,
}));

const toggleScroll = usePreventScrolling(props.clipScroll);

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

// #region --- Close Events Feature ---

if (isClient)
    if (!props.overlay)
        // register outside click event listener when is active
        useClickOutside(contentRef, onClickedOutside, {
            trigger: isActive,
        });

/** Close fixed sidebar if clicked outside. */
function onClickedOutside(event: Event): void {
    if (!isActive.value || !isAnimated.value) return;
    if (
        props.overlay ||
        (contentRef.value && !event.composedPath().includes(contentRef.value))
    )
        event.preventDefault();
    cancel("outside");
}

/** Escape key press event bound to the component root. */
function onEscapePress(): void {
    if (!isActive.value) return;
    cancel("escape");
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
    close(method);
}

/** set active to false and emit close event */
function close(...args: [] | [string] | CloseEventArgs<C>): void {
    isActive.value = false;
    emits("close", ...args);
}

// #endregion --- Close Events Feature ---

// #region --- Animation Feature ---

const isAnimated = ref(props.active);

/** Transition after-enter hook */
function afterEnter(): void {
    isAnimated.value = true;
}

/** Transition before-leave hook */
function beforeLeave(): void {
    isAnimated.value = false;
}

// #endregion --- Animation Feature ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-modal"],
    ["mobileClass", "o-modal--mobile", null, isMobile],
    ["activeClass", "o-modal--active", null, isActive],
    [
        "teleportClass",
        "o-modal--teleport",
        null,
        computed(() => !!props.teleport),
    ],
);

const overlayClasses = defineClasses(["overlayClass", "o-modal__overlay"]);

const contentClasses = defineClasses(
    ["contentClass", "o-modal__content"],
    [
        "fullScreenClass",
        "o-modal__content--full-screen",
        null,
        computed(() => props.fullscreen),
    ],
    [
        "fullheightClass",
        "o-modal__content--fullheight",
        null,
        computed(() => props.fullheight || props.fullscreen),
    ],
    [
        "fullwidthClass",
        "o-modal__content--fullwidth",
        null,
        computed(() => props.fullwidth || props.fullscreen),
    ],
);

const closeClasses = defineClasses(["closeClass", "o-modal__close"]);

// #endregion --- Computed Component Classes ---

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close });

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
        <transition
            :name="animation"
            @after-enter="afterEnter"
            @before-leave="beforeLeave">
            <div
                v-show="isActive"
                ref="rootElement"
                v-bind="$attrs"
                v-trap-focus="trapFocus && isActive"
                data-oruga="modal"
                :class="rootClasses"
                :tabindex="-1"
                :role="alert ? 'alertdialog' : 'dialog'"
                :aria-label="ariaLabel"
                :aria-modal="isActive"
                @keyup.escape="onEscapePress">
                <div
                    v-if="overlay"
                    :class="overlayClasses"
                    tabindex="-1"
                    @click="onClickedOutside" />

                <div
                    ref="contentElement"
                    :class="contentClasses"
                    :style="customStyle">
                    <!--
                        @slot Modal default content, default is content prop
                        @binding {(...args): void} close - function to close the component
                    -->
                    <slot :close="close">
                        <!-- injected component for programmatic usage -->
                        <component
                            :is="$props.component"
                            v-if="$props.component"
                            v-bind="$props.props"
                            v-on="$props.events || {}"
                            @close="close" />

                        <div v-else-if="content">{{ content }}</div>
                    </slot>

                    <CloseButton
                        v-if="showX"
                        v-show="isAnimated"
                        :pack="iconPack"
                        :icon="closeIcon"
                        :size="closeIconSize"
                        :label="ariaCloseLabel"
                        :classes="closeClasses"
                        @click="cancel('x')">
                        <!--
                            @slot Override the close icon
                        -->
                        <slot v-if="$slots['close']" name="close" />
                    </CloseButton>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

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
    useEventListener,
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
    fullScreen: false,
    content: undefined,
    width: () => getDefault("modal.width", 960),
    animation: () => getDefault("modal.animation", "zoom-out"),
    overlay: () => getDefault("modal.overlay", true),
    cancelable: () => getDefault("modal.cancelable"),
    closeable: () => getDefault("modal.closeable", true),
    closeOnOutside: () => getDefault("modal.closeOnOutside", true),
    closeOnEscape: () => getDefault("modal.closeOnEscape", true),
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
     * on active state changes to false
     * @param event {Event} - native event
     */
    close: [...args: [] | [Event] | CloseEventArgs<C>];
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

const customStyle = computed(() =>
    !props.fullScreen ? { maxWidth: toCssDimension(props.width) } : null,
);

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

// #region --- Events Feature ---

const showX = computed(
    () =>
        props.closeable ??
        (Array.isArray(props.cancelable)
            ? props.cancelable.indexOf("x") >= 0
            : props.cancelable),
);

if (isClient) {
    // register onKeyup event listener when is active
    useEventListener(rootRef, "keyup", onKeyup, { trigger: isActive });

    if (!props.overlay)
        // register outside click event listener when is active
        useClickOutside(contentRef, onClickedOutside, {
            trigger: isActive,
        });
}

/** Keyup event listener that is bound to the root element. */
function onKeyup(event: KeyboardEvent): void {
    if (!props.closeOnEscape) return;
    if (!checkCanelable("escape")) return;
    if (!isActive.value) return;
    if (event.key === "Escape" || event.key === "Esc") close(event);
}

/** Click outside event listener. */
function onClickedOutside(event: Event): void {
    if (!props.closeOnOutside) return;
    if (!checkCanelable("outside")) return;
    if (!isActive.value || !isAnimated.value) return;
    if (
        props.overlay ||
        (contentRef.value && !event.composedPath().includes(contentRef.value))
    )
        event.preventDefault();
    close(event);
}

/** check if method is cancelable (for deprecreated check) */
function checkCanelable(
    method: Exclude<typeof props.cancelable, boolean>[number],
): boolean {
    return (
        (typeof props.cancelable === "boolean" && !props.cancelable) ||
        !props.cancelable ||
        (Array.isArray(props.cancelable) && !props.cancelable.includes(method))
    );
}

/** set active to false and emit close event */
function close(...args: [] | [Event] | CloseEventArgs<C>): void {
    isActive.value = false;
    emits("close", ...args);
}

// #endregion --- Events Feature ---

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
                        :is="$props.component"
                        v-if="$props.component"
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

                    <CloseButton
                        v-if="showX"
                        v-show="isAnimated"
                        :pack="iconPack"
                        :icon="closeIcon"
                        :size="closeIconSize"
                        :label="ariaCloseLabel"
                        :classes="closeClasses"
                        @click="checkCanelable('x') && close($event)">
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

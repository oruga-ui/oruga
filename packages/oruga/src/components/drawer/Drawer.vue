<script setup lang="ts" generic="C extends Component">
import {
    computed,
    nextTick,
    watch,
    onMounted,
    onBeforeUnmount,
    ref,
    useId,
    useTemplateRef,
    type Component,
} from "vue";

import OLoading from "@/components/loading/Loading.vue";
import OButton from "@/components/button/Button.vue";
import CloseButton from "@/components/utils/CloseButton.vue";

import { getDefault } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    unrefElement,
    useAnimationsAPI,
    useMatchMedia,
    usePreventScrolling,
    useTeleport,
} from "@/composables";

import type { AnimationName } from "@/types";
import type { DrawerProps } from "./props";

/**
 * A drawer is a panel that slides in from the edge of the viewport.
 * It is based on the native `<dialog>` element.
 * @displayName Drawer
 * @style _drawer.scss
 */
defineOptions({
    isOruga: true,
    name: "ODrawer",
    configField: "drawer",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<DrawerProps<C>>(), {
    override: undefined,
    active: false,
    title: undefined,
    subtitle: undefined,
    content: undefined,
    loading: undefined,
    loadingLabel: undefined,
    backdrop: () => getDefault("drawer.backdrop", false),
    position: () => getDefault("drawer.position", "left"),
    fullscreen: false,
    resizable: () => getDefault("drawer.resizable", false),
    animation: () => getDefault("drawer.animation"),
    closeOnBackdrop: () => getDefault("drawer.closeOnBackdrop", true),
    closeable: () => getDefault("drawer.closeable", false),
    closeOnEscape: () => getDefault("drawer.closeOnEscape", true),
    closeOnConfirm: () => getDefault("drawer.closeOnConfirm", false),
    blockScroll: () => getDefault("drawer.blockScroll", false),
    iconPack: () => getDefault("drawer.iconPack"),
    closeIcon: () => getDefault("drawer.closeIcon", "close"),
    closeIconSize: () => getDefault("drawer.closeIconSize"),
    ariaCloseLabel: () => getDefault("drawer.ariaCloseLabel", "Close"),
    ariaResizeLabel: () => getDefault("drawer.ariaResizeLabel", "Resize"),
    confirmButton: undefined,
    confirmVariant: undefined,
    disableConfirm: undefined,
    cancelButton: undefined,
    cancelVariant: undefined,
    disableCancel: undefined,
    buttonPosition: undefined,
    ariaLabel: undefined,
    ariaDescribedby: undefined,
    mobileBreakpoint: () => getDefault("drawer.mobileBreakpoint"),
    teleport: () => getDefault("drawer.teleport", false),
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
     * the event is fired when the drawer has been closed
     * @param event {Event} - native event
     * @param value {String | undefined} - an optional return value
     */
    close: [event: Event, value?: string];
    /**
     * the event is fired when the user wish to dismiss the current open drawer
     * @param event {Event} - native event
     * @param value {String | undefined} - an optional return value
     */
    cancel: [event: Event, value?: string];
    /**
     * the event is fired when the confirm button get clicked
     */
    confirm: [];
    /**
     * the event is fired when the user resizes the drawer
     * @param size {number} - the new size in px
     */
    resize: [size: number];
}>();

defineSlots<{
    /**
     * Override the header
     * @param close {(returnValue?: string): void} - function to close the drawer
     * @param confirm {(): void} - function to emit a `confirm` event
     */
    header?(props: {
        close: (returnValue?: string) => void;
        confirm: () => void;
    }): void;
    /** Override the header title, default is title prop */
    title?(): void;
    /** Override the header subtitle, default is subtitle prop */
    subtitle?(): void;
    /** Define a custom close icon */
    close?(): void;
    /**
     * Override the default drawer body
     * @param close {(returnValue?: string): void} - function to close the drawer
     * @param confirm {(): void} - function to emit a `confirm` event
     */
    default?(props: {
        close: (returnValue?: string) => void;
        confirm: () => void;
    }): void;
    /**
     * Override the body content, default is content prop
     * @param close {(returnValue?: string): void} - function to close the drawer
     * @param confirm {(): void} - function to emit a `confirm` event
     */
    content?(props: {
        close: (returnValue?: string) => void;
        confirm: () => void;
    }): void;
    /**
     * Override the footer
     * @param close {(returnValue?: string): void} - function to close the drawer
     * @param confirm {(): void} - function to emit a `confirm` event
     */
    footer?(props: {
        close: (returnValue?: string) => void;
        confirm: () => void;
    }): void;
    /** Define the cancel button label */
    cancelButton?(): void;
    /** Define the confirm button label */
    confirmButton?(): void;
}>();

const rootRef = useTemplateRef("rootElement");

const cancelButtonRef = useTemplateRef("cancelButton");
const confirmButtonRef = useTemplateRef("confirmButton");

const titleId = useId();

const isActive = defineModel<boolean>("active", { default: false });

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const _teleport = useTeleport(() => props.teleport);

// #region --- Animation Feature ---

const { play, canPlay } = useAnimationsAPI();

/** The default animation of each position, which slides the drawer in from its edge. */
const POSITION_ANIMATIONS = {
    left: "slide-from-left",
    right: "slide-from-right",
    top: "slide-from-top",
    bottom: "slide-from-bottom",
} as const satisfies Record<
    NonNullable<DrawerProps["position"]>,
    AnimationName
>;

/** The animation preset to play on open and close. */
const animationName = computed<AnimationName | false>(() =>
    props.animation === undefined
        ? POSITION_ANIMATIONS[props.position]
        : props.animation,
);

/**
 * Whether a deferred (animated) close is currently in flight.
 * Guards against a stale animation callback closing the dialog after a reopen reversed the leave animation.
 */
let isClosing = false;

// #endregion --- Animation Feature ---

// #region --- Dialog Feature ---

/**
 * Specifies the types of user actions that can be used to close the dialog.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby
 */
const closedBy = computed(() => {
    // can be dismissed when the user clicks outside of the panel or with a close request
    if (props.closeOnBackdrop && !props.fullscreen) return "any";
    // can be dismissed with a close request like the escape key
    if (props.closeOnEscape) return "closerequest";
    // can only be dismissed by the application
    return "none";
});

/** Whether the browser supports the `closedby` attribute of the dialog element. */
function supportsClosedBy(): boolean {
    return isClient && "closedBy" in HTMLDialogElement.prototype;
}

/**
 * Whether the escape key is currently pressed.
 * The `closedby="any"` value does not allow to distinguish an escape key close request from a light dismiss,
 * but the key event is fired before the cancel event.
 */
let isEscapePressed = false;

function onKeydown(event: KeyboardEvent): void {
    if (event.key === "Escape") isEscapePressed = true;
}

function onKeyup(event: KeyboardEvent): void {
    if (event.key === "Escape") isEscapePressed = false;
}

// an initially active drawer (e.g. programmatic usage) is opened with the enter animation
onMounted(() => {
    if (isActive.value) enter();
});

watch(
    isActive,
    (value) => {
        if (value) enter();
        else leave();
    },
    { flush: "post" },
);

/** Open the native dialog and play the enter animation. */
function enter(): void {
    if (!rootRef.value) return;

    if (rootRef.value.open) {
        // a deferred close was interrupted by a reopen:
        // reverse the leave animation back to visible instead of opening again
        if (isClosing) {
            isClosing = false;
            play(rootRef.value, animationName.value, true);
        }
        return;
    }

    openDialog();
    measureSize();
    play(rootRef.value, animationName.value, true);
}

/**
 * Play the leave animation and close the native dialog afterwards,
 * otherwise the drawer would disappear before it has been animated out.
 * @param returnValue - optional return value of the dialog
 */
function leave(returnValue?: string): void {
    if (!rootRef.value) return;

    // close immediately when there is nothing to animate
    if (!canPlay(rootRef.value, animationName.value)) {
        isClosing = false;
        rootRef.value.close(returnValue);
        return;
    }

    // already animating out
    if (isClosing) return;

    isClosing = true;
    play(rootRef.value, animationName.value, false).then(() => {
        // a reopen reversed the animation - stay open
        if (!isClosing) return;
        isClosing = false;
        rootRef.value?.close(returnValue);
    });
}

/** Show the dialog as modal with backdrop when a backdrop is set, otherwise as non-modal. */
function openDialog(): void {
    if (!rootRef.value || rootRef.value.open) return;
    // reset the return value on each open
    rootRef.value.returnValue = "";
    if (props.backdrop) rootRef.value.showModal();
    else rootRef.value.show();
}

/** Close the dialog. This also restores the focus to the previous focused element. */
function closeDialog(): void {
    if (!rootRef.value?.open) return;
    rootRef.value.close();
}

onBeforeUnmount(() => {
    isClosing = false;
    closeDialog();
});

// #endregion --- Dialog Feature ---

// #region --- Scroll Feature ---

const toggleScroll = usePreventScrolling(() => props.blockScroll);

watch(() => isActive.value && props.backdrop, toggleScroll, {
    immediate: true,
    flush: "post",
});

// #endregion --- Scroll Feature ---

// #region --- Events Feature ---

/**
 * Native dialog cancel event, which get triggered by a close request (e.g. escape key) or a light dismiss.
 * Escape handling of nested dialogs and popovers is already handled by the browser.
 */
function onCancel(event: Event): void {
    // take control over the native close request to be able to animate the leave
    event.preventDefault();
    emits("cancel", event, rootRef.value?.returnValue);
    if (!isActive.value) return;
    // the escape key must not close the drawer, even if `closedby="any"` allows it for the light dismiss.
    // without `closedby` support, every cancel event is a close request.
    const isEscape = isEscapePressed || !supportsClosedBy();
    isEscapePressed = false;
    if (isEscape && !props.closeOnEscape) return;
    leave();
}

/**
 * Native dialog close event, which get triggered when the dialog has been closed.
 * This is either after the leave animation or when the dialog get closed from outside, e.g. by a form.
 */
function onClose(event: Event): void {
    isClosing = false;
    isResizing.value = false;
    isActive.value = false;
    emits("close", event, rootRef.value?.returnValue);
}

/**
 * Close the drawer. The `close` event is emitted when the dialog has been closed.
 * @param returnValue - optional return value, which is passed to the `close` event
 */
function close(returnValue?: string): void {
    if (!isActive.value) return;
    // ignore everything but strings, e.g. events which are passed by an event handler
    leave(typeof returnValue === "string" ? returnValue : undefined);
}

/** Emit a confirm event when active. */
function confirm(): void {
    if (!isActive.value) return;
    emits("confirm");
    if (props.closeOnConfirm) leave("confirm");
}

// #endregion --- Trigger Handler ---

// #region --- Focus Feature ---

function focusCancelButton(): void {
    nextTick(() => unrefElement(cancelButtonRef)?.focus());
}

function focusConfirmButton(): void {
    nextTick(() => unrefElement(confirmButtonRef)?.focus());
}

// #endregion --- Focus Feature ---

// #region --- Resize Feature ---

/** The smallest size in px a resizable drawer can be resized to, even if the CSS allows a smaller one. */
const DEFAULT_MIN_SIZE = 100;
/** Resize step of the arrow keys in px. */
const KEY_STEP = 10;
/** Resize step of the arrow keys in px when the shift key is pressed. */
const KEY_STEP_LARGE = 50;

/** The drawer is resized in height for the positions top and bottom, otherwise in width. */
const isHeight = computed(
    () => props.position === "top" || props.position === "bottom",
);

/** Whether the drawer can be resized by the user. */
const isResizable = computed(() => props.resizable && !props.fullscreen);

/** The drawer grows when the pointer moves away from the edge it is attached to. */
const growsWithPointer = computed(
    () => props.position === "left" || props.position === "top",
);

/** The size in px which is defined by the user. */
const size = ref<number>();
/** The measured size in px of the drawer. */
const measuredSize = ref<number>();
/** The current size limits in px. */
const sizeLimits = ref({ min: DEFAULT_MIN_SIZE, max: 0 });
const isResizing = ref(false);

const currentSize = computed(() => size.value ?? measuredSize.value);

const resizeStyle = computed(() => {
    if (!isResizable.value || size.value === undefined) return undefined;
    return isHeight.value
        ? { height: `${size.value}px` }
        : { width: `${size.value}px` };
});

// the user defined size does not apply to another position
watch(
    () => props.position,
    () => {
        size.value = undefined;
        if (isActive.value) nextTick(measureSize);
    },
);

/**
 * Get the size limits in px.
 * The limits are defined by the CSS min and max size of the drawer and the viewport.
 */
function getLimits(): { min: number; max: number } {
    if (!isClient) return { min: DEFAULT_MIN_SIZE, max: 0 };

    const viewport = isHeight.value ? window.innerHeight : window.innerWidth;

    // a computed value of `none` or `auto` is no number
    const style = rootRef.value
        ? window.getComputedStyle(rootRef.value)
        : undefined;
    const cssMin = parseFloat(
        (isHeight.value ? style?.minHeight : style?.minWidth) ?? "",
    );
    const cssMax = parseFloat(
        (isHeight.value ? style?.maxHeight : style?.maxWidth) ?? "",
    );

    const max = Math.min(Number.isFinite(cssMax) ? cssMax : viewport, viewport);
    const min = Math.min(
        Math.max(Number.isFinite(cssMin) ? cssMin : 0, DEFAULT_MIN_SIZE),
        max,
    );
    return { min, max };
}

/** Measure the current size of the dialog. */
function measureSize(): void {
    if (!rootRef.value) return;
    measuredSize.value = isHeight.value
        ? rootRef.value.offsetHeight
        : rootRef.value.offsetWidth;
    sizeLimits.value = getLimits();
}

/** Set the size in px, limited by the size limits. */
function setSize(value: number): void {
    const limits = getLimits();
    sizeLimits.value = limits;
    const next = Math.round(Math.min(Math.max(value, limits.min), limits.max));
    if (next === size.value) return;
    size.value = next;
    emits("resize", next);
}

let startPointer = 0;
let startSize = 0;

function getPointer(event: PointerEvent): number {
    return isHeight.value ? event.clientY : event.clientX;
}

function onResizeStart(event: PointerEvent): void {
    if (!rootRef.value) return;

    const handle = event.currentTarget as HTMLElement;

    // prevent text selection while dragging
    event.preventDefault();
    // all following pointer events are sent to the handle,
    // which also keeps a drag that ends outside of the drawer from being a light dismiss
    if (typeof handle.setPointerCapture === "function")
        handle.setPointerCapture(event.pointerId);
    // preventing the default also prevents the focus
    handle.focus();

    isResizing.value = true;
    startPointer = getPointer(event);
    startSize = isHeight.value
        ? rootRef.value.offsetHeight
        : rootRef.value.offsetWidth;
}

function onResizeMove(event: PointerEvent): void {
    if (!isResizing.value) return;
    const delta = getPointer(event) - startPointer;
    setSize(startSize + (growsWithPointer.value ? delta : -delta));
}

function onResizeEnd(event: PointerEvent): void {
    if (!isResizing.value) return;
    isResizing.value = false;
    const handle = event.currentTarget as HTMLElement;
    if (
        typeof handle.hasPointerCapture === "function" &&
        handle.hasPointerCapture(event.pointerId)
    )
        handle.releasePointerCapture(event.pointerId);
}

/** The arrow keys which increase the size of the drawer, depending on its position. */
const INCREASE_KEYS = {
    left: "ArrowRight",
    right: "ArrowLeft",
    top: "ArrowDown",
    bottom: "ArrowUp",
} as const satisfies Record<NonNullable<DrawerProps["position"]>, string>;

const DECREASE_KEYS = {
    left: "ArrowLeft",
    right: "ArrowRight",
    top: "ArrowUp",
    bottom: "ArrowDown",
} as const satisfies Record<NonNullable<DrawerProps["position"]>, string>;

function onResizeKeydown(event: KeyboardEvent): void {
    const step = event.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
    const current = currentSize.value ?? 0;
    const limits = getLimits();

    let next: number;
    if (event.key === INCREASE_KEYS[props.position]) next = current + step;
    else if (event.key === DECREASE_KEYS[props.position]) next = current - step;
    else if (event.key === "Home") next = limits.min;
    else if (event.key === "End") next = limits.max;
    else return;

    event.preventDefault();
    setSize(next);
}

// #endregion --- Resize Feature ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-drawer"],
    ["mobileClass", "o-drawer--mobile", null, isMobile],
    ["activeClass", "o-drawer--active", null, isActive],
    [
        "teleportClass",
        "o-drawer--teleport",
        null,
        computed(() => !!props.teleport),
    ],
    [
        "positionClass",
        "o-drawer--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
    [
        "fullscreenClass",
        "o-drawer--fullscreen",
        null,
        computed(() => props.fullscreen),
    ],
    ["resizableClass", "o-drawer--resizable", null, isResizable],
    ["resizingClass", "o-drawer--resizing", null, isResizing],
);

const resizeHandleClasses = defineClasses([
    "resizeHandleClass",
    "o-drawer__resize-handle",
]);

const headerClasses = defineClasses(["headerClass", "o-drawer__header"]);

const titleClasses = defineClasses(["titleClass", "o-drawer__header-title"]);

const subtitleClasses = defineClasses([
    "subtitleClass",
    "o-drawer__header-subtitle",
]);

const closeClasses = defineClasses(["closeClass", "o-drawer__close"]);

const bodyClasses = defineClasses(["bodyClass", "o-drawer__body"]);

const footerClasses = defineClasses(
    ["footerClass", "o-drawer__footer"],
    [
        "footerPositionClass",
        "o-drawer__footer--",
        computed(() => props.buttonPosition),
        computed(() => !!props.buttonPosition),
    ],
);

const confirmButtonClasses = defineClasses([
    "confirmButtonClass",
    "o-drawer__confirm-button",
]);

const cancelButtonClasses = defineClasses([
    "cancelButtonClass",
    "o-drawer__cancel-button",
]);

// #endregion --- Computed Component Classes ---

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close, confirm });

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
        <dialog
            ref="rootElement"
            v-bind="$attrs"
            data-oruga="drawer"
            :class="rootClasses"
            :style="resizeStyle"
            :closedby="closedBy"
            :aria-label="ariaLabel"
            :aria-labelledby="$slots['title'] || title ? titleId : undefined"
            :aria-describedby="ariaDescribedby"
            @keydown="onKeydown"
            @keyup="onKeyup"
            @cancel="onCancel"
            @close="onClose">
            <!-- Header -->
            <header
                v-if="
                    $slots['header'] ||
                    $slots['title'] ||
                    $slots['subtitle'] ||
                    title ||
                    subtitle ||
                    closeable
                "
                :class="headerClasses">
                <slot name="header" :close="close" :confirm="confirm">
                    <h1
                        v-if="$slots['title'] || title"
                        :id="titleId"
                        :class="titleClasses">
                        <slot name="title"> {{ title }} </slot>
                    </h1>

                    <h2
                        v-if="$slots['subtitle'] || subtitle"
                        :class="subtitleClasses">
                        <slot name="subtitle"> {{ subtitle }} </slot>
                    </h2>
                </slot>

                <CloseButton
                    v-if="closeable"
                    :pack="iconPack"
                    :icon="closeIcon"
                    :size="closeIconSize"
                    :label="ariaCloseLabel"
                    :classes="closeClasses"
                    @click="close()">
                    <slot v-if="$slots['close']" name="close" />
                </CloseButton>
            </header>

            <!-- Body -->
            <div
                v-if="
                    $slots['default'] ||
                    $slots['content'] ||
                    component ||
                    content
                "
                :class="bodyClasses">
                <slot :close="close" :confirm="confirm">
                    <!-- injected component for programmatic usage -->
                    <component
                        :is="component"
                        v-if="component"
                        v-bind="$props.props"
                        v-on="$props.events || {}"
                        @close="close" />

                    <slot name="content" :close="close" :confirm="confirm">
                        {{ content }}
                    </slot>
                </slot>
            </div>

            <!-- Loading -->
            <o-loading
                :active="loading"
                :full-page="false"
                :label="loadingLabel"
                :icon-pack="iconPack" />

            <!-- Footer -->
            <footer
                v-if="$slots['footer'] || cancelButton || confirmButton"
                :class="footerClasses">
                <slot name="footer" :close="close" :confirm="confirm">
                    <OButton
                        v-if="cancelButton || $slots['cancelButton']"
                        ref="cancelButton"
                        :class="cancelButtonClasses"
                        :label="cancelButton"
                        :variant="cancelVariant"
                        :disabled="disableCancel"
                        @click="close('cancel')"
                        @keyup.right="focusConfirmButton">
                        <slot name="cancelButton">
                            {{ cancelButton }}
                        </slot>
                    </OButton>

                    <OButton
                        v-if="confirmButton || $slots['confirmButton']"
                        ref="confirmButton"
                        :class="confirmButtonClasses"
                        :label="confirmButton"
                        :variant="confirmVariant"
                        :disabled="disableConfirm"
                        :loading="loading"
                        @click="confirm"
                        @keyup.left="focusCancelButton">
                        <slot name="confirmButton">
                            {{ confirmButton }}
                        </slot>
                    </OButton>
                </slot>
            </footer>

            <!-- Resize handle -->
            <div
                v-if="isResizable"
                role="separator"
                tabindex="0"
                :class="resizeHandleClasses"
                :style="{ touchAction: 'none' }"
                :aria-orientation="isHeight ? 'horizontal' : 'vertical'"
                :aria-label="ariaResizeLabel"
                :aria-valuenow="currentSize"
                :aria-valuemin="sizeLimits.min"
                :aria-valuemax="sizeLimits.max"
                @pointerdown="onResizeStart"
                @pointermove="onResizeMove"
                @pointerup="onResizeEnd"
                @pointercancel="onResizeEnd"
                @keydown="onResizeKeydown" />
        </dialog>
    </Teleport>
</template>

<script setup lang="ts" generic="C extends Component">
import {
    computed,
    nextTick,
    onMounted,
    useId,
    useTemplateRef,
    watch,
    type Component,
} from "vue";

import OLoading from "@/components/loading/Loading.vue";
import OButton from "@/components/button/Button.vue";
import CloseButton from "@/components/utils/CloseButton.vue";

import { getDefault } from "@/utils/config";
import { toCssDimension } from "@/utils/helpers";
import {
    defineClasses,
    getTeleportDefault,
    unrefElement,
    useMatchMedia,
    usePreventScrolling,
} from "@/composables";

import type { DialogProps } from "./props";

/**
 * Dialog is a container to display content in an overlay window.
 * @experimental
 * @displayName Dialog
 * @style _dialog.scss
 */
defineOptions({
    isOruga: true,
    name: "ODialog",
    configField: "dialog",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<DialogProps<C>>(), {
    override: undefined,
    active: false,
    fullscreen: false,
    animation: () => getDefault("dialog.animation", "zoom-out"),
    backdrop: () => getDefault("dialog.backdrop", true),
    maxWidth: () => getDefault("dialog.maxWidth", "80vw"),
    maxHeight: () => getDefault("dialog.maxHeight", "80vh"),
    closeable: () => getDefault("dialog.closeable", false),
    closeOnBackdrop: () => getDefault("dialog.closeOnBackdrop", true),
    closeOnEscape: () => getDefault("dialog.closeOnEscape", true),
    closeOnConfirm: () => getDefault("dialog.closeOnConfirm", false),
    blockScroll: () => getDefault("dialog.blockScroll", true),
    textPosition: undefined,
    title: undefined,
    subtitle: undefined,
    content: undefined,
    imageSrc: undefined,
    imageAlt: undefined,
    component: undefined,
    props: undefined,
    events: undefined,
    loading: undefined,
    loadingLabel: undefined,
    iconPack: () => getDefault("dialog.iconPack"),
    closeIcon: () => getDefault("dialog.closeIcon", "close"),
    closeIconSize: () => getDefault("dialog.closeIconSize"),
    ariaCloseLabel: () => getDefault("dialog.ariaCloseLabel", "Close"),
    confirmButton: undefined,
    confirmVariant: undefined,
    disableConfirm: undefined,
    cancelButton: undefined,
    cancelVariant: undefined,
    disableCancel: undefined,
    buttonPosition: undefined,
    mobileBreakpoint: () => getDefault("dialog.mobileBreakpoint"),
    teleport: () => getDefault("dialog.teleport", false),
    ariaLabel: undefined,
    ariaDescribedby: undefined,
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /**
     * the event is fired when the dialog has been closed
     * @param event {Event} - native event
     */
    close: [event: Event];
    /**
     * the event is fired when the user wish to dismiss the current open dialog
     * @param event {Event} - native event
     */
    cancel: [event: Event];
    /**
     * the event is fired when the confirm button get clicked
     * @param event {Event} native event
     */
    confirm: [event: Event];
}>();

const rootRef = useTemplateRef("rootElement");

const cancelButtonRef = useTemplateRef("cancelButton");
const confirmButtonRef = useTemplateRef("confirmButton");

const isActive = defineModel<boolean>("active", { default: false });

const titleId = useId();

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const _teleport = computed(() =>
    typeof props.teleport === "boolean"
        ? { to: getTeleportDefault(), disabled: !props.teleport }
        : { to: props.teleport, disabled: false },
);

const wrapperStyle = computed(() => ({
    maxWidth: !props.fullscreen ? toCssDimension(props.maxWidth) : undefined,
    maxHeight: !props.fullscreen ? toCssDimension(props.maxHeight) : undefined,
}));

const hasBackdrop = computed(
    () => props.backdrop || props.alert || rootRef.value?.ariaModal,
);

/** Specifies the types of user actions that can be used to close the dialog. */
const closedBy = computed(() => {
    // The dialog can be dismissed when the user clicks or taps outside it,
    // and with a platform-specific user action or a developer-specified mechanism.
    if (
        hasBackdrop.value &&
        props.closeOnBackdrop &&
        !props.alert &&
        !props.fullscreen
    )
        return "any";
    // The dialog can be dismissed with a platform-specific user action or a developer-specified mechanism.
    else if (props.closeOnEscape) return "closerequest";
    // The dialog can only be dismissed with a developer-specified mechanism.
    else return "none";
});

// #region --- Scroll Feature ---

const toggleScroll = usePreventScrolling(props.blockScroll);

watch(
    isActive,
    (value) => {
        if (hasBackdrop.value) toggleScroll(value);
    },
    { immediate: true },
);

// #endregion --- Scroll Feature ---

// #region --- Focus Feature ---

function focusCancelButton(): void {
    nextTick(() => unrefElement(cancelButtonRef)?.focus());
}

function focusConfirmButton(): void {
    nextTick(() => unrefElement(confirmButtonRef)?.focus());
}

// #endregion --- Focus Feature ---

// #region --- Trigger Handler ---

onMounted(() => toggleDialog(isActive.value));

watch(isActive, toggleDialog);

/** show of close the dialog element */
function toggleDialog(value: boolean): void {
    if (value) {
        // trigger dialog show as modal with backdrop event
        if (hasBackdrop.value) rootRef.value?.showModal();
        // trigger dialog show without backdrop event
        else rootRef.value?.show();
    } else if (rootRef.value?.open) {
        // trigger dialog close event
        rootRef.value.close();
    }
}

/** request the dialog to close when active */
function cancel(): void {
    if (!isActive.value || !rootRef.value) return;

    // dialog.requestClose() is not suported in es2020
    // trigger dialog close event
    // if (typeof rootRef.value.requestClose === "function")
    //     // requestClose is a fairly new web API that is not yet supported in all environments
    //     rootRef.value.requestClose();
    // else
    rootRef.value.close();
}

/** confirm button click event */
function confirm(event: Event): void {
    if (!isActive.value || !rootRef.value) return;

    emits("confirm", event);
    if (props.closeOnConfirm) rootRef.value.close();
}

/** native dialog close event */
function onClose(event: Event): void {
    isActive.value = false;
    emits("close", event);
}

/** native dialog cancel event */
function onCancel(event: Event): void {
    emits("cancel", event);
}

// #endregion --- Trigger Handler ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-dialog"],
    ["mobileClass", "o-dialog--mobile", null, isMobile],
    ["activeClass", "o-dialog--active", null, isActive],
    [
        "fullscreenClass",
        "o-dialog--fullscreen",
        null,
        computed(() => props.fullscreen),
    ],
    [
        "teleportClass",
        "o-dialog--teleport",
        null,
        computed(() => !!props.teleport),
    ],
);

const backdropClasses = defineClasses(["backdropClass", "o-dialog__backdrop"]);

const wrapperClasses = defineClasses(
    ["wrapperClass", "o-dialog__wrapper"],
    [
        "textPositionClass",
        "o-dialog__wrapper--",
        computed(() => props.textPosition),
        computed(() => !!props.textPosition),
    ],
);

const headerClasses = defineClasses(["headerClass", "o-dialog__header"]);

const titleClasses = defineClasses(["titleClass", "o-dialog__header-title"]);

const subtitleClasses = defineClasses([
    "subtitleClass",
    "o-dialog__header-subtitle",
]);

const closeClasses = defineClasses(["closeClass", "o-dialog__close"]);

const imageClasses = defineClasses(["imageClass", "o-dialog__image"]);

const figureClasses = defineClasses(["figureClass", "o-dialog__image-figure"]);

const bodyClasses = defineClasses(["bodyClass", "o-dialog__body"]);

const contentClasses = defineClasses([
    "contentClass",
    "o-dialog__body-content",
]);

const footerClasses = defineClasses(
    ["footerClass", "o-dialog__footer"],
    [
        "footerPositionClass",
        "o-dialog__footer--",
        computed(() => props.buttonPosition),
        computed(() => !!props.buttonPosition),
    ],
);

const confirmButtonClasses = defineClasses([
    "confirmButtonClass",
    "o-dialog__confirm-button",
]);

const cancelButtonClasses = defineClasses([
    "cancelButtonClass",
    "o-dialog__cancel-button",
]);

// #endregion --- Computed Component Classes ---

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close: cancel });

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
        <transition :name="animation">
            <!-- eslint-disable-next-line vue/require-toggle-inside-transition -->
            <dialog
                ref="rootElement"
                v-bind="$attrs"
                data-oruga="dialog"
                :class="rootClasses"
                :role="alert ? 'alertdialog' : 'dialog'"
                :closedBy="closedBy"
                :aria-label="ariaLabel"
                :aria-describedby="title ? titleId : ariaDescribedby"
                @close="onClose"
                @cancel="onCancel">
                <!-- Backdrop -->
                <div
                    v-if="backdrop && backdropClasses.length"
                    :class="backdropClasses" />

                <div :class="wrapperClasses" :style="wrapperStyle">
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
                        <!--
                            @slot Override the header
                            @binding {(event: Event): void} close - function to emit a `close` event
                        -->
                        <slot name="header" :close="cancel">
                            <h1
                                v-if="$slots['title'] || title"
                                :id="titleId"
                                :class="titleClasses">
                                <!--
                                    @slot Override the header title, default is title prop
                                -->
                                <slot name="title"> {{ title }} </slot>
                            </h1>

                            <h2
                                v-if="$slots['subtitle'] || subtitle"
                                :class="subtitleClasses">
                                <!--
                                    @slot Override the header subtitle, default is subtitle prop
                                -->
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
                            @click="cancel">
                            <!--
                                @slot Define a custom close icon
                            -->
                            <slot v-if="$slots['close']" name="close" />
                        </CloseButton>
                    </header>

                    <!-- Body -->
                    <div
                        v-if="
                            $slots['default'] ||
                            $slots['content'] ||
                            $props.component ||
                            content
                        "
                        :class="bodyClasses">
                        <!-- Image -->
                        <!--
                            @slot Override the image
                        -->
                        <slot name="image">
                            <figure v-if="imageSrc" :class="figureClasses">
                                <img
                                    :src="imageSrc"
                                    :alt="imageAlt"
                                    :class="imageClasses" />
                            </figure>
                        </slot>

                        <!--
                            @slot Override the default dialog body
                            @binding {(event: Event): void} close - function to emit a `close` event
                            @binding {(event: Event): void} confirm - function to emit a `confirm` event
                        -->
                        <slot :close="cancel" :confirm="confirm">
                            <!-- injected component for programmatic usage -->
                            <component
                                :is="$props.component"
                                v-if="$props.component"
                                v-bind="$props.props"
                                v-on="$props.events || {}"
                                @close="cancel" />

                            <p v-else :class="contentClasses">
                                <!--
                                    @slot Override the body content, default is content prop
                                    @binding {(event: Event): void} close - function to emit a `close` event
                                    @binding {(event: Event): void} confirm - function to emit a `confirm` event
                                -->
                                <slot
                                    name="content"
                                    :close="cancel"
                                    :confirm="confirm">
                                    {{ content }}
                                </slot>
                            </p>
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
                        <!--
                            @slot Override the footer
                            @binding {(event: Event): void} close - function to emit a `close` event
                            @binding {(event: Event): void} confirm - function to emit a `confirm` event
                        -->
                        <slot name="footer" :close="cancel" :confirm="confirm">
                            <OButton
                                v-if="cancelButton || $slots['cancelButton']"
                                ref="cancelButton"
                                :class="cancelButtonClasses"
                                :label="cancelButton"
                                :variant="cancelVariant"
                                :disabled="disableCancel"
                                autofocus
                                @click="cancel"
                                @keyup.right="focusConfirmButton">
                                <!--
                                    @slot Define the cancel button label
                                 -->
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
                                autofocus
                                @click="confirm"
                                @keyup.left="focusCancelButton">
                                <!--
                                    @slot Define the confirm button label
                                 -->
                                <slot name="confirmButton">
                                    {{ confirmButton }}
                                </slot>
                            </OButton>
                        </slot>
                    </footer>
                </div>
            </dialog>
        </transition>
    </Teleport>
</template>

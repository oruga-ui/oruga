<script setup lang="ts" generic="C extends Component">
import {
    computed,
    nextTick,
    onMounted,
    useTemplateRef,
    type Component,
} from "vue";

import OLoading from "@/components/loading/Loading.vue";
import OButton from "@/components/button/Button.vue";
import CloseButton from "@/components/utils/CloseButton.vue";

import { getDefault } from "@/utils/config";
import { defineClasses, findFocusable, unrefElement } from "@/composables";

import type { DialogProps } from "./props";

/**
 * A flexible and extensible content container.
 * @displayName Dialog
 * @style _dialog.scss
 */
defineOptions({
    isOruga: true,
    name: "ODialog",
    configField: "dialog",
});

const props = withDefaults(defineProps<DialogProps<C>>(), {
    override: undefined,
    title: undefined,
    subtitle: undefined,
    content: undefined,
    imageSrc: undefined,
    imageAlt: undefined,
    loading: undefined,
    loadingLabel: undefined,
    closeable: () => getDefault("dialog.closeable", false),
    iconPack: () => getDefault("dialog.iconPack"),
    closeIcon: () => getDefault("dialog.closeIcon", "close"),
    closeIconSize: () => getDefault("dialog.closeIconSize"),
    ariaCloseLabel: () => getDefault("dialog.ariaCloseLabel", "Close"),
    component: undefined,
    props: undefined,
    events: undefined,
    confirmButton: undefined,
    disableConfirm: undefined,
    confirmVariant: undefined,
    cancelButton: undefined,
    disableCancel: undefined,
    cancelVariant: undefined,
});

const emits = defineEmits<{
    /**
     * confirm button click event
     * @param event {Event} native event
     */
    confirm: [event: Event];
    /**
     * close button click event
     * @param event {Event} native event
     */
    close: [event: Event];
}>();

const rootRef = useTemplateRef("rootElement");

const cancelButtonRef = useTemplateRef("cancelButton");
const confirmButtonRef = useTemplateRef("confirmButton");

onMounted(() => {
    // focus the first element on the component
    const focusableElements = findFocusable(rootRef);
    if (focusableElements.length) focusableElements[0].focus();
});

function focusCancelButton(): void {
    nextTick(() => unrefElement(cancelButtonRef.value)?.focus());
}

function focusConfirmButton(): void {
    nextTick(() => unrefElement(confirmButtonRef.value)?.focus());
}

function onClose(event: Event): void {
    emits("close", event);
}

function onConfirm(event: Event): void {
    emits("confirm", event);
}

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(["rootClass", "o-dialog"]);

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
</script>

<template>
    <div ref="rootElement" data-oruga="dialog" :class="rootClasses">
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
            <slot name="header" :close="onClose">
                <p v-if="$slots['title'] || title" :class="titleClasses">
                    <!--
                        @slot Override the header title, default is title prop
                    -->
                    <slot name="title"> {{ title }} </slot>
                </p>

                <p
                    v-if="$slots['subtitle'] || subtitle"
                    :class="subtitleClasses">
                    <!--
                        @slot Override the header subtitle, default is subtitle prop
                    -->
                    <slot name="subtitle"> {{ subtitle }} </slot>
                </p>
            </slot>

            <CloseButton
                v-if="closeable"
                :pack="iconPack"
                :icon="closeIcon"
                :size="closeIconSize"
                :label="ariaCloseLabel"
                :classes="closeClasses"
                @click="onClose">
                <!--
                    @slot Override the close icon
                -->
                <slot v-if="$slots['close']" name="close" />
            </CloseButton>
        </header>

        <!-- Image -->
        <div v-if="$slots['image'] || imageSrc" :class="imageClasses">
            <!--
                @slot Override the image
            -->
            <slot name="image">
                <figure :class="figureClasses">
                    <img :src="imageSrc" :alt="imageAlt" />
                </figure>
            </slot>
        </div>

        <!-- Body -->
        <div
            v-if="$slots['default'] || $slots['content'] || content"
            :class="bodyClasses">
            <!--
                @slot Override the default dialog body
                @binding {(event: Event): void} close - function to emit a `close` event
                @binding {(event: Event): void} confirm - function to emit a `confirm` event
            -->
            <slot :close="onClose" :confirm="onConfirm">
                <!-- injected component for programmatic usage -->
                <component
                    :is="$props.component"
                    v-if="$props.component"
                    v-bind="$props.props"
                    v-on="$props.events || {}"
                    @close="onClose" />

                <p v-else :class="contentClasses">
                    <!--
                        @slot Override the body content, default is content prop
                        @binding {(event: Event): void} close - function to emit a `close` event
                        @binding {(event: Event): void} confirm - function to emit a `confirm` event
                    -->
                    <slot name="content" :close="onClose" :confirm="onConfirm">
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
            <slot name="footer" :close="onClose" :confirm="onConfirm">
                <OButton
                    v-if="cancelButton"
                    ref="cancelButton"
                    :class="cancelButtonClasses"
                    :label="cancelButton"
                    :variant="cancelVariant"
                    :disabled="disableCancel"
                    @click="onClose"
                    @keyup.right="focusConfirmButton">
                    <slot name="cancelButton"> {{ cancelButton }} </slot>
                </OButton>

                <OButton
                    v-if="confirmButton"
                    ref="confirmButton"
                    :class="confirmButtonClasses"
                    :label="confirmButton"
                    :variant="confirmVariant"
                    :disabled="disableConfirm"
                    :loading="loading"
                    @click="onConfirm"
                    @keyup.left="focusCancelButton">
                    <slot name="confirmButton"> {{ confirmButton }} </slot>
                </OButton>
            </slot>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { getDefault } from "@/utils/config";
import { defineClasses } from "@/composables";

import OLoading from "@/components/loading/Loading.vue";
import CloseButton from "@/components/utils/CloseButton.vue";

import type { CardProps } from "./props";

/**
 * A flexible and extensible content container.
 * @displayName Card
 * @style _card.scss
 */
defineOptions({
    isOruga: true,
    name: "OCard",
    configField: "card",
});

withDefaults(defineProps<CardProps>(), {
    override: undefined,
    title: undefined,
    subtitle: undefined,
    content: undefined,
    imageSrc: undefined,
    imageAlt: undefined,
    loading: undefined,
    loadingLabel: undefined,
    closeable: () => getDefault("card.closeable", false),
    iconPack: () => getDefault("card.iconPack"),
    closeIcon: () => getDefault("card.closeIcon", "close"),
    closeIconSize: () => getDefault("card.closeIconSize"),
    ariaCloseLabel: () => getDefault("card.ariaCloseLabel", "Close"),
    component: undefined,
    props: undefined,
    events: undefined,
});

const emits = defineEmits<{
    /**
     * close button click event
     * @param event {Event} - native event
     */
    close: [event: Event];
}>();

defineSlots<{
    /**
     * Override the header
     * @param close {(event: Event): void} - function to emit a `close` event
     */
    header?(): void;
    /** Override the header title, default is title prop */
    title?(): void;
    /** Override the header subtitle, default is subtitle prop */
    subtitle?(): void;
    /** Override the close icon */
    close?(): void;
    /** Override the image */
    image?(): void;
    /**
     * Override the default card body
     * @param close {(event: Event): void} - function to emit a `close` event
     */
    default?(): void;
    /**
     * Override the body content, default is content prop
     * @param close {(event: Event): void} - function to emit a `close` event
     */
    content?(): void;
    /**
     * Override the footer
     * @param close {(event: Event): void} - function to emit a `close` event
     */
    footer?(): void;
}>();

function onClose(event: Event): void {
    emits("close", event);
}

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(["rootClass", "o-card"]);

const headerClasses = defineClasses(["headerClass", "o-card__header"]);

const titleClasses = defineClasses(["titleClass", "o-card__header_title"]);

const subtitleClasses = defineClasses([
    "subtitleClass",
    "o-card__header_subtitle",
]);

const closeClasses = defineClasses(["closeClass", "o-card__close"]);

const imageClasses = defineClasses(["imageClass", "o-card__image"]);

const figureClasses = defineClasses(["figureClass", "o-card__image__figure"]);

const bodyClasses = defineClasses(["bodyClass", "o-card__body"]);

const contentClasses = defineClasses(["contentClass", "o-card__body__content"]);

const footerClasses = defineClasses(["footerClass", "o-card__footer"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <div data-oruga="card" :class="rootClasses">
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
            <slot name="header" :close="onClose">
                <p v-if="$slots['title'] || title" :class="titleClasses">
                    <slot name="title"> {{ title }} </slot>
                </p>

                <p
                    v-if="$slots['subtitle'] || subtitle"
                    :class="subtitleClasses">
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
                <slot v-if="$slots['close']" name="close" />
            </CloseButton>
        </header>

        <!-- Image -->
        <div v-if="$slots['image'] || imageSrc" :class="imageClasses">
            <slot name="image">
                <figure :class="figureClasses">
                    <img :src="imageSrc" :alt="imageAlt" />
                </figure>
            </slot>
        </div>

        <!-- Body -->
        <div
            v-if="$slots['body'] || $slots['content'] || content"
            :class="bodyClasses">
            <slot :close="onClose">
                <!-- injected component for programmatic usage -->
                <component
                    :is="$props.component"
                    v-if="$props.component"
                    v-bind="$props.props"
                    v-on="$props.events || {}"
                    @close="onClose" />

                <p v-else :class="contentClasses">
                    <slot name="content" :close="onClose">
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
        <footer v-if="$slots['footer']" :class="footerClasses">
            <slot name="footer" :close="onClose" />
        </footer>
    </div>
</template>

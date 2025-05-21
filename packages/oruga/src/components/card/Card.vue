<script setup lang="ts">
import { computed } from "vue";

import { getDefault } from "@/utils/config";
import { defineClasses } from "@/composables";

import type { ButtonProps } from "./props";

/**
 * An all-around flexible and composable content container.
 * @displayName Card
 * @style _card.scss
 */
defineOptions({
    isOruga: true,
    name: "OCard",
    configField: "card",
});

const props = withDefaults(defineProps<ButtonProps>(), {
    override: undefined,
});

// --- Computed Component Classes ---

const rootClasses = defineClasses(["rootClass", "o-button"]);
</script>

<template>
    <div data-oruga="card" :class="rootClasses">
        <header class="card-header">
            <slot name="header">
                <p class="card-header-title">Card header</p>
            </slot>

            <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>

            <button
                v-if="closable"
                :class="closeClasses"
                :aria-label="ariaCloseLabel"
                @click="$emits('close', $event)">
                <o-icon
                    clickable
                    :pack="iconPack"
                    :icon="closeIcon"
                    :size="closeIconSize"
                    both />
            </button>
        </header>

        <div class="card-image">
            <slot name="image">
                <figure class="image is-4by3">
                    <img
                        src="https://bulma.io/assets/images/placeholders/1280x960.png"
                        alt="Placeholder image" />
                </figure>
            </slot>
        </div>

        <div class="card-body">
            <slot name="body">
                <h5 class="card-title">
                    <slot name="title">Card title</slot>
                </h5>

                <h6 class="card-subtitle">
                    <slot name="subtitle">Card subtitle </slot>
                </h6>

                <p class="card-text">
                    <slot name="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris.
                    </slot>
                </p>
            </slot>
        </div>

        <footer class="card-footer">
            <slot name="footer" />
        </footer>
    </div>
</template>

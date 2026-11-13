<script setup lang="ts">
import { computed, ref } from "vue";
import type { AnimationName } from "@oruga-ui/oruga-next";

const isActive = ref(false);

// the select works with strings only, so "none" stands in for `false`
const selected = ref<AnimationName | "none">("zoom-in");

/** `false` disables the animation */
const animation = computed<AnimationName | false>(() =>
    selected.value === "none" ? false : selected.value,
);
</script>

<template>
    <section>
        <o-field label="Animation">
            <o-select v-model="selected">
                <option value="none">none</option>
                <option value="fade">fade</option>
                <option value="scale">scale</option>
                <option value="zoom-in">zoom-in (default)</option>
                <option value="zoom-out">zoom-out</option>
                <option value="slide-up">slide-up</option>
                <option value="slide-down">slide-down</option>
            </o-select>
        </o-field>

        <o-button
            label="Open Dialog"
            variant="primary"
            aria-haspopup="dialog"
            @click="isActive = true" />

        <o-dialog
            v-model:active="isActive"
            backdrop
            closeable
            title="Animation"
            content="The animation is played when the dialog opens and closes. It is skipped when the user prefers reduced motion."
            :animation="animation" />
    </section>
</template>

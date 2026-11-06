<script setup lang="ts">
import { ref } from "vue";

type Animation =
    | "fade"
    | "scale"
    | "zoom-in"
    | "zoom-out"
    | "slide-up"
    | "slide-down";

const isActive = ref(false);
/** `false` disables the animation */
const animation = ref<Animation | false>("zoom-out");
</script>

<template>
    <section>
        <o-field label="Animation">
            <o-select v-model="animation">
                <option :value="false">None</option>
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

<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);
const overlay = ref(true);
const fullheight = ref(true);
const fullwidth = ref(false);
const position = ref<"left" | "top" | "bottom" | "right">("left");
</script>

<template>
    <section>
        <o-field grouped>
            <o-switch v-model="overlay" label="Overlay" />
            <o-switch v-model="fullheight" label="Fullheight" />
            <o-switch v-model="fullwidth" label="Fullwidth" />
            <o-field label="Position">
                <o-select v-model="position" :options="['left', 'right']" />
            </o-field>
        </o-field>

        <o-button label="Show" @click="active = true" />

        <o-sidebar
            v-slot="{ close }"
            v-model:active="active"
            :fullheight="fullheight"
            :fullwidth="fullwidth"
            :overlay="overlay"
            :position="position">
            <o-button
                v-if="fullwidth"
                icon-left="times"
                label="Close"
                @click="close()" />
            <img
                width="128"
                src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
                alt="Lightweight UI components for Vue.js" />
            <h3>Example</h3>
        </o-sidebar>
    </section>
</template>

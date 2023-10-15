<script setup>
import { ref } from "vue";

const active = ref(false);
const overlay = ref(true);
const fullheight = ref(true);
const fullwidth = ref(false);
const right = ref(false);
</script>

<template>
    <section>
        <o-field grouped>
            <o-switch v-model="overlay" label="Overlay" />
            <o-switch v-model="fullheight" label="Fullheight" />
            <o-switch v-model="fullwidth" label="Fullwidth" />
            <o-switch v-model="right" label="Right" />
        </o-field>

        <o-button label="Show" @click="active = true" />

        <o-sidebar
            v-slot="{ close }"
            v-model:active="active"
            :fullheight="fullheight"
            :fullwidth="fullwidth"
            :overlay="overlay"
            :right="right">
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

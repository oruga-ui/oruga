<script setup>
import { ref } from "vue";

const open = ref(false);
const overlay = ref(true);
const fullheight = ref(true);
const fullwidth = ref(false);
const right = ref(false);
</script>

<template>
    <section>
        <o-sidebar
            v-model:open="open"
            :fullheight="fullheight"
            :fullwidth="fullwidth"
            :overlay="overlay"
            :right="right">
            <o-button
                v-if="fullwidth"
                icon-left="times"
                label="Close"
                @click="open = false" />
            <img
                width="128"
                src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
                alt="Lightweight UI components for Vue.js" />
            <h3>Example</h3>
        </o-sidebar>
        <o-field grouped group-multiline>
            <o-switch v-model="overlay">Overlay</o-switch>
            <o-switch v-model="fullheight">Fullheight</o-switch>
            <o-switch v-model="fullwidth">Fullwidth</o-switch>
            <o-switch v-model="right">Right</o-switch>
        </o-field>

        <br />

        <o-button @click="open = true">Show</o-button>
    </section>
</template>

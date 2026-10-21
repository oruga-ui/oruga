<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);
const backdrop = ref(true);
const fullscreen = ref(false);
const position = ref<"left" | "top" | "bottom" | "right">("left");
</script>

<template>
    <section>
        <o-field grouped>
            <o-switch v-model="backdrop" label="Backdrop" />
            <o-switch v-model="fullscreen" label="Fullscreen" />
            <o-field label="Position">
                <o-select v-model="position">
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                </o-select>
            </o-field>
        </o-field>

        <o-button
            label="Open Drawer"
            variant="primary"
            @click="active = true" />

        <o-drawer
            v-model:active="active"
            aria-label="Example drawer"
            :fullscreen="fullscreen"
            :closeable="fullscreen || !backdrop"
            :backdrop="backdrop"
            :position="position">
            <img
                width="128"
                src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
                alt="Lightweight UI components for Vue.js" />
            <h3>Example</h3>
        </o-drawer>
    </section>
</template>

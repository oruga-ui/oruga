<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);
const position = ref<"left" | "top" | "bottom" | "right">("left");
const size = ref<number>();
</script>

<template>
    <section>
        <o-field grouped>
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
            label="Show Drawer"
            variant="primary"
            aria-haspopup="dialog"
            @click="active = true" />

        <o-drawer
            v-model:active="active"
            resizable
            closeable
            backdrop
            title="Resizable"
            :position="position"
            @resize="size = $event">
            <p>
                Drag the edge of the drawer or use the arrow keys to resize it.
            </p>
            <p v-if="size">Current size: {{ size }}px</p>
        </o-drawer>
    </section>
</template>

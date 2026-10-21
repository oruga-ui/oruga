<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
const size = ref<"small" | "medium" | "large">("medium");
const limitHeight = ref(false);
</script>

<template>
    <section>
        <o-field grouped>
            <o-field label="Size">
                <o-select v-model="size">
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                </o-select>
            </o-field>
            <o-switch v-model="limitHeight" label="Limit the height" />
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
            title="Size"
            :size="size"
            :max-height="limitHeight ? 320 : undefined"
            cancel-button="Close">
            <p v-for="n in 6" :key="n">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                sodales leo nec convallis rutrum. Vivamus pharetra molestie arcu
                at dictum. Nulla faucibus leo eget enim egestas, in tempus justo
                venenatis.
            </p>
        </o-dialog>
    </section>
</template>

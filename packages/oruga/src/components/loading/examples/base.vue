<script setup lang="ts">
import { ref } from "vue";

const isLoading = ref(false);
const isFullPage = ref(true);

function openLoading() {
    isLoading.value = true;
    setTimeout(() => (isLoading.value = false), 10 * 1000);
}
</script>

<template>
    <section>
        <o-field>
            <o-button
                label="Launch loading"
                size="medium"
                variant="primary"
                @click="openLoading" />
        </o-field>
        <o-field>
            <o-switch
                v-model="isFullPage"
                label="Display loader over full page" />
        </o-field>
        <p style="position: relative">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
            fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit
            sapien laoreet elit
            <o-loading
                v-model:active="isLoading"
                :full-page="isFullPage"
                label="Loading..."
                :cancelable="true" />
        </p>
    </section>
</template>

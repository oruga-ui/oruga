<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

const isLoading = ref(false);
const progress = ref(0);

let timer: ReturnType<typeof setInterval> | undefined;

function startLoading(): void {
    clearInterval(timer);
    progress.value = 0;
    isLoading.value = true;

    timer = setInterval(() => {
        progress.value += 10;
        if (progress.value >= 100) finishLoading();
    }, 300);
}

function finishLoading(): void {
    clearInterval(timer);
    isLoading.value = false;
}

onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
    <section>
        <o-button
            label="Simulate page load"
            variant="primary"
            :disabled="isLoading"
            @click="startLoading" />

        <Teleport to="body">
            <div
                v-if="isLoading"
                style="
                    position: fixed;
                    top: 0;
                    right: 0;
                    left: 0;
                    z-index: 100;
                ">
                <o-progress
                    :value="progress"
                    size="small"
                    aria-label="Page loading" />
            </div>
        </Teleport>
    </section>
</template>

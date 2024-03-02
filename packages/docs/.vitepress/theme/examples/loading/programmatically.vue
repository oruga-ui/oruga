<script setup lang="ts">
import { ref } from "vue";
import { useOruga } from "../../../../../oruga/dist/oruga";

const oruga = useOruga();

const elementRef = ref<HTMLElement | null>(null);
const isFullPage = ref(true);

function openLoading() {
    const loadingComponent = oruga.loading.open({
        fullPage: isFullPage.value,
        container: isFullPage.value ? null : elementRef.value,
        overlay: !isFullPage.value,
    });
    setTimeout(() => loadingComponent.close(), 3 * 1000);
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
        <p ref="elementRef" style="position: relative">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
            fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit
            sapien laoreet elit
        </p>
    </section>
</template>

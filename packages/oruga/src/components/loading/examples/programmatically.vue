<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

const elementRef = useTemplateRef("contentElement");
const isFullPage = ref(true);

function openLoading(): void {
    const loadingComponent = oruga.loading.open(
        {
            fullPage: isFullPage.value,
        },
        isFullPage.value ? null : elementRef.value,
    );
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

        <p ref="contentElement" style="position: relative">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
            fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit
            sapien laoreet elit
        </p>
    </section>
</template>

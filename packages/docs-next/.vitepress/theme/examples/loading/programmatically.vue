<script setup>
import { ref } from "vue";
import { useProgrammatic } from "../../../../../oruga-next/dist/oruga";

const isFullPage = ref(true);

const { oruga } = useProgrammatic();

function openLoading() {
    const loadingComponent = oruga.loading.open({
        fullPage: isFullPage.value,
        container: isFullPage.value ? null : this.$refs.element,
    });
    setTimeout(() => loadingComponent.close(), 3 * 1000);
}
</script>

<template>
    <div>
        <o-field>
            <o-button
                label="Launch loading"
                size="medium"
                variant="primary"
                @click="openLoading" />
        </o-field>
        <o-field>
            <o-switch v-model="isFullPage">
                Display loader over full page
            </o-switch>
        </o-field>
        <p ref="element" style="position: relative">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
            fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit
            sapien laoreet elit
        </p>
    </div>
</template>

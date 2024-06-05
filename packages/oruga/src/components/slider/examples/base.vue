<script setup lang="ts">
import { computed, ref } from "vue";

const sliderValue = ref(10);

const sliderType = computed(() => {
    if (sliderValue.value > 25 && sliderValue.value < 75) {
        return "warning";
    } else if (sliderValue.value >= 75) {
        return "success";
    }
    return "danger";
});
</script>

<template>
    <section>
        <o-field label="Simple">
            <o-slider :model-value="8" />
        </o-field>

        <o-field label="Disabled">
            <o-slider :model-value="30" disabled />
        </o-field>

        <o-field label="Tooltip type">
            <o-slider v-model="sliderValue" :tooltip-variant="sliderType" />
        </o-field>

        <o-field label="Hide tooltip">
            <o-slider :model-value="20" :tooltip="false" />
        </o-field>

        <o-field label="Custom tooltip label">
            <o-slider
                :model-value="30"
                :custom-formatter="(val) => val + '%'" />
        </o-field>

        <o-field label="Rounded thumb">
            <o-slider :model-value="8" rounded />
        </o-field>
    </section>
</template>

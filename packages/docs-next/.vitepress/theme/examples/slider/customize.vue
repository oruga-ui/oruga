<script setup>
import { ref, computed } from "vue";

const sliderValue = ref(0);

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
        <o-field label="Tooltip type">
            <o-slider v-model="sliderValue" :tooltip-variant="sliderType" />
        </o-field>

        <o-field label="Hide tooltip">
            <o-slider :tooltip="false" />
        </o-field>

        <o-field label="Custom tooltip label">
            <o-slider :custom-formatter="(val) => val + '%'" />
        </o-field>

        <o-field label="Rounded thumb">
            <o-slider rounded />
        </o-field>
    </section>
</template>

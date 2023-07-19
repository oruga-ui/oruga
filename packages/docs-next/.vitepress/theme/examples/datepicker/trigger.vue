<script setup>
import { computed, ref } from "vue";

const selected = ref(null);
const selectedString = computed(() =>
    selected.value ? selected.value.toDateString() : "",
);
</script>

<template>
    <section>
        <o-field label="Select a date" grouped>
            <o-datepicker v-model="selected">
                <template #trigger>
                    <o-button icon-left="calendar" type="primary" />
                </template>
            </o-datepicker>
            <o-input readonly :value="selectedString" />
        </o-field>
    </section>
</template>

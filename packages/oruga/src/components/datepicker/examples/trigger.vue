<script setup lang="ts">
import { computed, ref } from "vue";

const selected = ref<Date>();

const selectedString = computed(() =>
    selected.value ? selected.value.toDateString() : "",
);
</script>

<template>
    <section>
        <o-field label="Select a date" grouped>
            <o-datepicker v-model="selected" teleport>
                <template #trigger>
                    <o-button icon-left="calendar" type="primary" />
                </template>
            </o-datepicker>

            <o-input readonly :value="selectedString" expanded />
        </o-field>
    </section>
</template>

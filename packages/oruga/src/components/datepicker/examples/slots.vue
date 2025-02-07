<script setup lang="ts">
import { computed, ref } from "vue";

const months = [
    { label: "January", value: 0 },
    { label: "February", value: 1 },
    { label: "March", value: 2 },
    { label: "April", value: 3 },
    { label: "May", value: 4 },
    { label: "June", value: 5 },
    { label: "July", value: 6 },
    { label: "August", value: 7 },
    { label: "September", value: 8 },
    { label: "October", value: 9 },
    { label: "November", value: 10 },
    { label: "December", value: 11 },
];

const selected = ref<Date | undefined>(new Date());

const selectedString = computed(() => selected.value?.toDateString() || "");

function selectMonth(month: number | undefined): void {
    if (!month) return;

    const date = selected.value ? new Date(selected.value) : new Date();
    date.setMonth(month);
    selected.value = date;
}
</script>

<template>
    <section>
        <o-field label="Select a date" grouped>
            <o-datepicker
                v-model="selected"
                :first-day-of-week="1"
                placeholder="Click to select...">
                <template #trigger>
                    <o-button icon-left="calendar" variant="primary" />
                </template>

                <template #header>
                    <o-field grouped>
                        <o-select
                            :model-value="selected?.getMonth()"
                            :options="months"
                            root-class="grow"
                            expanded
                            @update:model-value="selectMonth" />
                        <o-button
                            :label="selected?.getFullYear().toString()"
                            disabled />
                    </o-field>
                </template>

                <template #footer>
                    <div class="footer-container">
                        <o-button
                            variant="primary"
                            icon-left="calendar"
                            label="Today"
                            @click="selected = new Date()" />
                        <o-button
                            variant="danger"
                            icon-left="times"
                            label="Clear"
                            @click="selected = undefined" />
                    </div>
                </template>
            </o-datepicker>

            <o-input v-model="selectedString" readonly expanded />
        </o-field>
    </section>
</template>

<style scoped>
.footer-container {
    display: flex;
    justify-content: end;
    margin-top: 0.5rem;
}

.footer-container button {
    margin-left: 0.5rem;
}

.grow {
    flex-grow: 1;
}
</style>

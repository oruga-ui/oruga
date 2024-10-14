<script setup lang="ts">
import { ref } from "vue";

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

const date = ref<Date | undefined>(new Date());

function selectMonth(option): void {
    if (!option) return;

    date.value = date.value ? new Date(date.value) : new Date();
    date.value.setMonth(option.value);
}
</script>

<template>
    <section>
        <o-field label="Select a date">
            <o-datepicker
                v-model="date"
                :first-day-of-week="1"
                placeholder="Click to select...">
                <template #header>
                    <o-field grouped>
                        <o-autocomplete
                            :options="months"
                            root-class="grow"
                            open-on-focus
                            readonly
                            expanded
                            @select="selectMonth" />
                        <o-button
                            :label="date?.getFullYear().toString()"
                            disabled />
                    </o-field>
                </template>

                <template #footer>
                    <div class="footer-container">
                        <o-button
                            variant="primary"
                            icon-left="calendar"
                            label="Today"
                            @click="date = new Date()" />
                        <o-button
                            variant="danger"
                            icon-left="times"
                            label="Clear"
                            @click="date = undefined" />
                    </div>
                </template>
            </o-datepicker>
        </o-field>
    </section>
</template>

<style lang="scss" scoped>
.footer-container {
    display: flex;
    justify-content: end;
    margin-top: 0.5rem;

    button {
        margin-left: 0.5rem;
    }
}

.grow {
    flex-grow: 1;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const months = [
    { name: "January", value: 0 },
    { name: "February", value: 1 },
    { name: "March", value: 2 },
    { name: "April", value: 3 },
    { name: "May", value: 4 },
    { name: "June", value: 5 },
    { name: "July", value: 6 },
    { name: "August", value: 7 },
    { name: "September", value: 8 },
    { name: "October", value: 9 },
    { name: "November", value: 10 },
    { name: "December", value: 11 },
];

const date = ref<Date | null>(new Date());
const month = ref<string>();

function selectMonth(option): void {
    if (!option) return;

    date.value = date.value ? new Date(date.value) : new Date();
    date.value.setMonth(option.value);
}

onMounted(() => {
    if (!date.value) return;

    month.value = months.filter(
        (item) => item.value == date.value!.getMonth(),
    )[0].name;
});
</script>

<template>
    <section>
        <o-field label="Select a date">
            <o-datepicker
                v-model="date"
                :first-day-of-week="1"
                placeholder="Click to select...">
                <template #header>
                    <o-field>
                        <o-autocomplete
                            v-model="month"
                            root-class="grow"
                            open-on-focus
                            readonly
                            :data="months"
                            field="name"
                            expanded
                            @select="selectMonth" />
                        <o-button
                            disabled
                            :label="date?.getFullYear().toString()" />
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
                            @click="date = null" />
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

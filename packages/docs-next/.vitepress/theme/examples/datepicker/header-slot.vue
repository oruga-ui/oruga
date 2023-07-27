<script setup>
import { ref, onMounted } from "vue";

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

const date = ref(new Date());
const month = ref(null);

function selectMonth(option) {
    if (!option) return;

    date.value = new Date(date.value);
    date.value.setMonth(option.value);
}

onMounted(() => {
    month.value = months.filter(
        (item) => item.value == date.value.getMonth(),
    )[0].name;
});
</script>

<template>
    <section>
        <o-field label="Select a date">
            <o-datepicker
                :focused-date="date"
                :first-day-of-week="1"
                placeholder="Click to select...">
                <template #header>
                    <o-field>
                        <o-autocomplete
                            v-model="month"
                            open-on-focus
                            readonly
                            :data="months"
                            field="name"
                            @select="selectMonth">
                        </o-autocomplete>
                        <o-button disabled>{{ date.getFullYear() }}</o-button>
                    </o-field>
                </template>
            </o-datepicker>
        </o-field>
    </section>
</template>

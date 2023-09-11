<script setup>
const today = new Date();
const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7,
);
const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7,
);
</script>

<template>
    <section>
        <o-field label="Select a date">
            <o-datepicker
                placeholder="Click to select..."
                icon="calendar"
                :min-date="minDate"
                :max-date="maxDate" />
        </o-field>
    </section>
</template>

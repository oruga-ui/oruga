<script setup lang="ts">
import { ref } from "vue";

const minDatetime = ref<Date>();
const maxDatetime = ref<Date>();
</script>

<template>
    <section>
        <o-field grouped>
            <o-field label="Earliest allowed time">
                <o-datetimepicker
                    v-model="minDatetime"
                    placeholder="Click to select..."
                    icon="calendar" />
            </o-field>
            <o-field label="Latest allowed time">
                <o-datetimepicker
                    v-model="maxDatetime"
                    placeholder="Click to select..."
                    icon="calendar" />
            </o-field>
        </o-field>

        <o-field label="Booking time">
            <o-datetimepicker
                rounded
                placeholder="Click to select..."
                icon="calendar"
                :min-datetime="minDatetime"
                :max-datetime="maxDatetime" />
        </o-field>
    </section>
</template>

<script setup>
import { ref } from "vue";

const minDatetime = ref(null);
const maxDatetime = ref(null);
</script>

<template>
    <section>
        <o-field grouped>
            <o-field label="Min Datetime">
                <o-datetimepicker
                    v-model="minDatetime"
                    placeholder="Click to select..."
                    icon="calendar"
                    editable />
            </o-field>
            <o-field label="Max Datetime">
                <o-datetimepicker
                    v-model="maxDatetime"
                    placeholder="Click to select..."
                    icon="calendar"
                    editable />
            </o-field>
        </o-field>
        <o-field label="Select datetime">
            <o-datetimepicker
                rounded
                placeholder="Click to select..."
                icon="calendar"
                :min-datetime="minDatetime"
                :max-datetime="maxDatetime" />
        </o-field>
    </section>
</template>

<script setup>
import { ref } from "vue";

const minDatetime = ref(null);
const maxDatetime = ref(null);
</script>

<template>
    <section>
        <o-field grouped group-multiline>
            <o-field label="Min Datetime">
                <o-datetimepicker
                    v-model="minDatetime"
                    rounded
                    placeholder="Click to select..."
                    icon="calendar"
                    editable>
                </o-datetimepicker>
            </o-field>
            <o-field label="Max Datetime">
                <o-datetimepicker
                    v-model="maxDatetime"
                    rounded
                    placeholder="Click to select..."
                    icon="calendar"
                    editable>
                </o-datetimepicker>
            </o-field>
        </o-field>
        <o-field label="Select datetime">
            <o-datetimepicker
                rounded
                placeholder="Click to select..."
                icon="calendar"
                :min-datetime="minDatetime"
                :max-datetime="maxDatetime">
            </o-datetimepicker>
        </o-field>
    </section>
</template>

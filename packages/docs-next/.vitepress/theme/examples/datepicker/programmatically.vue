<script setup>
import { ref } from "vue";

const active = ref(false);
</script>

<template>
    <section>
        <o-field expanded>
            <o-datepicker
                v-model:active="active"
                expanded
                placeholder="Select a date" />
            <o-button
                icon-left="calendar"
                type="primary"
                @click="active = !active" />
        </o-field>
    </section>
</template>

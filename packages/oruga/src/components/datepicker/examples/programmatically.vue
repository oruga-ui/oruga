<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);
</script>

<template>
    <section>
        <o-field expanded addons>
            <o-datepicker
                v-model:active="active"
                expanded
                placeholder="Select a date" />
            <o-button
                icon-left="calendar"
                variant="primary"
                aria-label="Open Calendar"
                @click="active = !active" />
        </o-field>
    </section>
</template>

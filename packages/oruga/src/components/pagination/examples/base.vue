<script setup lang="ts">
import { ref } from "vue";

const page = ref(2);
</script>

<template>
    <section>
        <o-pagination v-model="page" :total="100" :per-page="10" />

        <p><b>Current:</b> {{ page }}</p>
    </section>
</template>

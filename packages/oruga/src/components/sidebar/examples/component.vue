<script setup lang="ts">
import { ref } from "vue";
import Form from "./_sidebar-form.vue";

const isSidebarActive = ref(false);
</script>

<template>
    <section>
        <o-button
            label="Open Sidebar"
            size="medium"
            variant="primary"
            @click="isSidebarActive = true" />

        <o-sidebar
            v-model:active="isSidebarActive"
            :component="Form"
            :fullheight="true"
            :overlay="true" />
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ModalForm from "./_modal-form-async.vue";

const isActive = ref(false);
</script>

<template>
    <section class="odocs-spaced">
        <o-button
            label="Open component modal"
            size="medium"
            variant="primary"
            @click="isActive = true" />

        <o-modal
            v-model:active="isActive"
            :component="ModalForm"
            :props="{
                title: 'Ship sprockets?',
                message:
                    'Do you really want me to ship the selected sprockets?',
            }" />
    </section>
</template>

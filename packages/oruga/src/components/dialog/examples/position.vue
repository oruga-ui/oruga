<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
    <section>
        <o-button
            label="Open Position Dialog"
            size="medium"
            variant="primary"
            @click="isActive = true" />

        <o-dialog
            v-model:active="isActive"
            close-on-confirm
            title="Dialog Title"
            subtitle="Dialog Subtitle"
            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!"
            text-position="center"
            cancel-button="Cancel"
            confirm-button="Confirm"
            button-position="right" />
    </section>
</template>

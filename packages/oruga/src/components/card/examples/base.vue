<script setup lang="ts">
import { ref } from "vue";

const title = "Card Title";
const subtitle = "Card Subtitle";
const content =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!";

const isLoading = ref(false);
</script>

<template>
    <section>
        <o-switch v-model="isLoading" label="Loading state" />

        <o-card
            :title="title"
            :content="content"
            :subtitle="subtitle"
            :loading="isLoading"
            closeable />
    </section>
</template>

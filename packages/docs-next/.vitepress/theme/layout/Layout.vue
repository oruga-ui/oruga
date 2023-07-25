<script setup>
import { ref } from "vue";
import Layout from "vitepress/dist/client/theme-default/Layout.vue";
import ThemeSelector from "./../components/ThemeSelector.vue";

const theme = ref({ key: undefined });
</script>

<template>
    <Layout :class="theme.key">
        <template #nav-bar-content-before>
            <client-only>
                <ThemeSelector v-model:theme="theme" />
            </client-only>
        </template>
    </Layout>
</template>

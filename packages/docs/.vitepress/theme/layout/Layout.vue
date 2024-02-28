<script setup>
import { ref } from "vue";
import Layout from "vitepress/dist/client/theme-default/Layout.vue";
import ThemeSelector from "./../components/ThemeSelector.vue";
import { useSidebar } from "vitepress/dist/client/theme-default/composables/sidebar";

const { hasSidebar } = useSidebar();

const theme = ref({ key: undefined });
</script>

<template>
    <Layout :class="theme.key">
        <template #nav-bar-content-before>
            <ThemeSelector v-if="hasSidebar" v-model:theme="theme" />
        </template>
    </Layout>
</template>

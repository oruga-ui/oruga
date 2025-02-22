<script setup lang="ts">
import { ref } from "vue";
import Layout from "vitepress/dist/client/theme-default/Layout.vue";
import ThemeSelector from "./../components/ThemeSelector.vue";
// @ts-expect-error types not found
import { useSidebar } from "vitepress/dist/client/theme-default/composables/sidebar";
import { type ThemeConfig } from "@docs";

const { hasSidebar } = useSidebar();

const theme = ref<ThemeConfig>();
</script>

<template>
    <Layout :class="theme?.key" data-theme="light">
        <template #nav-bar-content-before>
            <ThemeSelector v-if="hasSidebar" v-model:theme="theme" />
        </template>
    </Layout>
</template>

<script setup lang="ts">
import { useTemplateRef, getCurrentInstance, ref, computed } from "vue";
import Layout from "vitepress/dist/client/theme-default/Layout.vue";
import ThemeSelector from "../components/ThemeSelector.vue";
// @ts-expect-error types not found
import { useSidebar } from "vitepress/dist/client/theme-default/composables/sidebar";
import { type ThemeConfig } from "@docs";

const { hasSidebar } = useSidebar();

const theme = ref<ThemeConfig>();

const showcaseWrapper = useTemplateRef<HTMLElement>("showcaseRef");
const shadowRoot = computed(() => showcaseWrapper.value?.shadowRoot);

// provide prgrammatic target container override
const app = getCurrentInstance();
app?.root.appContext.app.provide("$PROGRAMMATIC-TARGET", shadowRoot);
</script>

<template>
    <Layout :class="theme?.key" data-theme="light">
        <template #nav-bar-content-before>
            <ThemeSelector v-if="hasSidebar" v-model:theme="theme" />
        </template>
    </Layout>

    <!-- web components cannot be rendered in server side -->
    <ClientOnly>
        <!-- shadow root web component container for programmatic examples -->
        <example-showcase ref="showcaseRef" />
    </ClientOnly>
</template>

<script setup lang="ts">
import { useTemplateRef, ref, computed, watch } from "vue";
import Layout from "vitepress/dist/client/theme-default/Layout.vue";
import ThemeSelector from "../components/ThemeSelector.vue";
// @ts-expect-error types not found
import { useSidebar } from "vitepress/dist/client/theme-default/composables/sidebar";
import { useOruga } from "@oruga-ui/oruga-next";
import { type ThemeConfig } from "@docs";

const { hasSidebar } = useSidebar();

const theme = ref<ThemeConfig>();

const showcaseWrapper = useTemplateRef<HTMLElement>("showcaseRef");
const shadowRoot = computed(() => showcaseWrapper.value?.shadowRoot);

watch(
    shadowRoot,
    (target) => {
        if (!target) return;
        const oruga = useOruga();
        oruga.config.setOption("teleportTarget", target);
    },
    { immediate: true },
);
</script>

<template>
    <Layout :class="theme?.key">
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

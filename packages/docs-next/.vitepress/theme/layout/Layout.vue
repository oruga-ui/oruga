<script setup>
import { ref } from "vue";
import Layout from "vitepress/dist/client/theme-default/Layout.vue";
import ThemeSelector from "./../components/ThemeSelector.vue";

const theme = ref({ value: undefined });
</script>

<template>
    <Layout :class="theme.value">
        <template #doc-before>
            <client-only>
                <Teleport to=".VPNavBar .container .content .content-body">
                    <ThemeSelector v-model:theme="theme" />
                </Teleport>
            </client-only>
        </template>
    </Layout>
</template>

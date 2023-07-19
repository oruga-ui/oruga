<script setup>
import { ref } from "vue";
import Layout from "vitepress/dist/client/theme-default/Layout.vue";
import ThemeSelector from "./../components/ThemeSelector.vue";

const theme = ref({ key: undefined });
</script>

<template>
    <Layout :class="theme.key">
        <template #doc-before>
            <client-only>
                <Teleport to=".VPNavBar .container .content .content-body">
                    <ThemeSelector v-model:theme="theme" />
                </Teleport>
            </client-only>
        </template>
    </Layout>
</template>

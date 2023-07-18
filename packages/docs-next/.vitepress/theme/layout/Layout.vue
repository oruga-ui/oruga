<script setup>
import { ref } from "vue";
import Layout from "vitepress/dist/client/theme-default/Layout.vue";
import { useSidebar } from "vitepress/dist/client/theme-default/composables/sidebar";

// Import theme definitions
import themes from "../../themes.json";

const { hasSidebar } = useSidebar();

const selectedTheme = ref("");

function onThemeChange() {
    localStorage.setItem("oruga.io_theme", selectedTheme.value);
    location.reload();
}

if (typeof window !== "undefined") {
    selectedTheme.value =
        localStorage.getItem("oruga.io_theme") || themes[0].value;
}
</script>

<template>
    <Layout :class="selectedTheme">
        <template #doc-before>
            <client-only>
                <Teleport to=".VPNavBar .container .content .content-body">
                    <div v-if="hasSidebar" class="theme-selector">
                        Theme ->
                        <select v-model="selectedTheme" @change="onThemeChange">
                            <option
                                v-for="item in themes"
                                :key="item.value"
                                :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                </Teleport>
            </client-only>
        </template>
    </Layout>
</template>

<style scoped>
.theme-selector {
    position: absolute;
    left: 0;
    flex: auto;
    margin-left: 10px;
    align-items: center;
    padding: 0 12px;
    line-height: var(--vp-nav-height-mobile);
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    transition: color 0.25s;
}
@media (max-width: 959px) {
    .theme-selector {
        /* hamburger width + margin */
        right: calc(48px + 2rem);
        left: auto;
    }
}
.theme-selector select {
    cursor: pointer;
    appearance: menulist;
    background: transparent;
}
</style>

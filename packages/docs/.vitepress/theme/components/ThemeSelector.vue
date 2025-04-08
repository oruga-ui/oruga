<script setup lang="ts">
import { Themes, type ThemeConfig } from "@docs/themes";
import { loadTheme, saveTheme } from "..";

const selectedTheme = defineModel<ThemeConfig>("theme");

selectedTheme.value = loadTheme();

function onThemeChange(theme: ThemeConfig): void {
    selectedTheme.value = theme;
    saveTheme(theme);
}
</script>

<template>
    <o-dropdown
        :model-value="selectedTheme"
        override
        root-class="theme-selector"
        menu-class="theme-drop__menu"
        selectable
        aria-label="theme selection"
        @change="onThemeChange">
        <template #trigger="{ active }">
            <span role="button">
                Theme ➜ {{ selectedTheme?.label }}
                <o-icon :icon="active ? 'caret-up' : 'caret-down'" />
            </span>
        </template>

        <o-dropdown-item
            v-for="item in Themes"
            :key="item.key"
            :value="item"
            item-class="theme-drop__item"
            item-selected-class="theme-drop__item--active">
            {{ item.label }}
        </o-dropdown-item>
    </o-dropdown>
</template>

<style lang="scss" scoped>
.theme-selector {
    margin-left: 25px;
    line-height: var(--vp-nav-height-mobile);
    font-size: 14px;
    font-weight: 500;

    [role="listitem"],
    [role="button"] {
        cursor: pointer;
    }
}

// style theme selector custom dropdown
:deep(.theme-drop__menu) {
    position: absolute;
    left: 25px;
    top: 100%;
    display: block;
    min-width: 12rem;
    z-index: 20;
    background-color: var(--vp-input-bg-color);
    border-color: var(--vp-input-border-color);
    border-radius: 4px;
    box-shadow: var(--vp-shadow-3);
    padding: 0.5rem 0;
    margin: 0;
}
:deep(.theme-drop__item) {
    display: block;
    position: relative;
    cursor: pointer;
    color: var(--docsearch-text-color);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.375rem 1rem;
    &:hover {
        background-color: var(--vp-c-gray-3);
        color: var(--docsearch-text-color);
    }
}
:deep(.theme-drop__item--active) {
    background-color: var(--vp-c-brand-1);
    color: var(--vp-c-bg);
}
</style>

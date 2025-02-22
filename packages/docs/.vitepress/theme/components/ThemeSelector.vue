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
        root-class="theme-selector"
        selectable
        aria-label="theme selection"
        @change="onThemeChange">
        <template #trigger="{ active }">
            <span role="button">
                Theme ➜ {{ selectedTheme?.label }}
                <o-icon :icon="active ? 'caret-up' : 'caret-down'" />
            </span>
        </template>

        <o-dropdown-item v-for="item in Themes" :key="item.key" :value="item">
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

// default override for oruga base theme
:deep(.o-drop__menu) {
    position: absolute;
    left: 0;
    top: 100%;
    display: block;
    min-width: var(--oruga-dropdown-menu-width, 12rem);
    z-index: var(--oruga-dropdown-menu-zindex, 20);
    background-color: var(--oruga-dropdown-menu-background, #ffffff);
    border-radius: var(--oruga-dropdown-menu-border-radius, 4px);
    box-shadow: var(
        --oruga-dropdown-menu-box-shadow,
        0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.02)
    );
    padding: var(--oruga-dropdown-menu-padding, 0.5rem 0 0.5rem 0);
    margin: var(--oruga-dropdown-menu-margin, 0);
}
:deep(.o-drop__item) {
    display: block;
    position: relative;
    cursor: pointer;
    color: var(--oruga-dropdown-item-color, #000000);
    font-size: var(--oruga-dropdown-item-font-size, 1rem);
    font-weight: var(--oruga-dropdown-item-font-weight, 400);
    line-height: var(--oruga-dropdown-item-line-height, 1.5);
    padding: var(--oruga-dropdown-item-padding, 0.375rem 1rem);
    &:hover {
        background-color: var(
            --oruga-dropdown-item-hover-background-color,
            #f5f5f5
        );
        color: var(--oruga-dropdown-item-hover-color, #000000);
    }
}
:deep(.o-drop__item--active) {
    color: var(--oruga-dropdown-item-active-color, #ffffff);
}
</style>

<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { MenuClasses, MenuItemClasses } from "../props";

const inspectData: InspectData<MenuClasses & MenuItemClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    listClass: {
        class: "listClass",
        description: "Class of the menu list element.",
    },
    labelClass: {
        class: "labelClass",
        description: "Class of the menu label element.",
    },
    itemClass: {
        class: "itemClass",
        subitem: "menu-item",
        description: "Class of the menu item root element.",
    },
    itemActiveClass: {
        class: "itemActiveClass",
        subitem: "menu-item",
        description: "Class of the menu item root element when active.",
    },
    itemFocusedClass: {
        class: "itemFocusedClass",
        subitem: "menu-item",
        description: "Class of the menu item root element when focused.",
    },
    itemDisabledClass: {
        class: "itemDisabledClass",
        subitem: "menu-item",
        description: "Class of the menu item root element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    itemButtonClass: {
        class: "itemButtonClass",
        subitem: "menu-item",
        description: "Class of the menu button element.",
    },
    itemButtonActiveClass: {
        class: "itemButtonActiveClass",
        subitem: "menu-item",
        description: "Class of the menu button element when active.",
    },
    itemButtonFocusedClass: {
        class: "itemButtonFocusedClass",
        subitem: "menu-item",
        description: "Class of the menu button element when focused.",
    },
    itemButtonDisabledClass: {
        class: "itemButtonDisabledClass",
        subitem: "menu-item",
        description: "Class of the menu button element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    itemButtonIconClass: {
        class: "itemButtonIconClass",
        subitem: "menu-item",
        description: "Class of the menu button element with icon.",
        properties: ["icon"],
        action: (cmp, data): void => {
            data.icon = "times-circle";
        },
    },
    itemSubmenuClass: {
        class: "itemSubmenuClass",
        subitem: "menu-item",
        description: "Class of the menu item submenu element.",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-menu v-bind="props" label="Menu">
            <o-menu-item v-bind="props" icon="info-circle" label="Info" />
            <o-menu-item
                v-bind="props"
                icon="cog"
                label="Submenu"
                active
                expanded>
                <o-menu-item v-bind="props" icon="user" label="Users" />
                <o-menu-item
                    v-bind="props"
                    icon="money-bill"
                    label="Payments"
                    disabled />
            </o-menu-item>
        </o-menu>
    </inspector-wrapper>
</template>

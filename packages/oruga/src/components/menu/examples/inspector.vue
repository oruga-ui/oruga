<script setup lang="ts">
const subitem = "menu-item";

const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element (menu)",
    },
    {
        class: "listClass",
        description: "Class of the menu list",
    },
    {
        class: "listLabelClass",
        description: "Class of the menu list label",
    },
    {
        class: "itemClass",
        description: "Class of the menu item",
        subitem: true,
    },
    {
        class: "itemActiveClass",
        description: "Class of the active menu item",
        subitem: true,
    },
    {
        class: "itemDisabledClass",
        properties: ["disabled"],
        description: "Class of the disabled menu item",
        subitem: true,
    },
    {
        class: "itemIconTextClass",
        properties: ["icon"],
        description: "Class of the icon of menu item",
        subitem: true,
    },
    {
        class: "itemSubmenuClass",
        description: "Class of the menu item when is a submenu",
        subitem: true,
    },
    {
        class: "itemWrapperClass",
        description: "Class of the root element of menu item",
        subitem: true,
    },
];
</script>

<template>
    <inspector-wrapper
        v-slot="props"
        :inspect-data="inspectData"
        :subitem="subitem">
        <o-menu v-bind="props" label="Menu">
            <o-menu-item v-bind="props" icon="info-circle" label="Info" />
            <o-menu-item v-bind="props" icon="cog" label="Submenu" expanded>
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

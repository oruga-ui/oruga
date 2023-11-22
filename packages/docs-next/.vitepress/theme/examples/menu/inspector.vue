<script setup>
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
    },
    {
        class: "itemActiveClass",
        description: "Class of the active menu item",
    },
    {
        class: "itemDisabledClass",
        description: "Class of the disabled menu item",
    },
    {
        class: "itemIconTextClass",
        description: "Class of the icon of menu item",
    },
    {
        class: "itemSubmenuClass",
        description: "Class of the menu item when is a submenu",
    },
    {
        class: "itemWrapperClass",
        description: "Class of the root element of menu item",
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
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

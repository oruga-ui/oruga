<script setup lang="ts">
import type { InspectData } from "@docs";
import type {
    MenuClasses,
    MenuItemClasses,
    MenuProps,
    MenuItemProps,
} from "../props";

const inspectData: InspectData<
    MenuClasses & MenuItemClasses,
    MenuProps<unknown> & MenuItemProps<unknown>
> = {
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
        subitem: "menuitem",
        description: "Class of the menu item root element.",
    },
    itemActiveClass: {
        class: "itemActiveClass",
        subitem: "menuitem",
        description: "Class of the menu item root element when active.",
    },
    itemFocusedClass: {
        class: "itemFocusedClass",
        subitem: "menuitem",
        description: "Class of the menu item root element when focused.",
    },
    itemDisabledClass: {
        class: "itemDisabledClass",
        subitem: "menuitem",
        description: "Class of the menu item root element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    itemButtonClass: {
        class: "itemButtonClass",
        subitem: "menuitem",
        description: "Class of the menu button element.",
    },
    itemButtonActiveClass: {
        class: "itemButtonActiveClass",
        subitem: "menuitem",
        description: "Class of the menu button element when active.",
    },
    itemButtonFocusedClass: {
        class: "itemButtonFocusedClass",
        subitem: "menuitem",
        description: "Class of the menu button element when focused.",
    },
    itemButtonDisabledClass: {
        class: "itemButtonDisabledClass",
        subitem: "menuitem",
        description: "Class of the menu button element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    itemButtonIconClass: {
        class: "itemButtonIconClass",
        subitem: "menuitem",
        description: "Class of the menu button element with icon.",
        properties: ["icon"],
        action: (cmp, data): void => {
            data.icon = "times-circle";
        },
    },
    itemSubmenuClass: {
        class: "itemSubmenuClass",
        subitem: "menuitem",
        description: "Class of the menu item submenu element.",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-menu v-bind="props" label="Menu">
            <o-menuitem v-bind="props" icon="info-circle" label="Info" />
            <o-menuitem
                v-bind="props"
                icon="cog"
                label="Submenu"
                active
                expanded>
                <o-menuitem v-bind="props" icon="user" label="Users" />
                <o-menuitem
                    v-bind="props"
                    icon="money-bill"
                    label="Payments"
                    disabled />
            </o-menuitem>
        </o-menu>
    </inspector-wrapper>
</template>

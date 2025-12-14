<script setup lang="ts">
import type { InspectData } from "@docs";
import type {
    TreeClasses,
    TreeItemClasses,
    TreeProps,
    TreeItemProps,
} from "../props";

const inspectData: InspectData<
    TreeClasses & TreeItemClasses,
    TreeProps<unknown> & TreeItemProps<unknown>
> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    listClass: {
        class: "listClass",
        description: "Class of the tree list element.",
    },
    labelClass: {
        class: "labelClass",
        description: "Class of the tree label element.",
    },
    itemClass: {
        class: "itemClass",
        subitem: "treeitem",
        description: "Class of the tree item root element.",
    },
    itemActiveClass: {
        class: "itemActiveClass",
        subitem: "treeitem",
        description: "Class of the tree item root element when active.",
    },
    itemFocusedClass: {
        class: "itemFocusedClass",
        subitem: "treeitem",
        description: "Class of the tree item root element when focused.",
    },
    itemDisabledClass: {
        class: "itemDisabledClass",
        subitem: "treeitem",
        description: "Class of the tree item root element when disabled.",
        properties: ["disabled"],
        action: (data): void => {
            data.disabled = true;
        },
    },
    itemButtonClass: {
        class: "itemButtonClass",
        subitem: "treeitem",
        description: "Class of the tree button element.",
    },
    itemButtonActiveClass: {
        class: "itemButtonActiveClass",
        subitem: "treeitem",
        description: "Class of the tree button element when active.",
    },
    itemButtonFocusedClass: {
        class: "itemButtonFocusedClass",
        subitem: "treeitem",
        description: "Class of the tree button element when focused.",
    },
    itemButtonDisabledClass: {
        class: "itemButtonDisabledClass",
        subitem: "treeitem",
        description: "Class of the tree button element when disabled.",
        properties: ["disabled"],
        action: (data): void => {
            data.disabled = true;
        },
    },
    itemButtonIconClass: {
        class: "itemButtonIconClass",
        subitem: "treeitem",
        description: "Class of the tree button element with icon.",
        properties: ["icon"],
        action: (data): void => {
            data.icon = "times-circle";
        },
    },
    itemSubtreeClass: {
        class: "itemSubtreeClass",
        subitem: "treeitem",
        description: "Class of the tree item subtree element.",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-tree v-bind="props" label="tree">
            <o-tree-item v-bind="props" icon="info-circle" label="Info" />
            <o-tree-item
                v-bind="props"
                icon="cog"
                label="Subtree"
                active
                expanded>
                <o-tree-item v-bind="props" icon="user" label="Users" />
                <o-tree-item
                    v-bind="props"
                    icon="money-bill"
                    label="Payments"
                    disabled />
            </o-tree-item>
        </o-tree>
    </inspector-wrapper>
</template>

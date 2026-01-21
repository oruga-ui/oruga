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
    TreeProps<unknown, boolean> & TreeItemProps<unknown>
> = {
  rootClass: {
    class: "rootClass",
    description: "Class of the root element.",
  },
  disabledClass: {
    class: "disabledClass",
    description: "Clas of the root element when disabled.",
    properties: ["disabled"],
    action: (data): void => {
      data.disabled = true;
    },
  },
  selectableClass: {
    class: "selectableClass",
    description: "Class of the root element when selectable.",
    properties: ["selectable"],
    action: (data): void => {
      data.selectable = true;
    },
  },
  multipleClass: {
    class: "multipleClass",
    description: "Class of the root element when multiple.",
    properties: ["multiple"],
    action: (data): void => {
      data.multiple = true;
    },
  },
  headerClass: {
    class: "headerClass",
    description: "Class of the header slot wrapper element.",
  },
  footerClass: {
    class: "footerClass",
    description: "Class of the footer slot wrapper element.",
  },
  emptyClass: {
    class: "emptyClass",
    description: "Class of the empty slot wrapper element.",
    action: (data): void => {
      data.options = [];
    },
  },
  listClass: {
    class: "listClass",
    description: "Class of the tree list element.",
  },
  itemClass: {
    class: "itemClass",
    subitem: "treeitem",
    description: "Class of the tree item root element.",
  },
  itemSelectedClass: {
    class: "itemSelectedClass",
    subitem: "treeitem",
    description: "Class of the tree item root element when selected.",
  },
  itemFocusedClass: {
    class: "itemFocusedClass",
    subitem: "treeitem",
    description: "Class of the tree item root element when focused.",
  },
  itemClickableClass: {
    class: "itemClickableClass",
    subitem: "treeitem",
    description: "Class of the tree item root element when clickable.",
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
  itemLabelClass: {
    class: "itemLabelClass",
    subitem: "treeitem",
    description: "Class of the tree item label element element.",
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
    <o-tree v-bind="props">
      <o-tree-item
        v-bind="props"
        icon="info-circle"
        label="Info" />
      <o-tree-item
        v-bind="props"
        icon="cog"
        label="Subtree"
        expanded>
        <o-tree-item
          v-bind="props"
          icon="user"
          label="Users" />
        <o-tree-item
          v-bind="props"
          icon="money-bill"
          label="Payments"
          disabled />
      </o-tree-item>
    </o-tree>
  </inspector-wrapper>
</template>

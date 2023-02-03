<template>
  <doc-wrapper :inspect-class="inspectClass">
    <template #default="s">
      <o-button v-bind="s">Button</o-button>
    </template>
  </doc-wrapper>
  <inspector @inspect-class="inspectClass = $event" :inspectData="inspectData">
  </inspector>
</template>

<script lang="ts">
export default {
  data() {
    return {
      inspectClass: {},
      inspectData: [
        {
          class: "rootClass",
          description: "Class of the root element",
        },
        {
          class: "outlinedClass",
          description: "Class of the button outlined",
          properties: ["outlined"],
          suffixes: ['primary', 'info', 'warning', 'danger'],
          action: (cmp) => {
            cmp.data.variant = 'primary';
            cmp.data.outlined = true;
          },
        },
        {
          class: "loadingClass",
          description: "Class of the button with loading",
          properties: ["loading"],
          action: (cmp) => {
            cmp.data.loading = true;
          },
        },
        {
          class: "invertedClass",
          description: "Class of the button when inverted",
          properties: ["inverted"],
          suffixes: ['primary', 'info', 'warning', 'danger'],
          action: (cmp) => {
            cmp.data.variant = 'primary';
            cmp.data.inverted = true;
          },
        },
        {
          class: "expandedClass",
          description: "Class of the button when expanded",
          properties: ["expanded"],
          action: (cmp) => {
            cmp.data.expanded = true;
          },
        },
        {
          class: "elementsWrapperClass",
          description: "Class of the button elements wrapper",
          action: (cmp) => {
            cmp.data.expanded = true;
          },
        },
        {
          class: "roundedClass",
          description: "Class of the button when rounded",
          properties: ["rounded"],
          action: (cmp) => {
            cmp.data.rounded = true;
          },
        },
        {
          class: "disabledClass",
          description: "Class of the button when disabled",
          properties: ["disabled"],
          action: (cmp) => {
            cmp.data.disabled = true;
          },
        },
        {
          class: "labelClass",
          description: "Class of the button label"
        },
        {
          class: "iconClass",
          description: "Class of the button icon",
          properties: ["iconLeft", "iconRight"],
          action: (cmp) => {
            cmp.data['icon-left'] = "plus"
          },
        },
        {
          class: "iconLeftClass",
          description: "Class of the button icon on the left",
          properties: ["iconLeft"],
          action: (cmp) => {
            cmp.data['icon-left'] = "plus"
          },
        },
        {
          class: "iconRightClass",
          description: "Class of the button icon on the right",
          properties: ["iconRight"],
          action: (cmp) => {
            cmp.data['icon-right'] = "plus"
          },
        },
        {
          class: "sizeClass",
          description: "Class of the button size",
          properties: ["size"],
          suffixes: ['small', 'medium', 'large'],
          action: (cmp) => {
            cmp.data.size = 'large';
          },
        },
        {
          class: "variantClass",
          description: "Class of the button variant",
          properties: ["variant"],
          suffixes: ['primary', 'info', 'warning', 'danger'],
          action: (cmp) => {
            cmp.data.variant = 'warning';
          },
        },
      ],
    };
  }
}
</script>

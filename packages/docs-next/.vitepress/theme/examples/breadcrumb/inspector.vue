<template>
  <doc-wrapper :inspect-class="inspectClass">
    <template #default="s">
      <o-breadcrumb v-bind="s">
        <o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>
        <o-breadcrumb-item tag="a" href="/components/">Components</o-breadcrumb-item>
        <o-breadcrumb-item tag="a" href="/components/Breadcrumb.html" active>Breadcrumb</o-breadcrumb-item>
      </o-breadcrumb>
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
          class: "sizeClass",
          description: "Class of the Breadcrumb size",
          properties: ["size"],
          suffixes: ['small', 'medium', 'large'],
          action: (cmp) => {
            cmp.data.size = 'large';
          },
        },
        {
          class: "variantClass",
          description: "Class of the Breadcrumb variant",
          properties: ["variant"],
          suffixes: ['primary', 'info', 'warning', 'danger'],
          action: (cmp) => {
            cmp.data.variant = 'warning';
          },
        },
        {
          class: "alignClass",
          description: "Class of the Breadcrumb alignnement",
          properties: ["align"],
          suffixes: ['left', 'center', 'right'],
          action: (cmp) => {
            cmp.data.align = 'center';
          },
        },
        {
          class: "separatorClass",
          description: "Class of the Breadcrumb separator",
          properties: ["separator"],
          suffixes: ['slash', 'arrow', 'bullet', 'dot', 'chevron'],
          action: (cmp) => {
            cmp.data.separator = 'arrow';
          },
        },
      ],
    };
  }
}
</script>

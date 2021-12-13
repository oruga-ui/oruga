<template>
  <div class="field">
    <doc-wrapper>
      <template v-slot:default="s">
      <!-- component -->
      </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData"></inspector>
  </div>
</template>

<script>
export default {
    data() {
        return {
            dialogData: [
                {
                    type: 'Frameworks',
                    items: ['Vue.js']
                }
            ],
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

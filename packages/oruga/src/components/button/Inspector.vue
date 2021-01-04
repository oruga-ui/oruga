<template>
  <div>
    <doc-wrapper>
      <template v-slot:default="s">
      <o-button v-bind="s">Button</o-button>
      </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData"></inspector>
  </div>
</template>

<script>
export default {
    data() {
        return {
            inspectData: [
                {
                    class: "rootClass",
                    description: "",
                },
                {
                    class: "outlinedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.variant = 'primary';
                        cmp.data.outlined = true;
                    },
                },
                {
                    class: "invertedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.variant = 'primary';
                        cmp.data.inverted = true;
                    },
                },
                {
                    class: "expandedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    },
                },
                {
                    class: "roundedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.rounded = true;
                    },
                },
                {
                    class: "disabledClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.disabled = true;
                    },
                },
                {
                    class: "iconClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data['icon-left'] = "plus"
                    },
                },
                {
                    class: "sizeClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.size = 'large';
                    },
                },
                {
                    class: "variantClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.variant = 'warning';
                    },
                },
            ],
        };
    }
}
</script>

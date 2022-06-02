<template>
  <doc-wrapper :inspect-class="inspectClass">
    <template #default="s">
      <o-modal v-bind="s" v-model:active="isImageModalActive">
        <p style="text-align: center">
          <img src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
        </p>
      </o-modal>
      <b>Click on "Inspect" button to open the modal</b>
    </template>
  </doc-wrapper>
  <inspector :inspectData="inspectData" @inspect-class="inspectClass = $event"></inspector>
</template>

<script>
export default {
  data() {
    return {
      isImageModalActive: false,
      inspectClass: {},
      inspectData: [
        {
          class: "rootClass",
          description: "Class of the root element",
          action: () => {
            this.isImageModalActive = true;
          }
        },
        {
          class: "mobileClass",
          description: "Class of modal component when on mobile",
          warning: "Switch to mobile view to see it in action!",
        },
        {
          class: "overlayClass",
          description: "Class of the modal overlay",
          action: () => {
            this.isImageModalActive = true;
          }
        },
        {
          class: "contentClass",
          description: "Class of the modal content",
          specificity: "when <b>mobileClass</b> is applied",
          action: () => {
            this.isImageModalActive = true;
          }
        },
        {
          class: "closeClass",
          description: "Class of the close button",
          action: () => {
            this.isImageModalActive = true;
          }
        },
        {
          class: "fullScreenClass",
          description: "Class of the modal when fullscreen",
          properties: ['fullScreen'],
          action: (cmp) => {
            this.isImageModalActive = true;
            cmp.data.fullScreen = true;
          }
        }
      ],
    };
  },
};
</script>

<template>
  <doc-wrapper :inspect-class="inspectClass">
    <template #default="s">
      <p style="position: relative">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id
        hendrerit imperdiet, elit sapien laoreet elit
        <o-loading v-bind="s" icon="sync-alt" v-model:active="loading" :iconSpin="true">
        </o-loading>
      </p>
       <b>Click on "Inspect" button to open the loading</b>
    </template>
  </doc-wrapper>
  <inspector :inspectData="inspectData" @inspect-class="inspectClass = $event"></inspector>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      inspectClass: {},
      inspectData: [
        {
          class: "rootClass",
          description: "Class of the root element",
          action: (cmp) => {
            cmp.data.canCancel = true;
            cmp.data.fullPage = false;
            this.loading = true;
          }
        },
        {
          class: "overlayClass",
          description: "Class of the loading overlay",
          action: (cmp) => {
            cmp.data.canCancel = true;
            cmp.data.fullPage = false;
            this.loading = true;
          }
        },
        {
          class: "iconClass",
          description: "Class for the loading icon",
          action: (cmp) => {
            cmp.data.canCancel = true;
            cmp.data.fullPage = false;
            this.loading = true;
          }
        },
        {
          class: "fullPageClass",
          description: "Class for the root element when fullpage",
          properties: ['fullPage'],
          action: (cmp) => {
            cmp.data.fullPage = true;
            cmp.data.canCancel = true;
            this.loading = true;
          }
        }
      ],
    };
  },
};
</script>

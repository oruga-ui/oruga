
<template>
  <doc-wrapper :inspect-class="inspectClass">
    <template #default="s">
      <div class="sidebar-page">
        <section class="sidebar-layout" v-if="position === 'static'">
          <o-sidebar v-bind="s" position="static" open>
            <img width="128" src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
              alt="Lightweight UI components for Vue.js" />
            <section style="padding: 1em">
              <h5>Example 1</h5>
              <h5>Example 2</h5>
              <h5>Example 3</h5>
              <h5>Example 4</h5>
              <h5>Example 5</h5>
            </section>
          </o-sidebar>
        </section>
        <section class="sidebar-layout" v-if="position !== 'static'">
          <o-sidebar v-bind="s" :position="position" v-model:open="open" variant="primary"
            style="--oruga-sidebar-zindex: 50">
            <img width="128" src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
              alt="Lightweight UI components for Vue.js" />
            <section style="padding: 1em">
              <h5>Example 1</h5>
              <h5>Example 2</h5>
              <h5>Example 3</h5>
              <h5>Example 4</h5>
              <h5>Example 5</h5>
            </section>
          </o-sidebar>
        </section>
      </div>
    </template>
  </doc-wrapper>
  <inspector :inspectData="inspectData" @inspect-class="inspectClass = $event"></inspector>
</template>

<script>
export default {
  data() {
    return {
      position: 'static',
      open: false,
      inspectClass: {},
      inspectData: [
        {
          class: "rootClass",
          description: "Class of the root element",
          action: () => {
            this.position = 'static';
          }
        },
        {
          class: "mobileClass",
          description: "Class of sidebar component when on mobile",
          warning: "Switch to mobile view to see it in action!",
        },
        {
          class: "overlayClass",
          description: "Class of the sidebar overlay",
          action: (cmp) => {
            this.position = 'fixed';
            setTimeout(() => {
              this.open = true;
              cmp.data.overlay = true
              cmp.data.fullheight = true
            }, 400)
          }
        },
        {
          class: "contentClass",
          description: "Class of the sidebar content",
          action: () => {
            this.position = 'static';
          }
        },
        {
          class: "fixedClass",
          description: "Class of the sidebar when its position is fixed",
          properties: ['position'],
          action: (cmp) => {
            this.position = 'fixed';
            setTimeout(() => {
              this.open = true;
              cmp.data.overlay = true
              cmp.data.fullheight = true
            }, 400)
          }
        },
        {
          class: "staticClass",
          description: "Class of the sidebar when its position is static",
          properties: ['position'],
          action: () => {
            this.position = 'static';
          }
        },
        {
          class: "absoluteClass",
          description: "Class of the sidebar when its position is absolute",
          properties: ['position'],
          warning: "Scroll to the top of this page to see the sidebar",
          action: (cmp) => {
            this.position = 'absolute';
            setTimeout(() => {
              cmp.data.fullheight = true
              this.open = true;
            }, 400)
          }
        },
        {
          class: "fullheightClass",
          description: "Class of the sidebar when is fullheight",
          properties: ['fullheight'],
          action: (cmp) => {
            this.position = 'static';
            cmp.data.fullheight = true;
          }
        },
        {
          class: "fullwidthClass",
          description: "Class of the sidebar when is fullwidth",
          properties: ['fullwidth'],
          action: (cmp) => {
            this.position = 'static';
            cmp.data.fullwidth = true;
          }
        },
        {
          class: "rightClass",
          description: "Class of the sidebar when is positioned on the right",
          properties: ['right'],
          action: (cmp) => {
            this.position = 'static';
            cmp.data.right = true;
          }
        },
        {
          class: "reduceClass",
          description: "Class of the sidebar when reduced",
          properties: ['reduce'],
          action: (cmp) => {
            this.position = 'static';
            cmp.data.reduce = true;
          }
        },
        {
          class: "expandOnHoverClass",
          description: "Class of the sidebar when expanded on hover",
          properties: ['expandOnHover'],
          action: (cmp) => {
            this.position = 'static';
            cmp.data.expandOnHover = true;
          }
        },
        {
          class: "expandOnHoverFixedClass",
          description: "Class of the sidebar when expanded on hover and its position is fixed",
          properties: ['expandOnHover', 'expandOnHoverFixed'],
          action: (cmp) => {
            this.position = 'fixed';
            setTimeout(() => {
              cmp.data.expandOnHover = true;
              cmp.data.expandOnHoverFixed = true;
              this.open = true;
            }, 400)
          }
        },
        {
          class: "variantClass",
          description: 'Class of the sidebar variant',
          properties: ["variant"],
          suffixes: ['primary', 'info', 'warning', 'danger'],
          action: (cmp) => {
            this.position = 'static';
            cmp.data.variant = 'warning';
          }
        },
      ],
    };
  },
};
</script>

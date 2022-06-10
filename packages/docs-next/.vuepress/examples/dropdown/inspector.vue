
<template>
  <doc-wrapper :inspect-class="inspectClass">
    <template #default="s">
      <o-dropdown v-model="currentMenu" v-bind="s" aria-role="list">
        <template #trigger="{ active }">
          <o-button variant="primary" ref="dropdownbtn">
            <span>Click me!</span>
            <o-icon :icon="active ? 'caret-up' : 'caret-down'"></o-icon>
          </o-button>
        </template>
        <o-dropdown-item v-bind="s" value="ac1" aria-role="listitem">Action</o-dropdown-item>
        <o-dropdown-item v-bind="s" value="ac2" aria-role="listitem">Another action</o-dropdown-item>
        <o-dropdown-item v-bind="s" value="ac3" disabled aria-role="listitem">Something else</o-dropdown-item>
      </o-dropdown>
    </template>
  </doc-wrapper>
  <inspector :inspectData="inspectData" :subitem="subitem" @inspect-class="inspectClass = $event"></inspector>
</template>

<script>
export default {
  data() {
    return {
      currentMenu: '',
      subitem: 'dropdown-item',
      inspectClass: {},
      inspectData: [
        {
          class: "rootClass",
          description: "Class of the root element"
        },
        {
          class: "triggerClass",
          description: "Class of the trigger element"
        },
        {
          class: "menuMobileOverlayClass",
          description: "Class of the overlay when on mobile",
          warning: "Switch to mobile view to see it in action!",
          specificity: "when <b>mobileClass</b> is applied",
          action: () => {
            setTimeout(() => {
              this.$refs.dropdownbtn.$el.click()
            }, 300);
          }
        },
        {
          class: "menuClass",
          description: "Class of the dropdown menu",
          specificity: "when <b>inlineClass</b> or <b>mobileClass</b> or <b>expandedClass</b> is applied",
          action: () => {
            setTimeout(() => {
              this.$refs.dropdownbtn.$el.click()
            }, 300);
          }
        },
        {
          class: "disabledClass",
          description: "Class of dropdown when disabled",
          properties: ['disabled'],
          action: (cmp) => {
            cmp.data.disabled = true;
          }
        },
        {
          class: "menuActiveClass",
          description: "Class of dropdown menu when active",
          properties: ['inline'],
          action: () => {
            setTimeout(() => {
              this.$refs.dropdownbtn.$el.click()
            }, 300);
          }
        },
        {
          class: "inlineClass",
          description: "Class of dropdown menu when inline",
          properties: ['inline'],
          action: (cmp) => {
            cmp.data.inline = true;
          }
        },
        {
          class: "menuPositionClass",
          description: "Class of dropdown menu position",
          properties: ['position'],
          suffixes: ['top-right', 'top-left', 'bottom-left'],
          action: (cmp) => {
            cmp.data.position = 'top-right';
            setTimeout(() => {
              this.$refs.dropdownbtn.$el.click()
            }, 300);
          }
        },
        {
          class: "mobileClass",
          description: "Class of dropdown when on mobile",
          warning: "Switch to mobile view to see it in action!",
          action: () => {
            setTimeout(() => {
              this.$refs.dropdownbtn.$el.click()
            }, 300);
          }
        },
        {
          class: "expandedClass",
          description: "Class of dropdown when expanded",
          properties: ['expanded'],
          action: (cmp) => {
            cmp.data.expanded = true;
          }
        },
        {
          class: "itemClass",
          description: "Class of the dropdown item",
          subitem: true,
          action: () => {
            setTimeout(() => {
              this.$refs.dropdownbtn.$el.click()
            }, 300);
          }
        },
        {
          class: "itemActiveClass",
          description: "Class of the dropdown item when active",
          subitem: true,
          action: () => {
            setTimeout(() => {
              this.currentMenu = 'ac1'
              this.$refs.dropdownbtn.$el.click()
            }, 300);
          }
        },
        {
          class: "itemDisabledClass",
          subitem: true,
          description: "Class of the dropdown item when disabled",
          properties: ['disabled'],
          action: () => {
            setTimeout(() => {
              this.$refs.dropdownbtn.$el.click()
            }, 300);
          }
        },
      ],
    };
  },
};
</script>

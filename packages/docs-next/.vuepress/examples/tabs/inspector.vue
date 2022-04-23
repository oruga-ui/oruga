<template>
  <doc-wrapper :inspect-class="inspectClass">
    <template #default="s">
      <o-tabs v-model="activeTab" v-bind="s">
        <o-tab-item v-bind="s" :value="1" label="Pictures" icon="images">
          Lorem ipsum dolor sit amet.
        </o-tab-item>
        <o-tab-item v-bind="s" :value="2" label="Music" icon="music">
          Lorem <br />
          ipsum <br />
          dolor <br />
          sit <br />
          amet.
        </o-tab-item>
        <o-tab-item v-bind="s" :value="3" label="Videos" icon="video">
          Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar congue luctus. Nullam hendrerit iaculis
          augue vitae ornare. Maecenas vehicula pulvinar tellus, id sodales
          felis lobortis eget.
        </o-tab-item>
      </o-tabs>
    </template>
  </doc-wrapper>
  <inspector :inspectData="inspectData" :subitem="subitem" @inspect-class="inspectClass = $event"></inspector>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 1,
      subitem: "tab-item",
      inspectClass: {},
      inspectData: [
        {
          class: "rootClass",
          description: "Root class of the element",
        },
        {
          class: "navSizeClass",
          description: "Size of the navigation",
          properties: ["size"],
          suffixes: ['small', 'medium', 'large'],
          action: (cmp) => {
            cmp.data.size = 'large';
          }
        },
        {
          class: "navTypeClass",
          description: "Type of the navigation",
          properties: ["type"],
          suffixes: ['default', 'boxed', 'toggle'],
          action: () => { }
        },
        {
          class: "verticalClass",
          description: "Class of Tabs component when vertical",
          properties: ['vertical'],
          action: (cmp) => {
            cmp.data.vertical = true
          }
        },
        {
          class: "expandedClass",
          description: "Class of Tabs component when expanded",
          properties: ['expanded'],
          action: (cmp) => {
            cmp.data.expanded = true
          }
        },
        {
          class: "multilineClass",
          description: "Class of Tabs component when multiline",
          properties: ['multiline'],
          action: (cmp) => {
            cmp.data.multiline = true
          }
        },
        {
          class: "positionClass",
          description: "Class of Tabs component when when is vertical and its position changes",
          properties: ['position', 'vertical'],
          suffixes: ['bottom', 'left', 'right'],
          action: (cmp) => {
            cmp.data.vertical = true
            cmp.data.position = 'right'
          }
        },
        {
          class: "tabItemWrapperClass",
          description: "Class of the tab item wrapper",
          specificity: "when <b>expandedClass</b> is applied",
        },
        {
          class: "contentClass",
          description: "Class of the tab content",
        },
        {
          class: "itemClass",
          description: "Class of the tab item",
          subitem: true
        },
        {
          class: "itemHeaderClass",
          description: "Class of the tab item header",
          specificity: "when <b>verticalClass</b> or <b>expandedClass</b> or <b>positionClass</b> is applied",
          subitem: true,
        },
        {
          class: "itemHeaderActiveClass",
          description: "Class of the tab item header when active",
          subitem: true,
          suffixes: ['default', 'boxed', 'toggle'],
        },
        {
          class: "itemHeaderDisabledClass",
          description: "Class of the tab item header when disabled",
          subitem: true,
          suffixes: ['default', 'boxed', 'toggle'],
          action: (cmp) => {
            cmp.data.disabled = true;
          }
        },
        {
          class: "itemHeaderTypeClass",
          description: "Class of the tab item header type",
          subitem: true,
          suffixes: ['default', 'boxed', 'toggle'],
          action: () => { }
        },
        {
          class: "itemHeaderIconClass",
          description: "Class of the tab item header icon",
          subitem: true,
          action: () => {
          }
        },
        {
          class: "itemHeaderTextClass",
          description: "Class of the tab item header text",
          subitem: true,
          action: () => {
          }
        },
        {
          class: "navTabsClass",
          description: "Class of the Tabs component nav tabs",
          specificity: "when <b>positionClass</b> is applied",
        },
        {
          class: "navPositionClass",
          description: "Class of the Tabs component nav position",
          properties: ['position'],
          suffixes: ['bottom', 'left', 'right'],
          action: (cmp) => {
            cmp.data.vertical = false
            cmp.data.position = 'right'
          }
        },
      ]
    };
  },
};
</script>

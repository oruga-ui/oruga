<template>
  <doc-wrapper :inspect-class="inspectClass">
    <template #default="s">
        <o-menu v-bind="s">
          <o-menu-list v-bind="s" label="Menu">
              <o-menu-item v-bind="s" icon="info-circle" label="Info"></o-menu-item>
              <o-menu-item v-bind="s" icon="cog" label="Submenu" expanded>
                  <o-menu-item v-bind="s" icon="user" label="Users"></o-menu-item>
                  <o-menu-item v-bind="s" icon="money-bill" label="Payments" disabled></o-menu-item>
              </o-menu-item>
          </o-menu-list>
      </o-menu>
    </template>
  </doc-wrapper>
  <inspector @inspect-class="inspectClass = $event" :inspectData="inspectData">
  </inspector>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      inspectClass: {},
      inspectData: [
        {
          class: "rootClass",
          description: "Class of the root element (menu)",
        },
        {
          class: "listClass",
          description: "Class of the menu-list",
        },
        {
          class: "listLabelClass",
          description: "Class of the menu-list label",
        },
        {
          class: "itemClass",
          description: "Class of the menu-item",
        },
        {
          class: "itemActiveClass",
          description: "Class of the active menu-item"
        },
        {
          class: "itemDisabledClass",
          description: "Class of the disabled menu-item",
        },
        {
          class: "itemIconTextClass",
          description: "Class of the icon of menu-item",
        },
        {
          class: "itemSubmenuClass",
          description: "Class of the menu-item when is a submenu"
        },
        {
          class: "itemWrapperClass",
          description: "Class of the root element of menu-item"
        }
      ]
    }
  }
})
</script>

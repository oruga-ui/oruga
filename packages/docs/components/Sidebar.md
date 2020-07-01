---
title: Sidebar
---

# Sidebar

> A sidebar to use as left/right overlay or static

---

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-sidebar
      variant="primary"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      :open.sync="open"
    >
      <div class="p-1">
        <img
          src="https://github.com/oruga-ui/oruga/raw/master/packages/docs/.vuepress/public/logo.pn"
          alt="Lightweight UI components for Vue.js"
        />
        Sidebar
      </div>
    </o-sidebar>
    <div class="block">
      <o-field grouped group-multiline>
        <o-switch v-model="overlay">Overlay</o-switch>
        <o-switch v-model="fullheight">Fullheight</o-switch>
        <o-switch v-model="fullwidth">Fullwidth</o-switch>
        <o-switch v-model="right">Right</o-switch>
      </o-field>
    </div>
    <o-button @click="open = true">Show</o-button>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        open: false,
        overlay: true,
        fullheight: true,
        fullwidth: false,
        right: false
      };
    }
  };
</script>
```

:::

### Static

::: demo

```html
<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <o-sidebar
        position="static"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        variant="primary"
        open
      >
        <div class="p-1">
          <img
            src="https://github.com/oruga-ui/oruga/raw/master/packages/docs/.vuepress/public/logo.pn"
            alt="Lightweight UI components for Vue.js"
          />
          Sidebar
        </div>
      </o-sidebar>

      <div class="p-1">
        <o-field>
          <o-switch v-model="reduce">Reduced</o-switch>
        </o-field>
        <o-field>
          <o-switch v-model="expandOnHover">Expand on hover</o-switch>
        </o-field>
        <o-field label="Mobile Layout">
          <o-select v-model="mobile">
            <option :value="null"></option>
            <option value="reduce">Reduced</option>
            <option value="hide">Hidden</option>
            <option value="fullwidth">Fullwidth</option>
          </o-select>
        </o-field>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        expandOnHover: false,
        mobile: "reduce",
        reduce: false
      };
    }
  };
</script>

<style lang="scss" scoped>
  .p-1 {
    padding: 1em;
  }
  .sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    // min-height: 100vh;
    .sidebar-layout {
      display: flex;
      flex-direction: row;
      min-height: 100%;
      // min-height: 100vh;
    }
  }
</style>
```

:::

## Props

| Prop name               | Description | Type           | Values | Default                                                                                                                                                                                                                                     |
| ----------------------- | ----------- | -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open                    |             | boolean        | -      |                                                                                                                                                                                                                                             |
| variant                 |             | string\|object | -      |                                                                                                                                                                                                                                             |
| overlay                 |             | boolean        | -      |                                                                                                                                                                                                                                             |
| position                |             | string         | -      | 'fixed'                                                                                                                                                                                                                                     |
| fullheight              |             | boolean        | -      |                                                                                                                                                                                                                                             |
| fullwidth               |             | boolean        | -      |                                                                                                                                                                                                                                             |
| right                   |             | boolean        | -      |                                                                                                                                                                                                                                             |
| mobile                  |             | string         | -      |                                                                                                                                                                                                                                             |
| reduce                  |             | boolean        | -      |                                                                                                                                                                                                                                             |
| expandOnHover           |             | boolean        | -      |                                                                                                                                                                                                                                             |
| expandOnHoverFixed      |             | boolean        | -      |                                                                                                                                                                                                                                             |
| canCancel               |             | array\|boolean | -      | () => ['escape', 'outside']                                                                                                                                                                                                                 |
| onCancel                |             | func           | -      | () => {}                                                                                                                                                                                                                                    |
| rootClass               |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.rootClass', '')<br> return getCssClass(clazz, override, 'o-sidebar')<br>}                                  |
| backgroundClass         |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.backgroundClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-background')<br>}                 |
| contentClass            |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.contentClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-content')<br>}                       |
| fixedClass              |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.fixedClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-fixed')<br>}                           |
| staticClass             |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.staticClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-static')<br>}                         |
| absoluteClass           |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.absoluteClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-absolute')<br>}                     |
| fullheightClass         |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.fullheightClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-fullheight')<br>}                 |
| fullwidthClass          |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.fullwidthClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-fullwidth')<br>}                   |
| rightClass              |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.rightClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-right')<br>}                           |
| reduceClass             |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.reduceClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-mini')<br>}                           |
| expandOnHoverClass      |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.expandOnHoverClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-expand-hover')<br>}            |
| expandOnHoverFixedClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.expandOnHoverFixedClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-expand-hover-fixed')<br>} |
| mobileReduceClass       |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.mobileReduceClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-mini-mobile')<br>}              |
| mobileHideClass         |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.mobileHideClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-hidden-mobile')<br>}              |
| mobileFullwidthClass    |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.mobileFullwidthClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-mini-fullwidth')<br>}        |

## Events

| Event name  | Type      | Description |
| ----------- | --------- | ----------- |
| close       |           |
| update:open | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                             | SASS Variable                      | Default                             |
| ---------------------------------------- | ---------------------------------- | ----------------------------------- |
| --oruga-sidebar-background               | \$sidebar-background               | hsla(0,0%,4%,.86)                   |
| --oruga-sidebar-box-shadow               | \$sidebar-box-shadow               | 5px 0px 13px 3px rgba(\$black, 0.1) |
| --oruga-sidebar-content-background-color | \$sidebar-content-background-color | \$grey-lighter                      |
| --oruga-sidebar-mobile-breakpoint        | \$sidebar-mobile-breakpoint        | 1024px                              |
| --oruga-sidebar-mobile-width             | \$sidebar-mobile-width             | 80px                                |
| --oruga-sidebar-width                    | \$sidebar-width                    | 260px                               |
| --oruga-sidebar-zindex                   | \$sidebar-zindex                   | 40                                  |

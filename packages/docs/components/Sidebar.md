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
      <img
        width="128"
        src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
        alt="Lightweight UI components for Vue.js"
      />
      <h3>Example</h3>
    </o-sidebar>
    <div class="block">
      <o-field grouped group-multiline>
        <o-switch v-model="overlay">Overlay</o-switch>
        <o-switch v-model="fullheight">Fullheight</o-switch>
        <o-switch v-model="fullwidth">Fullwidth</o-switch>
        <o-switch v-model="right">Right</o-switch>
      </o-field>
    </div>

    <br />

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
        <img
          width="128"
          src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
          alt="Lightweight UI components for Vue.js"
        />
        <h5>Example 1</h5>
        <h5>Example 2</h5>
        <h5>Example 3</h5>
        <h5>Example 4</h5>
        <h5>Example 5</h5>
      </o-sidebar>

      <div>
        <o-field>
          <o-switch v-model="reduce">Reduced</o-switch>
        </o-field>
        <o-field>
          <o-switch v-model="expandOnHover">Expand on hover</o-switch>
        </o-field>
        <br />
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

<style>
  .sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
  }
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
  }
</style>
```

:::

## Props

| Prop name               | Description                                                                                                 | Type           | Values                                                                          | Default                            |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ---------------------------------- |
| open                    | To control the behaviour of the sidebar programmatically, use the .sync modifier to make it two-way binding | boolean        | -                                                                               |                                    |
| variant                 | Color of the sidebar, optional                                                                              | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                    |
| overlay                 |                                                                                                             | boolean        | -                                                                               |                                    |
| position                | Skeleton position in relation to the window                                                                 | string         | `fixed`, `absolute`, `static`                                                   | { 'sidebar.position': 'fixed' }    |
| fullheight              | Show sidebar in fullheight                                                                                  | boolean        | -                                                                               |                                    |
| fullwidth               | Show sidebar in fullwidth                                                                                   | boolean        | -                                                                               |                                    |
| right                   | Show the sidebar on right                                                                                   | boolean        | -                                                                               |                                    |
| mobile                  | Custom layout on mobile                                                                                     | string         | `fullwidth`, `reduce`, `hidden`                                                 |                                    |
| reduce                  | Show a small sidebar                                                                                        | boolean        | -                                                                               |                                    |
| expandOnHover           | Expand sidebar on hover when reduced or mobile is reduce                                                    | boolean        | -                                                                               |                                    |
| expandOnHoverFixed      | Expand sidebar on hover with fixed position when reduced or mobile is reduce                                | boolean        | -                                                                               |                                    |
| canCancel               | Sidebar cancel options                                                                                      | array\|boolean | `true`, `false`, `'escape'`, `'outside'`                                        | { 'sidebar.canCancel': ['escape' } |
| onCancel                | Callback on cancel                                                                                          | func           | -                                                                               | () => {}                           |
| rootClass               |                                                                                                             | string         | -                                                                               |                                    |
| backgroundClass         |                                                                                                             | string         | -                                                                               |                                    |
| contentClass            |                                                                                                             | string         | -                                                                               |                                    |
| fixedClass              |                                                                                                             | string         | -                                                                               |                                    |
| staticClass             |                                                                                                             | string         | -                                                                               |                                    |
| absoluteClass           |                                                                                                             | string         | -                                                                               |                                    |
| fullheightClass         |                                                                                                             | string         | -                                                                               |                                    |
| fullwidthClass          |                                                                                                             | string         | -                                                                               |                                    |
| rightClass              |                                                                                                             | string         | -                                                                               |                                    |
| reduceClass             |                                                                                                             | string         | -                                                                               |                                    |
| expandOnHoverClass      |                                                                                                             | string         | -                                                                               |                                    |
| expandOnHoverFixedClass |                                                                                                             | string         | -                                                                               |                                    |
| mobileReduceClass       |                                                                                                             | string         | -                                                                               |                                    |
| mobileHideClass         |                                                                                                             | string         | -                                                                               |                                    |
| mobileFullwidthClass    |                                                                                                             | string         | -                                                                               |                                    |
| variantClass            |                                                                                                             | string         | -                                                                               |                                    |

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

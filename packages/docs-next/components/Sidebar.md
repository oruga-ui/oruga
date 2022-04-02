---
title: Sidebar
---

# Sidebar

> A sidebar to use as left/right overlay or static

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/sidebar/examples/Sidebar.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-sidebar
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      :open.sync="open"
    >
      <o-button
        v-if="fullwidth"
        icon-left="times"
        label="Close"
        @click="open = false"
      />
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
        open
      >
        <img
          width="128"
          src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
          alt="Lightweight UI components for Vue.js"
        />
        <section style="padding: 1em">
          <h5>Example 1</h5>
          <h5>Example 2</h5>
          <h5>Example 3</h5>
          <h5>Example 4</h5>
          <h5>Example 5</h5>
        </section>
      </o-sidebar>

      <div style="padding: 1em">
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
            <option value="reduced">Reduced</option>
            <option value="hidden">Hidden</option>
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
        mobile: "reduced",
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

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_sidebar.scss)

<br />

<br />
<br />

## Props

| Prop name          | Description                                                                                                                                     | Type           | Values                                                                          | Default                                                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| canCancel          | Sidebar cancel options                                                                                                                          | array\|boolean | `true`, `false`, `'escape'`, `'outside'`                                        | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> sidebar: {<br>&nbsp;&nbsp;canCancel: ['escape', 'outside']<br>}</code> |
| expandOnHover      | Expand sidebar on hover when reduced or mobile is reduce                                                                                        | boolean        | -                                                                               |                                                                                                                                                         |
| expandOnHoverFixed | Expand sidebar on hover with fixed position when reduced or mobile is reduce                                                                    | boolean        | -                                                                               |                                                                                                                                                         |
| fullheight         | Show sidebar in fullheight                                                                                                                      | boolean        | -                                                                               |                                                                                                                                                         |
| fullwidth          | Show sidebar in fullwidth                                                                                                                       | boolean        | -                                                                               |                                                                                                                                                         |
| mobile             | Custom layout on mobile                                                                                                                         | string         | `fullwidth`, `reduced`, `hidden`                                                |                                                                                                                                                         |
| mobileBreakpoint   | Mobile breakpoint as max-width value                                                                                                            | string         | -                                                                               |                                                                                                                                                         |
| onCancel           | Callback on cancel                                                                                                                              | func           | -                                                                               | Default function (see source code)                                                                                                                      |
| open               | To control the behaviour of the sidebar programmatically, use the .sync modifier (Vue 2.x) or v-model:open (Vue 3.x) to make it two-way binding | boolean        | -                                                                               |                                                                                                                                                         |
| overlay            | Show an overlay like modal                                                                                                                      | boolean        | -                                                                               |                                                                                                                                                         |
| override           |                                                                                                                                                 | boolean        | -                                                                               |                                                                                                                                                         |
| position           | Skeleton position in relation to the window                                                                                                     | string         | `fixed`, `absolute`, `static`                                                   | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> sidebar: {<br>&nbsp;&nbsp;position: 'fixed'<br>}</code>                |
| reduce             | Show a small sidebar                                                                                                                            | boolean        | -                                                                               |                                                                                                                                                         |
| right              | Show the sidebar on right                                                                                                                       | boolean        | -                                                                               |                                                                                                                                                         |
| scroll             |                                                                                                                                                 | string         | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> sidebar: {<br>&nbsp;&nbsp;scroll: 'clip'<br>}</code>                   |
| variant            | Color of the sidebar, optional                                                                                                                  | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                         |

## Events

| Event name  | Properties | Description |
| ----------- | ---------- | ----------- |
| update:open |            |
| close       |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                             | SASS Variable                      | Default                             |
| ---------------------------------------- | ---------------------------------- | ----------------------------------- |
| --oruga-sidebar-overlay                  | \$sidebar-overlay                  | hsla(0,0%,4%,.86)                   |
| --oruga-sidebar-box-shadow               | \$sidebar-box-shadow               | 5px 0px 13px 3px rgba(\$black, 0.1) |
| --oruga-sidebar-content-background-color | \$sidebar-content-background-color | \$grey-lighter                      |
| --oruga-sidebar-mobile-width             | \$sidebar-mobile-width             | 80px                                |
| --oruga-sidebar-width                    | \$sidebar-width                    | 260px                               |
| --oruga-sidebar-zindex                   | \$sidebar-zindex                   | 38                                  |

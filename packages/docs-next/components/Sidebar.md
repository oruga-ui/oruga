---
title: Sidebar
---

# Sidebar

<div class="vp-doc">

> A sidebar to use as left/right overlay or static

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-sidebar />

</div>
<div class="vp-example">

## Class props

<inspector-sidebar-viewer />

</div>

<div class="vp-doc">

## Sidebar component

```html
<o-sidebar></o-sidebar>
```

### Props

| Prop name          | Description                                                                                               | Type           | Values                                                                          | Default                                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| canCancel          | Sidebar cancel options                                                                                    | array\|boolean | `true`, `false`, `'escape'`, `'outside'`                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;canCancel: [ "escape", "outside", ]<br>}</code> |
| expandOnHover      | Expand sidebar on hover when reduced or mobile is reduce                                                  | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |
| expandOnHoverFixed | Expand sidebar on hover with fixed position when reduced or mobile is reduce                              | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |
| fullheight         | Show sidebar in fullheight                                                                                | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |
| fullwidth          | Show sidebar in fullwidth                                                                                 | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |
| mobile             | Custom layout on mobile                                                                                   | string         | `fullwidth`, `reduced`, `hidden`                                                | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |
| mobileBreakpoint   | Mobile breakpoint as max-width value                                                                      | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |
| onCancel           | Callback on cancel                                                                                        | func           | -                                                                               | Default function (see source code)                                                                                                                                    |
| open               | To control the behaviour of the sidebar programmatically, use the v-model:open to make it two-way binding | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |
| overlay            | Show an overlay like modal                                                                                | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |
| override           |                                                                                                           | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |
| position           | Skeleton position in relation to the window                                                               | string         | `fixed`, `absolute`, `static`                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;position: "fixed", <br>}</code>                 |
| reduce             | Show a small sidebar                                                                                      | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |
| right              | Show the sidebar on right                                                                                 | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |
| scroll             |                                                                                                           | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;scroll: "clip"<br>}</code>                      |
| variant            | Color of the sidebar, optional                                                                            | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                |

### Events

| Event name  | Properties | Description |
| ----------- | ---------- | ----------- |
| update:open |            |
| close       |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                            |
| --------------------------------- | ---------------------------------- |
| $sidebar-overlay                  | hsla(0, 0%, 4%, 0.86)              |
| $sidebar-box-shadow               | 5px 0px 13px 3px rgba($black, 0.1) |
| $sidebar-content-background-color | $grey-lighter                      |
| $sidebar-mobile-width             | 80px                               |
| $sidebar-width                    | 260px                              |
| $sidebar-zindex                   | 38                                 |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_sidebar.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                            |
| --------------------------------- | ---------------------------------- |
| $sidebar-overlay                  | hsla(0, 0%, 4%, 0.86)              |
| $sidebar-box-shadow               | 5px 0px 13px 3px rgba($black, 0.1) |
| $sidebar-content-background-color | $grey-lighter                      |
| $sidebar-mobile-width             | 80px                               |
| $sidebar-width                    | 260px                              |
| $sidebar-zindex                   | 38                                 |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_sidebar.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable           | Default |
| ----------------------- | ------- |
| $sidebar-reduced-width  | 5rem    |
| $sidebar-reduced-height | 10vh    |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_sidebar.scss)

</div>

</div>

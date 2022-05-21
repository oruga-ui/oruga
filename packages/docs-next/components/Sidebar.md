---
title: Sidebar
---

# Sidebar

> A sidebar to use as left/right overlay or static

> <CarbonAds />

---

## Examples

### Base

<ExampleViewer example="sidebar/base" />

### Static

<ExampleViewer example="sidebar/static" />

## Class props

<br />

<inspector-viewer component="sidebar" />

<br />
<br />

## Props

| Prop name          | Description                                                                                               | Type           | Values                                                                          | Default                                                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| canCancel          | Sidebar cancel options                                                                                    | array\|boolean | `true`, `false`, `'escape'`, `'outside'`                                        | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> sidebar: {<br>&nbsp;&nbsp;canCancel: ['escape', 'outside']<br>}</code> |
| expandOnHover      | Expand sidebar on hover when reduced or mobile is reduce                                                  | boolean        | -                                                                               |                                                                                                                                                         |
| expandOnHoverFixed | Expand sidebar on hover with fixed position when reduced or mobile is reduce                              | boolean        | -                                                                               |                                                                                                                                                         |
| fullheight         | Show sidebar in fullheight                                                                                | boolean        | -                                                                               |                                                                                                                                                         |
| fullwidth          | Show sidebar in fullwidth                                                                                 | boolean        | -                                                                               |                                                                                                                                                         |
| mobile             | Custom layout on mobile                                                                                   | string         | `fullwidth`, `reduced`, `hidden`                                                |                                                                                                                                                         |
| mobileBreakpoint   | Mobile breakpoint as max-width value                                                                      | string         | -                                                                               |                                                                                                                                                         |
| onCancel           | Callback on cancel                                                                                        | func           | -                                                                               | Default function (see source code)                                                                                                                      |
| open               | To control the behaviour of the sidebar programmatically, use the v-model:open to make it two-way binding | boolean        | -                                                                               |                                                                                                                                                         |
| overlay            | Show an overlay like modal                                                                                | boolean        | -                                                                               |                                                                                                                                                         |
| override           |                                                                                                           | boolean        | -                                                                               |                                                                                                                                                         |
| position           | Skeleton position in relation to the window                                                               | string         | `fixed`, `absolute`, `static`                                                   | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> sidebar: {<br>&nbsp;&nbsp;position: 'fixed'<br>}</code>                |
| reduce             | Show a small sidebar                                                                                      | boolean        | -                                                                               |                                                                                                                                                         |
| right              | Show the sidebar on right                                                                                 | boolean        | -                                                                               |                                                                                                                                                         |
| scroll             |                                                                                                           | string         | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> sidebar: {<br>&nbsp;&nbsp;scroll: 'clip'<br>}</code>                   |
| variant            | Color of the sidebar, optional                                                                            | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                         |

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

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__sidebar.scss.scss)

| CSS Variable                             | SASS Variable                      | Default                             |
| ---------------------------------------- | ---------------------------------- | ----------------------------------- |
| --oruga-sidebar-overlay                  | \$sidebar-overlay                  | hsla(0,0%,4%,.86)                   |
| --oruga-sidebar-box-shadow               | \$sidebar-box-shadow               | 5px 0px 13px 3px rgba(\$black, 0.1) |
| --oruga-sidebar-content-background-color | \$sidebar-content-background-color | \$grey-lighter                      |
| --oruga-sidebar-mobile-width             | \$sidebar-mobile-width             | 80px                                |
| --oruga-sidebar-width                    | \$sidebar-width                    | 260px                               |
| --oruga-sidebar-zindex                   | \$sidebar-zindex                   | 38                                  |

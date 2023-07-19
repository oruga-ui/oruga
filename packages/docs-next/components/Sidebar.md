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

## Sidebar Component

### Props

| Prop name          | Description                                                                                               | Type           | Values                                                                          | Default                                                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| canCancel          | Sidebar cancel options                                                                                    | array\|boolean | `true`, `false`, `'escape'`, `'outside'`                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> sidebar: {<br>&nbsp;&nbsp;canCancel: ['escape', 'outside']<br>}</code> |
| expandOnHover      | Expand sidebar on hover when reduced or mobile is reduce                                                  | boolean        | -                                                                               |                                                                                                                                                                     |
| expandOnHoverFixed | Expand sidebar on hover with fixed position when reduced or mobile is reduce                              | boolean        | -                                                                               |                                                                                                                                                                     |
| fullheight         | Show sidebar in fullheight                                                                                | boolean        | -                                                                               |                                                                                                                                                                     |
| fullwidth          | Show sidebar in fullwidth                                                                                 | boolean        | -                                                                               |                                                                                                                                                                     |
| mobile             | Custom layout on mobile                                                                                   | string         | `fullwidth`, `reduced`, `hidden`                                                |                                                                                                                                                                     |
| mobileBreakpoint   | Mobile breakpoint as max-width value                                                                      | string         | -                                                                               |                                                                                                                                                                     |
| onCancel           | Callback on cancel                                                                                        | func           | -                                                                               | Default function (see source code)                                                                                                                                  |
| open               | To control the behaviour of the sidebar programmatically, use the v-model:open to make it two-way binding | boolean        | -                                                                               |                                                                                                                                                                     |
| overlay            | Show an overlay like modal                                                                                | boolean        | -                                                                               |                                                                                                                                                                     |
| override           |                                                                                                           | boolean        | -                                                                               |                                                                                                                                                                     |
| position           | Skeleton position in relation to the window                                                               | string         | `fixed`, `absolute`, `static`                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> sidebar: {<br>&nbsp;&nbsp;position: 'fixed'<br>}</code>                |
| reduce             | Show a small sidebar                                                                                      | boolean        | -                                                                               |                                                                                                                                                                     |
| right              | Show the sidebar on right                                                                                 | boolean        | -                                                                               |                                                                                                                                                                     |
| scroll             |                                                                                                           | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> sidebar: {<br>&nbsp;&nbsp;scroll: 'clip'<br>}</code>                   |
| variant            | Color of the sidebar, optional                                                                            | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                                     |

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

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $sidebar-overlay | hsla(0,0%,4%,.86) !default |
| $sidebar-box-shadow | 5px 0px 13px 3px rgba($black, 0.1) !default |
| $sidebar-content-background-color | $grey-lighter !default |
| $sidebar-mobile-width | 80px !default |
| $sidebar-width | 260px !default |
| $sidebar-zindex | 38 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_sidebar.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $sidebar-overlay | hsla(0,0%,4%,.86) !default |
| $sidebar-box-shadow | 5px 0px 13px 3px rgba($black, 0.1) !default |
| $sidebar-content-background-color | $grey-lighter !default |
| $sidebar-mobile-width | 80px !default |
| $sidebar-width | 260px !default |
| $sidebar-zindex | 38 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_sidebar.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $sidebar-reduced-width | 5rem !default |
| $sidebar-reduced-height | 10vh !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_sidebar.scss)

</div>

</div>

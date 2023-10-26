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

> A sidebar to use as left/right overlay or static

```html
<o-sidebar></o-sidebar>
```

### Props

| Prop name          | Description                                                                                                                                                                         | Type                  | Values                                                                          | Default                                                                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| active             | Whether siedbar is active or not, use v-model:active to make it two-way binding.                                                                                                    | boolean               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                        |
| animation          | Custom animation (transition name)                                                                                                                                                  | string                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;animation: undefined<br>}</code>             |
| cancelable         | Is Sidebar cancleable by pressing escape or clicking outside.                                                                                                                       | string[] \| boolean   | `'escape'`, `'outside'`, `true`, `false`                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;cancelable: ["escape","outside"]<br>}</code> |
| component          | Component to be injected, used to open a component sidebar programmatically.<br/>Close sidebar within the component by emitting a 'close' event — emits('close')                    | Component             | -                                                                               |                                                                                                                                                                    |
| container          | DOM element where the sidebar component will be created on (for programmatic usage).                                                                                                | string \| HTMLElement | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;container: "body"<br>}</code>                |
| destroyOnHide      | Destroy sidebar on hide                                                                                                                                                             | boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;destroyOnHide: false<br>}</code>             |
| events             | Events to be binded to the injected component.                                                                                                                                      | object                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>{}</code>                                                                                                           |
| expandOnHover      | Expand sidebar on hover when reduced or mobile is reduce                                                                                                                            | boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;expandOnHover: false<br>}</code>             |
| expandOnHoverFixed | Expand sidebar on hover with fixed position when reduced or mobile is reduce                                                                                                        | boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;expandOnHoverFixed: false<br>}</code>        |
| fullheight         | Show sidebar in fullheight                                                                                                                                                          | boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;fullheight: false<br>}</code>                |
| fullwidth          | Show sidebar in fullwidth                                                                                                                                                           | boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;fullwidth: false<br>}</code>                 |
| mobile             | Custom layout on mobile                                                                                                                                                             | string                | `fullwidth`, `reduced`, `hidden`                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;mobile: undefined<br>}</code>                |
| onCancel           | Callback function to call after user canceled (pressed escape / clicked outside)                                                                                                    | () =&gt; void         | -                                                                               | Default function (see source code)                                                                                                                                 |
| onClose            | Callback function to call after close (programmatically close or user canceled)                                                                                                     | () =&gt; void         | -                                                                               | Default function (see source code)                                                                                                                                 |
| overlay            | Show an overlay like modal                                                                                                                                                          | boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;overlay: false<br>}</code>                   |
| position           | Skeleton position in relation to the window                                                                                                                                         | string                | `fixed`, `absolute`, `static`                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;position: "fixed"<br>}</code>                |
| props              | Props to be binded to the injected component.                                                                                                                                       | object                | -                                                                               |                                                                                                                                                                    |
| reduce             | Show a small sidebar                                                                                                                                                                | boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;reduce: false<br>}</code>                    |
| right              | Show the sidebar on right                                                                                                                                                           | boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;right: false<br>}</code>                     |
| scroll             | Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,<br/>but will set body to position fixed, might break some layouts. | string                | `keep`, `clip`                                                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;scroll: "clip"<br>}</code>                   |
| variant            | Color of the sidebar, optional                                                                                                                                                      | string                | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>               |

### Events

| Event name    | Properties                                | Description                 |
| ------------- | ----------------------------------------- | --------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding |
| close         | **value** `any` - close event data        | on component close event    |

### Slots

| Name    | Description                                        | Bindings                                            |
| ------- | -------------------------------------------------- | --------------------------------------------------- |
| default | Sidebar default content, prop component is default | **close** `close` - function to close the component |

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

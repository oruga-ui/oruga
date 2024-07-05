---
title: Sidebar
---

# Sidebar

<div class="vp-doc">

> A sidebar to use as left/right overlay or static

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

| Prop name        | Description                                                                                                                                                                         | Type                                           | Values                                                                          | Default                                                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| active           | Whether siedbar is active or not, use v-model:active to make it two-way binding                                                                                                     | boolean                                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                        |
| animation        | Custom animation (transition name)                                                                                                                                                  | string                                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;animation: undefined<br>}</code>             |
| cancelable       | Is Sidebar cancleable by pressing escape or clicking outside.                                                                                                                       | boolean \| string[]                            | `escape`, `outside`, `true`, `false`                                            | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;cancelable: ["escape","outside"]<br>}</code> |
| component        | Component to be injected, used to open a component sidebar programmatically.<br/>Close sidebar within the component by emitting a 'close' event — emits('close')                    | any                                            | -                                                                               |                                                                                                                                                                    |
| container        | DOM element where the sidebar component will be created on (for programmatic usage).                                                                                                | string \| HTMLElement                          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;container: "body"<br>}</code>                |
| destroyOnHide    | Destroy sidebar on hide                                                                                                                                                             | boolean                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;destroyOnHide: false<br>}</code>             |
| events           | Events to be binded to the injected component.                                                                                                                                      | Record&lt;string, any&gt;                      | -                                                                               | <code style='white-space: nowrap; padding: 0;'>{}</code>                                                                                                           |
| expandOnHover    | Expand sidebar on hover when reduced or mobile is reduce                                                                                                                            | boolean                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;expandOnHover: false<br>}</code>             |
| fullheight       | Show sidebar in fullheight                                                                                                                                                          | boolean                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;fullheight: false<br>}</code>                |
| fullwidth        | Show sidebar in fullwidth                                                                                                                                                           | boolean                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;fullwidth: false<br>}</code>                 |
| inline           | Display the Sidebear inline                                                                                                                                                         | boolean                                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                        |
| mobile           | Custom layout on mobile                                                                                                                                                             | string                                         | `fullwidth`, `reduced`, `hidden`                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;mobile: undefined<br>}</code>                |
| mobileBreakpoint | Mobile breakpoint as `max-width` value                                                                                                                                              | string                                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>      |
| onClose          | Callback function to call on close (programmatically close or user canceled)                                                                                                        | () =&gt; void                                  | -                                                                               | Default function (see source code)                                                                                                                                 |
| overlay          | Show an overlay like modal                                                                                                                                                          | boolean                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;overlay: false<br>}</code>                   |
| override         | Override existing theme classes completely                                                                                                                                          | boolean                                        | -                                                                               |                                                                                                                                                                    |
| position         | Sidebar position                                                                                                                                                                    | "top" \| "bottom" \| "left" \| "right"         | `top`, `right`, `bottom`, `left`                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;position: "left"<br>}</code>                 |
| props            | Props to be binded to the injected component.                                                                                                                                       | Record&lt;string, any&gt;                      | -                                                                               |                                                                                                                                                                    |
| reduce           | Show a small sidebar                                                                                                                                                                | boolean                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;reduce: false<br>}</code>                    |
| scroll           | Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,<br/>but will set body to position fixed, might break some layouts. | string                                         | `keep`, `clip`                                                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;scroll: "clip"<br>}</code>                   |
| teleport         | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used.    | string \| boolean \| Record&lt;string, any&gt; | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                  |
| variant          | Color of the sidebar                                                                                                                                                                | string                                         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>               |

### Events

| Event name    | Properties                                | Description                 |
| ------------- | ----------------------------------------- | --------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding |
| close         | **value** `any` - close event data        | on component close event    |

### Slots

| Name    | Description                                        | Bindings                                                     |
| ------- | -------------------------------------------------- | ------------------------------------------------------------ |
| default | Sidebar default content, default is component prop | **close** `(...args):void` - function to close the component |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                                            |
| --------------------------------- | -------------------------------------------------- |
| $sidebar-overlay                  | hsla(0, 0%, 4%, 0.86)                              |
| $sidebar-box-shadow               | 5px 0px 13px 3px rgba(var(--#{$prefix}black), 0.1) |
| $sidebar-content-background-color | var(--#{$prefix}grey-lighter)                      |
| $sidebar-border-radius            | var(--#{$prefix}base-border-radius)                |
| $sidebar-border-width             | 1px                                                |
| $sidebar-border-color             | rgba(0, 0, 0, 0.175)                               |
| $sidebar-reduced-width            | 80px                                               |
| $sidebar-width                    | 260px                                              |
| $sidebar-zindex                   | 100                                                |

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

# Sidebar

<div class="vp-doc">

The **Sidebar** component can be toggled to appear from the left, right, top, or bottom edge of the viewport.
The component can be used to show an overlay for navigation, shopping carts, and more.

</div>

<div class="vp-example">

## Examples

<example-sidebar />

</div>

<div class="vp-example">

## Class Inspector

<inspector-sidebar-viewer />

</div>

<div class="vp-doc">

## Sidebar component

> A sidebar to use as overlay.

```html
<o-sidebar></o-sidebar>
```

### Props

| Prop name        | Description                                                                                                                                                                         | Type                                   | Values                               | Default                                                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| active           | Whether siedbar is active or not, use v-model:active to make it two-way binding                                                                                                     | boolean                                | -                                    | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                        |
| animation        | Custom animation (transition name)                                                                                                                                                  | string                                 | -                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;animation: undefined<br>}</code>             |
| cancelable       | Is Sidebar cancleable by pressing escape or clicking outside.                                                                                                                       | boolean \| string[]                    | `escape`, `outside`, `true`, `false` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;cancelable: ["escape","outside"]<br>}</code> |
| component        | Component to be injected.<br/>Close the component by emitting a 'close' event — `$emit('close')`                                                                                    | Component                              | -                                    |                                                                                                                                                                    |
| events           | Events to be binded to the injected component                                                                                                                                       | {}                                     | -                                    |                                                                                                                                                                    |
| expandOnHover    | Expand sidebar on hover when reduced or mobile is reduce                                                                                                                            | boolean                                | -                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;expandOnHover: false<br>}</code>             |
| fullheight       | Show sidebar in fullheight                                                                                                                                                          | boolean                                | -                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;fullheight: false<br>}</code>                |
| fullwidth        | Show sidebar in fullwidth                                                                                                                                                           | boolean                                | -                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;fullwidth: false<br>}</code>                 |
| inline           | Display the Sidebear inline                                                                                                                                                         | boolean                                | -                                    | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                        |
| mobile           | Custom layout on mobile                                                                                                                                                             | "expanded" \| "hidden" \| "reduced"    | `expanded`, `reduced`, `hidden`      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;mobile: undefined<br>}</code>                |
| mobileBreakpoint | Mobile breakpoint as `max-width` value                                                                                                                                              | string                                 | -                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>      |
| overlay          | Show an overlay like modal                                                                                                                                                          | boolean                                | -                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;overlay: false<br>}</code>                   |
| override         | Override existing theme classes completely                                                                                                                                          | boolean                                | -                                    |                                                                                                                                                                    |
| position         | Sidebar position                                                                                                                                                                    | "bottom" \| "left" \| "right" \| "top" | `top`, `right`, `bottom`, `left`     | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;position: "left"<br>}</code>                 |
| props            | Props to be binded to the injected component                                                                                                                                        | any                                    | -                                    |                                                                                                                                                                    |
| reduce           | Show a small sidebar                                                                                                                                                                | boolean                                | -                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;reduce: false<br>}</code>                    |
| scroll           | Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,<br/>but will set body to position fixed, might break some layouts. | "clip" \| "keep"                       | `keep`, `clip`                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;scroll: "clip"<br>}</code>                   |
| teleport         | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used.    | boolean \| object \| string            | -                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                  |

### Events

| Event name    | Properties                                | Description                 |
| ------------- | ----------------------------------------- | --------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding |
| close         | **value** `unknown` - close event data    | on component close event    |

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

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                        | Default                                                                                             |
| ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| $sidebar-colors                      | var.$colors                                                                                         |
| $sidebar-z                           | 40                                                                                                  |
| $sidebar-background-background-color | hsla( #{css.getVar("scheme-h")}, #{css.getVar("scheme-s")}, #{css.getVar("scheme-invert-l")}, 0.86) |
| $sidebar-shadow                      | css.getVar("shadow")                                                                                |
| $sidebar-width                       | 260px                                                                                               |
| $sidebar-height                      | 260px                                                                                               |
| $sidebar-mobile-width                | 80px                                                                                                |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_sidebar.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable           | Default |
| ----------------------- | ------- |
| $sidebar-reduced-width  | 5rem    |
| $sidebar-reduced-height | 10vh    |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_sidebar.scss)

</div>

</div>

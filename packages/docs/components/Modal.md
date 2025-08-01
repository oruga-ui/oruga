# Modal

<section class="odocs-head">

The **Modal** component is a classic modal overlay in which you can include any content you like.
The content under the overlay is inert, meaning users cannot interact with content outside the active modal window.
By default, modal overlays contain their own tab sequence so that users cannot navigate outside the component.
The component supports the W3C ARIA APG [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) as well as the W3C ARIA APG [Alert and Message Dialogs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/).

</section>

<section class="odocs-examples">

## Examples

<example-modal />

</section>

<section class="odocs-specs">

## Modal component

> Classic modal overlay to include any content you may need.

```html
<o-modal></o-modal>
```

### Props

| Prop name        | Description                                                                                                                                                                                                                                            | Type                        | Values                                              | Default                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active           | Whether modal is active or not, use v-model:active to make it two-way binding                                                                                                                                                                          | boolean                     | -                                                   | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                          |
| alert            | This enables the `alertdialog` role, allowing assistive technologies and browsers to distinguish alert modals from other modals.<br/>Alert modals interrupt the user's workflow to communicate an important messages and acquire an explicit response. | boolean                     | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;alert: false<br>}</code>                         |
| animation        | Custom animation (transition name)                                                                                                                                                                                                                     | string                      | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;animation: "zoom-out"<br>}</code>                |
| ariaCloseLabel   | Accessibility label for the close button                                                                                                                                                                                                               | string                      | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;ariaCloseLabel: "Close"<br>}</code>              |
| ariaLabel        | Accessibility aria-label to be passed to the div wrapper element                                                                                                                                                                                       | string                      | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;ariaLabel: undefined<br>}</code>                 |
| autoFocus        | Automatically focus modal when active                                                                                                                                                                                                                  | boolean                     | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;autoFocus: true<br>}</code>                      |
| cancelable       | Is Modal cancleable by clicking 'X', pressing escape or clicking outside                                                                                                                                                                               | boolean \| string[]         | `escape`, `x`, `outside`, `button`, `true`, `false` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;cancelable: ["escape","x","outside"]<br>}</code> |
| clipScroll       | Set `true` to remove the body scrollbar.<br/>When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,<br/>but will set the body to a fixed position, which may break some layouts.                                        | boolean                     | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;clipScroll: false<br>}</code>                    |
| closeIcon        | Close icon name                                                                                                                                                                                                                                        | string                      | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>                   |
| closeIconSize    | Size of close icon                                                                                                                                                                                                                                     | string                      | `small`, `medium`, `large`                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;closeIconSize: "medium"<br>}</code>              |
| component        | Component to be injected.<br/>Close the component by emitting a 'close' event — `$emit('close')`                                                                                                                                                       | Component                   | -                                                   |                                                                                                                                                                      |
| content          | Text content, unnecessary when default slot is used                                                                                                                                                                                                    | string                      | -                                                   |                                                                                                                                                                      |
| events           | Events to be binded to the injected component                                                                                                                                                                                                          | {}                          | -                                                   |                                                                                                                                                                      |
| fullScreen       | Display modal as full screen                                                                                                                                                                                                                           | boolean                     | -                                                   | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                          |
| mobileBreakpoint | Mobile breakpoint as `max-width` value                                                                                                                                                                                                                 | string                      | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>          |
| overlay          | Show an overlay                                                                                                                                                                                                                                        | boolean                     | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;overlay: true<br>}</code>                        |
| override         | Override existing theme classes completely                                                                                                                                                                                                             | boolean                     | -                                                   |                                                                                                                                                                      |
| props            | Props to be binded to the injected component                                                                                                                                                                                                           | any                         | -                                                   |                                                                                                                                                                      |
| teleport         | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used.                                                                       | boolean \| object \| string | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                      |
| trapFocus        | Trap focus inside the modal                                                                                                                                                                                                                            | boolean                     | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                      |
| width            | Width of the Modal                                                                                                                                                                                                                                     | number \| string            | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;width: 960<br>}</code>                           |

### Events

| Event name    | Properties                                | Description                 |
| ------------- | ----------------------------------------- | --------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding |
| close         | **value** `string` - close event method   | on component close event    |

### Slots

| Name    | Description                                    | Bindings                                                      |
| ------- | ---------------------------------------------- | ------------------------------------------------------------- |
| default | Modal default content, default is content prop | **close** `(...args): void` - function to close the component |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-modal-viewer />

</section>

<section class="odocs-style">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                              | Default                                      |
| ------------------------------------------ | -------------------------------------------- |
| $modal-content-background-color            | var(--#{$prefix}white)                       |
| $modal-content-border-radius               | var(--#{$prefix}base-border-radius)          |
| $modal-overlay-background-color            | hsla(0, 0%, 4%, 0.86)                        |
| $modal-close-border-radius                 | var( --#{$prefix}base-border-radius-rounded) |
| $modal-close-right                         | 20px                                         |
| $modal-close-top                           | 20px                                         |
| $modal-close-size                          | 32px                                         |
| $modal-close-color                         | var(--#{$prefix}white)                       |
| $modal-content-fullscreen-background-color | $control-brackground-color                   |
| $modal-content-max-height                  | calc(100vh - 160px)                          |
| $modal-content-margin                      | 0 auto                                       |
| $modal-zindex                              | 40                                           |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_modal.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</section>

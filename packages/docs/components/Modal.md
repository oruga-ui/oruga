# Modal

<div class="vp-doc">

> Classic modal overlay to include any content you may need

</div>

<div class="vp-example">

## Examples

<example-modal />

</div>
<div class="vp-example">

## Class props

<inspector-modal-viewer />

</div>

<div class="vp-doc">

## Modal component

> Classic modal overlay to include any content you may need

```html
<o-modal></o-modal>
```

### Props

| Prop name        | Description                                                                                                                                                                         | Type                                           | Values                                              | Default                                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active           |                                                                                                                                                                                     | boolean                                        | -                                                   | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                          |
| animation        | Custom animation (transition name)                                                                                                                                                  | string                                         | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;animation: "zoom-out"<br>}</code>                |
| ariaLabel        | Accessibility aria-label to be passed to the div wrapper element                                                                                                                    | string                                         | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;ariaLabel: undefined<br>}</code>                 |
| ariaRole         | Role attribute to be passed to the div wrapper for better accessibility.                                                                                                            | string                                         | `dialog`, `alertdialog`                             | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;ariaRole: undefined<br>}</code>                  |
| autoFocus        | Automatically focus modal when active                                                                                                                                               | boolean                                        | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;autoFocus: true<br>}</code>                      |
| cancelable       | Is Modal cancleable by clicking 'X', pressing escape or clicking outside                                                                                                            | boolean \| string[]                            | `escape`, `x`, `outside`, `button`, `true`, `false` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;cancelable: ["escape","x","outside"]<br>}</code> |
| closeIcon        | Close icon name                                                                                                                                                                     | string                                         | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>                   |
| closeIconSize    | Size of close icon                                                                                                                                                                  | string                                         | `small`, `medium`, `large`                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;closeIconSize: "medium"<br>}</code>              |
| component        | Component to be injected, used to open a component modal programmatically.<br/>Close modal within the component by emitting a 'close' event — emits('close')                        | any                                            | -                                                   |                                                                                                                                                                      |
| container        | DOM element where the modal component will be created on (for programmatic usage)                                                                                                   | string \| HTMLElement                          | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;container: "body"<br>}</code>                    |
| content          | Text content, unnecessary when default slot is used                                                                                                                                 | string \| Record&lt;string, any&gt;            | -                                                   |                                                                                                                                                                      |
| destroyOnHide    | Destroy modal on hide - default `true` for programmatic usage                                                                                                                       | boolean                                        | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;destroyOnHide: false<br>}</code>                 |
| events           | Events to be binded to the injected component                                                                                                                                       | Record&lt;string, any&gt;                      | -                                                   | <code style='white-space: nowrap; padding: 0;'>{}</code>                                                                                                             |
| fullScreen       | Display modal as full screen                                                                                                                                                        | boolean                                        | -                                                   | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                          |
| mobileBreakpoint | Mobile breakpoint as `max-width` value                                                                                                                                              | string                                         | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>          |
| onClose          | Callback function to call on close (programmatically close or user canceled)                                                                                                        | () =&gt; void                                  | -                                                   | Default function (see source code)                                                                                                                                   |
| overlay          | Show an overlay                                                                                                                                                                     | boolean                                        | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;overlay: true<br>}</code>                        |
| override         | Override existing theme classes completely                                                                                                                                          | boolean                                        | -                                                   |                                                                                                                                                                      |
| props            | Props to be binded to the injected component                                                                                                                                        | Record&lt;string, any&gt;                      | -                                                   |                                                                                                                                                                      |
| scroll           | Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,<br/>but will set body to position fixed, might break some layouts. | string                                         | `keep`, `clip`                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;scroll: "keep"<br>}</code>                       |
| teleport         | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used.    | string \| boolean \| Record&lt;string, any&gt; | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                      |
| trapFocus        | Trap focus inside the modal                                                                                                                                                         | boolean                                        | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                      |
| width            | Width of the Modal                                                                                                                                                                  | string \| number                               | -                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;width: 960<br>}</code>                           |

### Events

| Event name    | Properties                                | Description                 |
| ------------- | ----------------------------------------- | --------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding |
| close         | **value** `any` - close event data        | on component close event    |

### Slots

| Name    | Description                                    | Bindings                                                      |
| ------- | ---------------------------------------------- | ------------------------------------------------------------- |
| default | Modal default content, default is content prop | **close** `(...args): void` - function to close the component |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                              | Default                     |
| ------------------------------------------ | --------------------------- |
| $modal-content-background-color            | $white                      |
| $modal-content-border-radius               | $base-border-radius         |
| $modal-overlay-background-color            | hsla(0, 0%, 4%, 0.86)       |
| $modal-close-border-radius                 | $base-rounded-border-radius |
| $modal-close-right                         | 20px                        |
| $modal-close-top                           | 20px                        |
| $modal-close-size                          | 32px                        |
| $modal-close-color                         | $white                      |
| $modal-content-fullscreen-background-color | #f5f5f5                     |
| $modal-content-max-height                  | calc(100vh - 160px)         |
| $modal-content-margin                      | 0 auto                      |
| $modal-zindex                              | 40                          |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_modal.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>

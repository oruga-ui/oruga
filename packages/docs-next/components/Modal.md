---
title: Modal
---

# Modal

> Classic modal overlay to include any content you may need

> <CarbonAds />

---

## Examples

### Base

<ExampleViewer example="modal/base" />

### Programmatically

<ExampleViewer example="modal/programmatically" />

## Class props

<br />

<inspector-viewer component="modal" />

<br />
<br />

## Props

| Prop name        | Description                                                                                                                                                            | Type           | Values                             | Default                                                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active           | Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding                                                | boolean        | -                                  |                                                                                                                                                                      |
| animation        | Custom animation (transition name)                                                                                                                                     | string         | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;animation: 'zoom-out'<br>}</code>                           |
| ariaLabel        |                                                                                                                                                                        | string         | -                                  |                                                                                                                                                                      |
| ariaModal        |                                                                                                                                                                        | boolean        | -                                  |                                                                                                                                                                      |
| ariaRole         |                                                                                                                                                                        | string         | -                                  |                                                                                                                                                                      |
| autoFocus        | Automatically focus modal when active                                                                                                                                  | boolean        | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;autoFocus: true<br>}</code>                                 |
| canCancel        | Can close Modal by clicking 'X', pressing escape or clicking outside                                                                                                   | array\|boolean | `escape`, `x`, `outside`, `button` | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;canCancel: ['escape', 'x', 'outside', 'button']<br>}</code> |
| closeIcon        | Icon name                                                                                                                                                              | string         | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;closeIcon: 'close'<br>}</code>                              |
| closeIconSize    |                                                                                                                                                                        | string         | -                                  | 'medium'                                                                                                                                                             |
| component        | Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.\$emit('close')         | object\|func   | -                                  |                                                                                                                                                                      |
| content          | Text content                                                                                                                                                           | string         | -                                  |                                                                                                                                                                      |
| custom           | Enable custom style on modal content                                                                                                                                   | boolean        | -                                  |                                                                                                                                                                      |
| destroyOnHide    | Destroy modal on hide                                                                                                                                                  | boolean        | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;destroyOnHide: true<br>}</code>                             |
| events           | Events to be binded to the injected component                                                                                                                          | object         | -                                  |                                                                                                                                                                      |
| fullScreen       | Display modal as full screen                                                                                                                                           | boolean        | -                                  |                                                                                                                                                                      |
| mobileBreakpoint | Mobile breakpoint as max-width value                                                                                                                                   | string         | -                                  |                                                                                                                                                                      |
| onCancel         | Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside)                                                                         | func           | -                                  | Default function (see source code)                                                                                                                                   |
| onClose          | Callback function to call after close (programmatically close or user canceled)                                                                                        | func           | -                                  | Default function (see source code)                                                                                                                                   |
| override         |                                                                                                                                                                        | boolean        | -                                  |                                                                                                                                                                      |
| programmatic     |                                                                                                                                                                        | boolean        | -                                  |                                                                                                                                                                      |
| props            | Props to be binded to the injected component                                                                                                                           | object         | -                                  |                                                                                                                                                                      |
| scroll           | clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts | string         | `keep`, `clip`                     | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;scroll: 'keep'<br>}</code>                                  |
| trapFocus        | Trap focus inside the modal.                                                                                                                                           | boolean        | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                                 |
| width            | Width of the Modal                                                                                                                                                     | string\|number | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;width: 960<br>}</code>                                      |

## Events

| Event name    | Properties | Description |
| ------------- | ---------- | ----------- |
| update:active |            |
| close         |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__modal.scss.scss)

| CSS Variable                                      | SASS Variable                               | Default                      |
| ------------------------------------------------- | ------------------------------------------- | ---------------------------- |
| --oruga-modal-content-background-color            | \$modal-content-background-color            | \$white                      |
| --oruga-modal-content-padding                     | \$modal-content-padding                     | 10px                         |
| --oruga-modal-content-border-radius               | \$modal-content-border-radius               | \$base-border-radius         |
| --oruga-modal-overlay-background-color            | \$modal-overlay-background-color            | hsla(0,0%,4%,.86)            |
| --oruga-modal-close-border-radius                 | \$modal-close-border-radius                 | \$base-rounded-border-radius |
| --oruga-modal-close-right                         | \$modal-close-right                         | 20px                         |
| --oruga-modal-close-top                           | \$modal-close-top                           | 20px                         |
| --oruga-modal-close-size                          | \$modal-close-size                          | 32px                         |
| --oruga-modal-close-color                         | \$modal-close-color                         | \$white                      |
| --oruga-modal-content-fullscreen-background-color | \$modal-content-fullscreen-background-color | #f5f5f5                      |
| --oruga-modal-content-max-height                  | \$modal-content-max-height                  | calc(100vh - 160px)          |
| --oruga-modal-content-margin                      | \$modal-content-margin                      | 0 auto                       |
| --oruga-modal-zindex                              | \$modal-zindex                              | 40                           |

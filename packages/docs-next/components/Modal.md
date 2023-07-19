---
title: Modal
---

# Modal

<div class="vp-doc">

> Classic modal overlay to include any content you may need

<Carbon />
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

## Modal Component

### Props

| Prop name        | Description                                                                                                                                                            | Type           | Values                             | Default                                                                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active           | Whether modal is active or not, use v-model:active to make it two-way binding                                                                                          | boolean        | -                                  |                                                                                                                                                                                  |
| animation        | Custom animation (transition name)                                                                                                                                     | string         | -                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;animation: 'zoom-out'<br>}</code>                           |
| ariaLabel        |                                                                                                                                                                        | string         | -                                  |                                                                                                                                                                                  |
| ariaModal        |                                                                                                                                                                        | boolean        | -                                  |                                                                                                                                                                                  |
| ariaRole         |                                                                                                                                                                        | string         | -                                  |                                                                                                                                                                                  |
| autoFocus        | Automatically focus modal when active                                                                                                                                  | boolean        | -                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;autoFocus: true<br>}</code>                                 |
| canCancel        | Can close Modal by clicking 'X', pressing escape or clicking outside                                                                                                   | array\|boolean | `escape`, `x`, `outside`, `button` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;canCancel: ['escape', 'x', 'outside', 'button']<br>}</code> |
| closeIcon        | Icon name                                                                                                                                                              | string         | -                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;closeIcon: 'close'<br>}</code>                              |
| closeIconSize    |                                                                                                                                                                        | string         | -                                  | 'medium'                                                                                                                                                                         |
| component        | Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close')          | object\|func   | -                                  |                                                                                                                                                                                  |
| content          | Text content                                                                                                                                                           | string         | -                                  |                                                                                                                                                                                  |
| destroyOnHide    | Destroy modal on hide                                                                                                                                                  | boolean        | -                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;destroyOnHide: true<br>}</code>                             |
| events           | Events to be binded to the injected component                                                                                                                          | object         | -                                  |                                                                                                                                                                                  |
| fullScreen       | Display modal as full screen                                                                                                                                           | boolean        | -                                  |                                                                                                                                                                                  |
| mobileBreakpoint | Mobile breakpoint as max-width value                                                                                                                                   | string         | -                                  |                                                                                                                                                                                  |
| onCancel         | Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside)                                                                         | func           | -                                  | Default function (see source code)                                                                                                                                               |
| onClose          | Callback function to call after close (programmatically close or user canceled)                                                                                        | func           | -                                  | Default function (see source code)                                                                                                                                               |
| override         |                                                                                                                                                                        | boolean        | -                                  |                                                                                                                                                                                  |
| programmatic     |                                                                                                                                                                        | object         | -                                  |                                                                                                                                                                                  |
| promise          |                                                                                                                                                                        | Promise        | -                                  |                                                                                                                                                                                  |
| props            | Props to be binded to the injected component                                                                                                                           | object         | -                                  |                                                                                                                                                                                  |
| scroll           | clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts | string         | `keep`, `clip`                     | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;scroll: 'keep'<br>}</code>                                  |
| trapFocus        | Trap focus inside the modal.                                                                                                                                           | boolean        | -                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                                 |
| width            | Width of the Modal                                                                                                                                                     | string\|number | -                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;width: 960<br>}</code>                                      |

### Events

| Event name    | Properties | Description |
| ------------- | ---------- | ----------- |
| update:active |            |
| close         |            |

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
| $modal-content-background-color | $white !default |
| $modal-content-border-radius | $base-border-radius !default |
| $modal-overlay-background-color | hsla(0,0%,4%,.86) !default |
| $modal-close-border-radius | $base-rounded-border-radius !default |
| $modal-close-right | 20px !default |
| $modal-close-top | 20px !default |
| $modal-close-size | 32px !default |
| $modal-close-color | $white !default |
| $modal-content-fullscreen-background-color | #f5f5f5 !default |
| $modal-content-max-height | calc(100vh - 160px) !default |
| $modal-content-margin | 0 auto !default |
| $modal-zindex | 40 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_modal.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $modal-content-background-color | $white !default |
| $modal-content-border-radius | $base-border-radius !default |
| $modal-overlay-background-color | hsla(0,0%,4%,.86) !default |
| $modal-close-border-radius | $base-rounded-border-radius !default |
| $modal-close-right | 20px !default |
| $modal-close-top | 20px !default |
| $modal-close-size | 32px !default |
| $modal-close-color | $white !default |
| $modal-content-fullscreen-background-color | #f5f5f5 !default |
| $modal-content-max-height | calc(100vh - 160px) !default |
| $modal-content-margin | 0 auto !default |
| $modal-zindex | 40 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_modal.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">

<p> This component does not have any Oruga style overrides for the Bootstrap Theme. </p>
      
</div>

</div>

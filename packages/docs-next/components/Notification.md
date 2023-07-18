---
title: Notification
---

# Notification

<div class="vp-doc">

> Bold notification blocks to alert your users of something

<Carbon />
</div>

<div class="vp-doc">

## Examples

<example-notification />

</div>
<div class="vp-doc">

## Class props

<inspector-notification-viewer />

</div>

<div class="vp-doc">

## Notification Component

### Props

| Prop name      | Description                                                                                                                                                   | Type           | Values                                                                          | Default                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active         | Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding                                       | boolean        | -                                                                               | true                                                                                                                                                       |
| animation      | Custom animation (transition name).                                                                                                                           | string         | -                                                                               | 'fade'                                                                                                                                                     |
| ariaCloseLabel | Label for the close button, to be read by accessibility screenreaders.                                                                                        | string         | -                                                                               |                                                                                                                                                            |
| autoClose      | Hide notification after duration only not programmatic.                                                                                                       | boolean        | -                                                                               | false                                                                                                                                                      |
| closable       | Adds an 'X' button that closes the notification.                                                                                                              | boolean        | -                                                                               | false                                                                                                                                                      |
| closeIcon      | Close icon name                                                                                                                                               | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> notification: {<br>&nbsp;&nbsp;closeIcon: 'close'<br>}</code> |
| closeIconSize  | Size of close icon                                                                                                                                            | string         | -                                                                               | 'small'                                                                                                                                                    |
| component      | Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') | object\|func   | -                                                                               |                                                                                                                                                            |
| duration       | Visibility duration in miliseconds.                                                                                                                           | number         | -                                                                               | 2000                                                                                                                                                       |
| events         | Events to be binded to the injected component                                                                                                                 | object         | -                                                                               | {}                                                                                                                                                         |
| hasIcon        | Adds an icon on the left side depending on the type (or the icon prop if defined).                                                                            | boolean        | -                                                                               |                                                                                                                                                            |
| icon           | Icon name to use with has-icon.                                                                                                                               | string         | -                                                                               |                                                                                                                                                            |
| iconPack       | Icon pack to use.                                                                                                                                             | string         | -                                                                               |                                                                                                                                                            |
| iconSize       | Icon size                                                                                                                                                     | string         | -                                                                               | 'large'                                                                                                                                                    |
| message        | Message text (can contain HTML).                                                                                                                              | string         | -                                                                               |                                                                                                                                                            |
| override       |                                                                                                                                                               | boolean        | -                                                                               |                                                                                                                                                            |
| position       | Which position the notification will appear when programmatically                                                                                             | string         | `top-right`, `top`, `top-left`, `bottom-right`, `bottom`, `bottom-left`         |                                                                                                                                                            |
| props          | Props to be binded to the injected component                                                                                                                  | object         | -                                                                               |                                                                                                                                                            |
| type           | Type (color) of the notification, optional.                                                                                                                   | string         | -                                                                               |                                                                                                                                                            |
| variant        | Color of the control, optional                                                                                                                                | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                            |

### Events

| Event name    | Properties | Description |
| ------------- | ---------- | ----------- |
| close         |            |
| update:active |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

## NotificationNotice Component

### Props

| Prop name         | Description                                                                                                                                                         | Type          | Values                                                                  | Default                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| container         | DOM element the toast will be created on. Note that this also changes the position of the toast from fixed to absolute. Meaning that the container should be fixed. | string        | -                                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> notification: {<br>&nbsp;&nbsp;containerElement: undefined<br>}</code> |
| duration          | Visibility duration in miliseconds.                                                                                                                                 | number        | -                                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> notification: {<br>&nbsp;&nbsp;duration: 1000<br>}</code>              |
| indefinite        | Show the Notification indefinitely until it is dismissed when programmatically.                                                                                     | boolean       | -                                                                       | false                                                                                                                                                               |
| message           | Message text (can contain HTML).                                                                                                                                    | string\|array | -                                                                       |                                                                                                                                                                     |
| onClose           | Callback function to call after close (programmatically close or user canceled)                                                                                     | func          | -                                                                       | Default function (see source code)                                                                                                                                  |
| override          |                                                                                                                                                                     | boolean       | -                                                                       |                                                                                                                                                                     |
| position          | Which position the notification will appear when programmatically.                                                                                                  | string        | `top-right`, `top`, `top-left`, `bottom-right`, `bottom`, `bottom-left` | 'top'                                                                                                                                                               |
| programmatic      |                                                                                                                                                                     | object        | -                                                                       |                                                                                                                                                                     |
| promise           |                                                                                                                                                                     | Promise       | -                                                                       |                                                                                                                                                                     |
| propsNotification |                                                                                                                                                                     | object        | -                                                                       |                                                                                                                                                                     |
| queue             | If should queue with others notices (snackbar/toast/notification).                                                                                                  | boolean       | -                                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> notification: {<br>&nbsp;&nbsp;noticeQueue: undefined<br>}</code>      |
| type              | Type (color) of the notification, optional.                                                                                                                         | string        | -                                                                       |                                                                                                                                                                     |

### Events

| Event name    | Properties | Description |
| ------------- | ---------- | ----------- |
| close         |            |
| update:active |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $notification-background-color | $primary !default |
| $notification-border-radius | 4px !default |
| $notification-padding | 1.75em 1.75em !default |
| $notification-margin-bottom | 1.5rem !default |
| $notification-animantion | append-animate .3s linear !default |
| $notification-color | $white !default |
| $notification-close-border-radius | $base-rounded-border-radius !default |
| $notification-close-right | .5rem !default |
| $notification-close-top | .5rem !default |
| $notification-close-size | 20px !default |
| $notification-close-color | $white !default |
| $notification-close-background-color | hsla(0,0%,4%,.2) !default |
| $notification-icon-margin-right | 1rem !default |
| $notification-notices-padding | 2em !default |
| $notification-notices-zindex | 1000 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_notification.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $notification-background-color | $primary !default |
| $notification-border-radius | 4px !default |
| $notification-padding | 1.75em 1.75em !default |
| $notification-margin-bottom | 1.5rem !default |
| $notification-animantion | append-animate .3s linear !default |
| $notification-color | $white !default |
| $notification-close-border-radius | $base-rounded-border-radius !default |
| $notification-close-right | .5rem !default |
| $notification-close-top | .5rem !default |
| $notification-close-size | 20px !default |
| $notification-close-color | $white !default |
| $notification-close-background-color | hsla(0,0%,4%,.2) !default |
| $notification-icon-margin-right | 1rem !default |
| $notification-notices-padding | 2em !default |
| $notification-notices-zindex | 1000 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_notification.scss)

</div>

<div class="theme-bulma">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $notification-margin-bottom | 1.5rem !default |
| $notification-notices-padding | 2em !default |
| $notification-notices-zindex | 1000 !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_notification.scss)

</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $notification-close-btn-position | 1rem !default |
| $notification-notices-padding | 2em !default |
| $notification-notices-zindex | $zindex-toast !default |
| $notification-notices-max-width | 600px !default |
| $notification-notices-space | 1.5rem !default |
| $notification-icon-margin-right | 0.5rem !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_notification.scss)

</div>

</div>

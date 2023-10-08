---
title: Notification
---

# Notification

<div class="vp-doc">

> Bold notification blocks to alert your users of something

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-notification />

</div>
<div class="vp-example">

## Class props

<inspector-notification-viewer />

</div>

<div class="vp-doc">

## Notification component

```html
<o-notification></o-notification>
```

### Props

| Prop name      | Description                                                                                                                                                   | Type           | Values                                                                          | Default                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active         | Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding                                       | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                  |
| animation      | Custom animation (transition name).                                                                                                                           | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>"fade"</code>                                                                                                |
| ariaCloseLabel | Label for the close button, to be read by accessibility screenreaders.                                                                                        | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                      |
| autoClose      | Hide notification after duration only not programmatic.                                                                                                       | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| closable       | Adds an 'X' button that closes the notification.                                                                                                              | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| closeIcon      | Close icon name                                                                                                                                               | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;closeIcon: "close", <br>}</code> |
| closeIconSize  | Size of close icon                                                                                                                                            | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>"small"</code>                                                                                               |
| component      | Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') |                | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                      |
| duration       | Visibility duration in miliseconds.                                                                                                                           | number         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>2000</code>                                                                                                  |
| events         | Events to be binded to the injected component                                                                                                                 | object         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>{}</code>                                                                                                    |
| hasIcon        | Adds an icon on the left side depending on the type (or the icon prop if defined).                                                                            | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                      |
| icon           | Icon name to use with has-icon.                                                                                                                               | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                      |
| iconPack       | Icon pack to use.                                                                                                                                             | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                      |
| iconSize       | Icon size                                                                                                                                                     | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>"large"</code>                                                                                               |
| message        | Message text (can contain HTML).                                                                                                                              | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                      |
| override       |                                                                                                                                                               | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                      |
| position       | Which position the notification will appear when programmatically                                                                                             | string         | `top-right`, `top`, `top-left`, `bottom-right`, `bottom`, `bottom-left`         | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                      |
| props          | Props to be binded to the injected component                                                                                                                  | object         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                      |
| type           | Type (color) of the notification, optional.                                                                                                                   | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                      |
| variant        | Color of the control, optional                                                                                                                                | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                      |

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

## NotificationNotice component

```html
<o-notification-notice></o-notification-notice>
```

### Props

| Prop name         | Description                                                                                                                                                         | Type          | Values                                                                  | Default                                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| container         | DOM element the toast will be created on. Note that this also changes the position of the toast from fixed to absolute. Meaning that the container should be fixed. | string        | -                                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;containerElement: undefined, <br>}</code> |
| duration          | Visibility duration in miliseconds.                                                                                                                                 | number        | -                                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;duration: 1000, <br>}</code>              |
| indefinite        | Show the Notification indefinitely until it is dismissed when programmatically.                                                                                     | boolean       | -                                                                       | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                          |
| message           | Message text (can contain HTML).                                                                                                                                    | string\|array | -                                                                       | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                               |
| onClose           | Callback function to call after close (programmatically close or user canceled)                                                                                     | func          | -                                                                       | Default function (see source code)                                                                                                                                   |
| override          |                                                                                                                                                                     | boolean       | -                                                                       | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                               |
| position          | Which position the notification will appear when programmatically.                                                                                                  | string        | `top-right`, `top`, `top-left`, `bottom-right`, `bottom`, `bottom-left` | <code style='white-space: nowrap; padding: 0;'>"top"</code>                                                                                                          |
| propsNotification |                                                                                                                                                                     | object        | -                                                                       | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                               |
| queue             | If should queue with others notices (snackbar/toast/notification).                                                                                                  | boolean       | -                                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;noticeQueue: undefined, <br>}</code>      |
| type              | Type (color) of the notification, optional.                                                                                                                         | string        | -                                                                       | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                               |

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

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                        | Default                     |
| ------------------------------------ | --------------------------- |
| $notification-background-color       | $primary                    |
| $notification-border-radius          | 4px                         |
| $notification-padding                | 1.75em 1.75em               |
| $notification-margin-bottom          | 1.5rem                      |
| $notification-animantion             | append-animate 0.3s linear  |
| $notification-color                  | $white                      |
| $notification-close-border-radius    | $base-rounded-border-radius |
| $notification-close-right            | 0.5rem                      |
| $notification-close-top              | 0.5rem                      |
| $notification-close-size             | 20px                        |
| $notification-close-color            | $white                      |
| $notification-close-background-color | hsla(0, 0%, 4%, 0.2)        |
| $notification-icon-margin-right      | 1rem                        |
| $notification-notices-padding        | 2em                         |
| $notification-notices-zindex         | 1000                        |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_notification.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                        | Default                     |
| ------------------------------------ | --------------------------- |
| $notification-background-color       | $primary                    |
| $notification-border-radius          | 4px                         |
| $notification-padding                | 1.75em 1.75em               |
| $notification-margin-bottom          | 1.5rem                      |
| $notification-animantion             | append-animate 0.3s linear  |
| $notification-color                  | $white                      |
| $notification-close-border-radius    | $base-rounded-border-radius |
| $notification-close-right            | 0.5rem                      |
| $notification-close-top              | 0.5rem                      |
| $notification-close-size             | 20px                        |
| $notification-close-color            | $white                      |
| $notification-close-background-color | hsla(0, 0%, 4%, 0.2)        |
| $notification-icon-margin-right      | 1rem                        |
| $notification-notices-padding        | 2em                         |
| $notification-notices-zindex         | 1000                        |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_notification.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                 | Default |
| ----------------------------- | ------- |
| $notification-margin-bottom   | 1.5rem  |
| $notification-notices-padding | 2em     |
| $notification-notices-zindex  | 1000    |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_notification.scss)

</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                    | Default       |
| -------------------------------- | ------------- |
| $notification-close-btn-position | 1rem          |
| $notification-notices-padding    | 2em           |
| $notification-notices-zindex     | $zindex-toast |
| $notification-notices-max-width  | 600px         |
| $notification-notices-space      | 1.5rem        |
| $notification-icon-margin-right  | 0.5rem        |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_notification.scss)

</div>

</div>

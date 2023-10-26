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

> Bold notification blocks to alert your users of something

```html
<o-notification></o-notification>
```

### Props

| Prop name      | Description                                                                   | Type               | Values                                                                          | Default                                                                                                                                                                     |
| -------------- | ----------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active         | Whether modal is active or not, use v-model:active to make it two-way binding | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                                  |
| animation      | Custom animation (transition name)                                            | string             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>                    |
| ariaCloseLabel | Accessibility label for the close button                                      | string             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;ariaCloseLabel: "Close notification"<br>}</code> |
| closable       | Add close button to the item that closes the notification                     | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                 |
| closeIcon      | Close icon name                                                               | string             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>                   |
| closeIconSize  | Size of close icon                                                            | string             | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;closeIconSize: undefined<br>}</code>             |
| icon           | Icon name to use                                                              | string             | -                                                                               |                                                                                                                                                                             |
| iconPack       | Icon pack to use                                                              | string             | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>                  |
| iconSize       | Icon size                                                                     | string             | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;iconSize: "large"<br>}</code>                    |
| message        | Message text (can contain HTML), unnecessary when default slot is used        | string \| string[] | -                                                                               |                                                                                                                                                                             |
| position       | Which position the notification will appear when programmatically             | string             | `top-right`, `top`, `top-left`, `bottom-right`, `bottom`, `bottom-left`         | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;position: "top"<br>}</code>                      |
| type           | Type (color) of the notification, optional                                    | string             | `info`, `success`, `warning`, `danger`                                          |                                                                                                                                                                             |
| variant        | Color of the control, optional                                                | string             | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>                   |

### Events

| Event name    | Properties                                | Description                 |
| ------------- | ----------------------------------------- | --------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding |
| close         | **value** `any` - close event data        | on component close event    |

### Slots

| Name    | Description                                                  | Bindings                                               |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| inner   | Notification inner content, outside of the message container | **close** `close` - function to close the notification |
| default | Notification default content, message prop is default        | **close** `close` - function to close the notification |

</div>

<div class="vp-doc">

## NotificationNotice component

> Notification Notice is used for the programmatic usage

```html
<o-notification-notice></o-notification-notice>
```

### Props

| Prop name    | Description                                                                                                                                                                                          | Type                  | Values                                                                  | Default                                                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active       | Whether notification is active or not, use v-model:active to make it two-way binding.                                                                                                                | boolean               | -                                                                       | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                    |
| component    | Component to be injected.<br/>Close notification within the component by emitting a 'close' event — $emit('close').                                                                                  | Component             | -                                                                       |                                                                                                                                                               |
| container    | DOM element the toast will be created on (for programmatic usage).<br/>Note that this also changes the position of the toast from fixed to absolute.<br/>Meaning that the container should be fixed. | string \| HTMLElement | -                                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;container: "body"<br>}</code>      |
| duration     | Hide notification after duration (in miliseconds)                                                                                                                                                    | number                | -                                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;duration: 2000<br>}</code>         |
| events       | Events to be binded to the injected component.                                                                                                                                                       | object                | -                                                                       | <code style='white-space: nowrap; padding: 0;'>{}</code>                                                                                                      |
| indefinite   | Show the Notification indefinitely until it is dismissed.                                                                                                                                            | boolean               | -                                                                       | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                   |
| notification | Props passed to the internal notification component.                                                                                                                                                 | NotifcationProps      | -                                                                       | Default function (see source code)                                                                                                                            |
| onCancel     | Callback function to call after user canceled (pressed escape / clicked outside).                                                                                                                    | () =&gt; void         | -                                                                       | Default function (see source code)                                                                                                                            |
| onClose      | Callback function to call after close (programmatically close or user canceled).                                                                                                                     | () =&gt; void         | -                                                                       | Default function (see source code)                                                                                                                            |
| position     | Which position the notification will appear when programmatically.                                                                                                                                   | string                | `top-right`, `top`, `top-left`, `bottom-right`, `bottom`, `bottom-left` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;position: "top"<br>}</code>        |
| props        | Props to be binded to the injected component.                                                                                                                                                        | object                | -                                                                       |                                                                                                                                                               |
| queue        | If notice should queue with others notices (snackbar/toast/notification).                                                                                                                            | boolean               | -                                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>notification: {<br>&nbsp;&nbsp;noticeQueue: undefined<br>}</code> |

### Events

| Event name    | Properties                                | Description                 |
| ------------- | ----------------------------------------- | --------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding |
| close         | **value** `any` - close event data        | on component close event    |

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

---
title: Notification
---

# Notification

<div class="vp-doc">

> Bold notification blocks to alert your users of something

</div>
<example-notification />

## Class props

<br />

<inspector-notification-viewer />

<br />
<br />

<div class="vp-doc">

## Props

| Prop name      | Description                                                                                                                                                    | Type           | Values                                                                          | Default                                                                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| active         | Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding                                        | boolean        | -                                                                               | true                                                                                                                                           |
| animation      | Custom animation (transition name).                                                                                                                            | string         | -                                                                               | 'fade'                                                                                                                                         |
| ariaCloseLabel | Label for the close button, to be read by accessibility screenreaders.                                                                                         | string         | -                                                                               |                                                                                                                                                |
| autoClose      | Hide notification after duration only not programmatic.                                                                                                        | boolean        | -                                                                               | false                                                                                                                                          |
| closable       | Adds an 'X' button that closes the notification.                                                                                                               | boolean        | -                                                                               | false                                                                                                                                          |
| closeIcon      | Close icon name                                                                                                                                                | string         | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> notification: {<br>&nbsp;&nbsp;closeIcon: 'close'<br>}</code> |
| closeIconSize  | Size of close icon                                                                                                                                             | string         | -                                                                               | 'small'                                                                                                                                        |
| component      | Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.\$emit('close') | object\|func   | -                                                                               |                                                                                                                                                |
| duration       | Visibility duration in miliseconds.                                                                                                                            | number         | -                                                                               | 2000                                                                                                                                           |
| events         | Events to be binded to the injected component                                                                                                                  | object         | -                                                                               | {}                                                                                                                                             |
| hasIcon        | Adds an icon on the left side depending on the type (or the icon prop if defined).                                                                             | boolean        | -                                                                               |                                                                                                                                                |
| icon           | Icon name to use with has-icon.                                                                                                                                | string         | -                                                                               |                                                                                                                                                |
| iconPack       | Icon pack to use.                                                                                                                                              | string         | -                                                                               |                                                                                                                                                |
| iconSize       | Icon size                                                                                                                                                      | string         | -                                                                               | 'large'                                                                                                                                        |
| message        | Message text (can contain HTML).                                                                                                                               | string         | -                                                                               |                                                                                                                                                |
| override       |                                                                                                                                                                | boolean        | -                                                                               |                                                                                                                                                |
| position       | Which position the notification will appear when programmatically                                                                                              | string         | `top-right`, `top`, `top-left`, `bottom-right`, `bottom`, `bottom-left`         |                                                                                                                                                |
| props          | Props to be binded to the injected component                                                                                                                   | object         | -                                                                               |                                                                                                                                                |
| type           | Type (color) of the notification, optional.                                                                                                                    | string         | -                                                                               |                                                                                                                                                |
| variant        | Color of the control, optional                                                                                                                                 | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                |

### Events

| Event name    | Properties | Description |
| ------------- | ---------- | ----------- |
| close         |            |
| update:active |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_notification.scss)

| CSS Variable                                | SASS Variable                         | Default                      |
| ------------------------------------------- | ------------------------------------- | ---------------------------- |
| --oruga-notification-background-color       | \$notification-background-color       | \$primary                    |
| --oruga-notification-border-radius          | \$notification-border-radius          | 4px                          |
| --oruga-notification-padding                | \$notification-padding                | 1.75em 1.75em                |
| --oruga-notification-margin-bottom          | \$notification-margin-bottom          | 1.5rem                       |
| --oruga-notification-animantion             | \$notification-animantion             | append-animate .3s linear    |
| --oruga-notification-color                  | \$notification-color                  | \$white                      |
| --oruga-notification-close-border-radius    | \$notification-close-border-radius    | \$base-rounded-border-radius |
| --oruga-notification-close-right            | \$notification-close-right            | .5rem                        |
| --oruga-notification-close-top              | \$notification-close-top              | .5rem                        |
| --oruga-notification-close-size             | \$notification-close-size             | 20px                         |
| --oruga-notification-close-color            | \$notification-close-color            | \$white                      |
| --oruga-notification-close-background-color | \$notification-close-background-color | hsla(0,0%,4%,.2)             |
| --oruga-notification-icon-margin-right      | \$notification-icon-margin-right      | 1rem                         |
| --oruga-notification-notices-padding        | \$notification-notices-padding        | 2em                          |
| --oruga-notification-notices-zindex         | \$notification-notices-zindex         | 1000                         |

</div>

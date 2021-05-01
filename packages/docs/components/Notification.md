---
title: Notification
---

# Notification

> Classic modal overlay to include any content you may need

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/notification/examples/Notification.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-notification closable aria-close-label="Close notification">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
    </o-notification>
    <o-notification closable variant="info" aria-close-label="Close notification">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
    </o-notification>
    <o-notification closable variant="success" aria-close-label="Close notification">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
    </o-notification>
    <o-notification closable variant="warning" aria-close-label="Close notification" role="alert">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
    </o-notification>
    <o-notification closable variant="danger" aria-close-label="Close notification" role="alert">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
    </o-notification>
  </section>
</template>
<script>
  export default {}
</script>
```

:::

### Use icons

::: demo

```html
<template>
  <section>
    <o-notification closable type="info" variant="info" aria-close-label="Close notification">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
    </o-notification>
  </section>
</template>
<script>
  export default {}
</script>
```

:::

### Use buttons

::: demo

```html
<template>
  <section>
    <o-notification aria-close-label="Close notification" v-slot="{closeNotification}">
      <div class="notification-content">
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit</span>
        <o-button label="Cancel" size="small" @click="closeNotification" />
      </div>
    </o-notification>
  </section>
</template>
<script>
  export default {}
</script>
<style>
  .notification-content {
    display: flex;
  }
</style>
```

:::

### Programmatically opening

::: demo

```html
<template>
  <section>
    <div class="buttons">
      <o-button label="Launch notification (default)" size="medium" @click="simple" />
      <o-button label="Launch notification (custom)" variant="success" size="medium" @click="success" />
      <o-button label="Launch notification (custom)" variant="danger" size="medium" @click="danger" />
    </div>
  </section>
</template>

<script>
  export default {
    methods: {
      simple() {
        this.$oruga.notification.open('Something happened')
      },
      success() {
        this.$oruga.notification.open({
          message: 'Something happened correctly!',
          type: 'is-success',
          variant: 'success',
          closable: true
        })
      },
      danger() {
        const notif = this.$oruga.notification.open({
          duration: 5000,
          message: `Something's not good, also I'm on <b>bottom</b>`,
          position: 'bottom-right',
          type: 'danger',
          variant: 'danger',
          closable: true
        })
        notif.$on('close', () => {
          this.$oruga.notification.open('Custom notification closed!')
        })
      }
    }
  }
</script>
```

:::

## Props

| Prop name      | Description                    | Type           | Values                                                                          | Default                                                                                                                                       |
| -------------- | ------------------------------ | -------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| animation      |                                | string         | -                                                                               | 'fade'                                                                                                                                        |
| ariaCloseLabel |                                | string         | -                                                                               |                                                                                                                                               |
| autoClose      |                                | boolean        | -                                                                               | false                                                                                                                                         |
| closable       |                                | boolean        | -                                                                               | false                                                                                                                                         |
| closeIcon      | Icon name                      | string         | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> notification {<br>&nbsp;&nbsp;closeIcon: 'times'<br>}</code> |
| duration       |                                | number         | -                                                                               | 2000                                                                                                                                          |
| hasIcon        |                                | boolean        | -                                                                               |                                                                                                                                               |
| icon           |                                | string         | -                                                                               |                                                                                                                                               |
| iconPack       |                                | string         | -                                                                               |                                                                                                                                               |
| iconSize       |                                | string         | -                                                                               |                                                                                                                                               |
| message        |                                | string         | -                                                                               |                                                                                                                                               |
| override       | Override classes               | boolean        | -                                                                               | false                                                                                                                                         |
| position       |                                | string         | -                                                                               |                                                                                                                                               |
| size           |                                | string         | -                                                                               |                                                                                                                                               |
| title          |                                | string         | -                                                                               |                                                                                                                                               |
| type           |                                | string         | -                                                                               |                                                                                                                                               |
| v-model        |                                | boolean        | -                                                                               | true                                                                                                                                          |
| variant        | Color of the control, optional | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                               |

## Events

| Event name    | Properties | Description |
| ------------- | ---------- | ----------- |
| close         |            |
| update:active |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                                | SASS Variable                         | Default                      |
| ------------------------------------------- | ------------------------------------- | ---------------------------- |
| --oruga-notification-background-color       | \$notification-background-color       | \$primary                    |
| --oruga-notification-border-radius          | \$notification-border-radius          | 4px                          |
| --oruga-notification-padding                | \$notification-padding                | 1.75em 1.75em                |
| --oruga-notification-margin-bottom          | \$notification-margin-bottom          | 1.5rem                       |
| --oruga-notification-color                  | \$notification-color                  | \$white                      |
| --oruga-notification-close-border-radius    | \$notification-close-border-radius    | \$base-rounded-border-radius |
| --oruga-notification-close-right            | \$notification-close-right            | .5rem                        |
| --oruga-notification-close-top              | \$notification-close-top              | .5rem                        |
| --oruga-notification-close-size             | \$notification-close-size             | 20px                         |
| --oruga-notification-close-color            | \$notification-close-color            | \$white                      |
| --oruga-notification-close-background-color | \$notification-close-background-color | hsla(0,0%,4%,.2)             |
| --oruga-notification-icon-margin-right      | \$notification-icon-margin-right      | 1rem                         |

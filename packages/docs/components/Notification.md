---
title: Notification/Toast
---

# Notification/Toast

> Bold notification blocks to alert your users of something

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/notification/examples/Notification.md" class="docgen-edit-link">edit on github</a>

## Examples

### Programmatically opening

Go to [Notification Notice](#notification-notice) section to see all the available options.

::: demo

```html
<template>
  <section>
    <div class="buttons">
      <o-button label="Launch notification (default)" size="medium" @click="simple" />
      <o-button label="Launch notification (custom)" variant="success" size="medium" @click="success" />
      <o-button label="Launch toast" size="medium" @click="toast" />
      <o-button label="Launch notification (custom)" variant="danger" size="medium" @click="danger" />
      <o-button label="Launch notification (component)" variant="warning" size="medium" @click="component" />
    </div>
  </section>
</template>

<script>
  const NotificationForm = {
    props: ['email', 'password'],
    template: `
                <form action="">
                    <div class="modal-card" style="width: auto">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Login</p>
                        </header>
                        <section class="modal-card-body">
                            <o-field label="Email">
                                <o-input
                                    type="email"
                                    :value="email"
                                    placeholder="Your email"
                                    required>
                                </o-input>
                            </o-field>

                            <o-field label="Password">
                                <o-input
                                    type="password"
                                    :value="password"
                                    password-reveal
                                    placeholder="Your password"
                                    required>
                                </o-input>
                            </o-field>

                            <o-field>
                                <o-checkbox>Remember me</o-checkbox>
                            </o-field>
                        </section>
                        <footer class="modal-card-foot">
                            <o-button type="button" @click="$emit('close')">Close</o-button>
                            <o-button variant="primary">Login</o-button>
                        </footer>
                    </div>
                </form>
            `
  }
  export default {
    methods: {
      simple() {
        this.$oruga.notification.open('Something happened')
      },
      success() {
        this.$oruga.notification.open({
          message: 'Something happened correctly!',
          variant: 'success',
          closable: true
        })
      },
      toast() {
        this.$oruga.notification.open({
          message: 'Something happened correctly!',
          rootClass: 'toast-notification',
          position: 'top'
        })
      },
      danger() {
        const notif = this.$oruga.notification.open({
          duration: 5000,
          message: `Something's not good, also I'm on <b>bottom</b>`,
          position: 'bottom-right',
          variant: 'danger',
          closable: true,
          onClose: () => {
            this.$oruga.notification.open('Custom notification closed!')
          }
        })
      },
      component() {
        this.$oruga.notification.open({
          component: NotificationForm,
          position: 'bottom-right',
          variant: 'warning',
          indefinite: true
        })
      }
    }
  }
</script>
<style>
  .toast-notification {
    margin: 0.5em 0;
    text-align: center;
    box-shadow: 0 1px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
    border-radius: 2em;
    padding: 0.75em 1.5em;
    pointer-events: auto;
    color: rgba(0, 0, 0, 0.7);
    background: #ffdd57;
  }
</style>
```

:::

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

### Use types

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

### Add custom buttons

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

<CarbonAds />
## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_notification.scss)

<br />
<template>
  <div>
    <doc-wrapper>
        <template v-slot:default="s">
            <o-notification v-bind="s">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
            </o-notification>
        </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData"></inspector>
  </div>
</template>

<script>
export default {
    data() {
        return {
            inspectData: [
                {
                    class: "rootClass",
                    description: "Class of the root element"
                },
                {
                    class: "closeClass",
                    description: "Class of the close button container",
                    properties: ["closable"],
                    action: (cmp) => {
                        cmp.data.closable = true;
                    },
                },
                {
                    class: "contentClass",
                    description: "Class of the content element"
                },
                {
                    class: "iconClass",
                    description: "Class of the icon on the left",
                    properties: ["type"],
                    action: (cmp) => {
                        cmp.data.type = 'info';
                    },
                },
                {
                    class: "positionClass",
                    description: "Class of the element when positioned",
                    properties: ["position"],
                    suffixes: ['top-right', 'top', 'top-left', 'bottom-right', 'bottom', 'bottom-left'],
                    action: (cmp) => {
                        cmp.data.position = 'top-right';
                    },
                },
                {
                    class: "wrapperClass",
                    description: "Class of the wrapper element"
                },
                {
                    class: "variantClass",
                    description: "Class of the notification variant",
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.variant = 'warning';
                    },
                },
            ],
        };
    },
};
</script>

<br />
<br />

## Props

| Prop name      | Description                                                                                                                                                    | Type           | Values                                                                          | Default                                                                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| active         | Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding                                        | boolean        | -                                                                               | true                                                                                                                                           |
| animation      | Custom animation (transition name).                                                                                                                            | string         | -                                                                               | 'fade'                                                                                                                                         |
| ariaCloseLabel | Label for the close button, to be read by accessibility screenreaders.                                                                                         | string         | -                                                                               |                                                                                                                                                |
| autoClose      | Hide notification after duration only not programmatic.                                                                                                        | boolean        | -                                                                               | false                                                                                                                                          |
| closable       | Adds an 'X' button that closes the notification.                                                                                                               | boolean        | -                                                                               | false                                                                                                                                          |
| closeIcon      | Close icon name                                                                                                                                                | string         | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> notification: {<br>&nbsp;&nbsp;closeIcon: 'times'<br>}</code> |
| component      | Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.\$emit('close') | object\|func   | -                                                                               |                                                                                                                                                |
| duration       | Visibility duration in miliseconds.                                                                                                                            | number         | -                                                                               | 2000                                                                                                                                           |
| events         | Events to be binded to the injected component                                                                                                                  | object         | -                                                                               |                                                                                                                                                |
| hasIcon        | Adds an icon on the left side depending on the type (or the icon prop if defined).                                                                             | boolean        | -                                                                               |                                                                                                                                                |
| icon           | Icon name to use with has-icon.                                                                                                                                | string         | -                                                                               |                                                                                                                                                |
| iconPack       | Icon pack to use.                                                                                                                                              | string         | -                                                                               |                                                                                                                                                |
| iconSize       | Icon size                                                                                                                                                      | string         | -                                                                               | 'large'                                                                                                                                        |
| message        | Message text (can contain HTML).                                                                                                                               | string         | -                                                                               |                                                                                                                                                |
| override       | Override classes                                                                                                                                               | boolean        | -                                                                               | false                                                                                                                                          |
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

# Notification Notice

## Props

| Prop name  | Description                                                                                                                                                         | Type          | Values                                                                  | Default                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------- | ---------------------------------- |
| container  | DOM element the toast will be created on. Note that this also changes the position of the toast from fixed to absolute. Meaning that the container should be fixed. | string        | -                                                                       |                                    |
| duration   | Visibility duration in miliseconds.                                                                                                                                 | number        | -                                                                       |                                    |
| indefinite | Show the Notification indefinitely until it is dismissed when programmatically.                                                                                     | boolean       | -                                                                       | false                              |
| message    | Message text (can contain HTML).                                                                                                                                    | string\|array | -                                                                       |                                    |
| onClose    | Callback function to call after close (programmatically close or user canceled)                                                                                     | func          | -                                                                       | Default function (see source code) |
| override   | Override classes                                                                                                                                                    | boolean       | -                                                                       | false                              |
| position   | Which position the notification will appear when programmatically.                                                                                                  | string        | `top-right`, `top`, `top-left`, `bottom-right`, `bottom`, `bottom-left` | 'top'                              |
| queue      | If should queue with others notices (snackbar/toast/notification).                                                                                                  | boolean       | -                                                                       | undefined                          |
| type       | Type (color) of the notification, optional.                                                                                                                         | string        | -                                                                       |                                    |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| close      |            |

### Slots

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
| --oruga-notification-notices-padding        | \$notification-notices-padding        | 2em                          |
| --oruga-notification-notices-zindex         | \$notification-notices-zindex         | 1000                         |

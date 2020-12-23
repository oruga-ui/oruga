---
title: Dialog
---

# Dialog

> Dialogs inform users about a specific task and may contain critical information or require decisions

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/dialog/examples/Dialog.md" class="docgen-edit-link">edit on github</a>

## Examples

### Programmatically

::: demo

```html
<template>
  <section>
    <div class="buttons">
      <o-button variant="danger">Danger</o-button>

      <o-button iconLeft="user" class="button" size="large" @click="alert">
        Launch alert (default)
      </o-button>
      <o-button class="button is-medium is-primary" @click="alertCustom">
        Launch alert (custom)
      </o-button>
      <o-button variant="danger" @click="alertCustomError">
        Launch alert (custom)
      </o-button>
    </div>
    <div class="buttons">
      <o-button size="small" icon-left="plus">
        Add
      </o-button>

      <o-button icon-left="plus">
        Add
      </o-button>

      <o-button size="medium" icon-left="plus">
        Add
      </o-button>

      <o-button size="large" icon-left="plus">
        Add
      </o-button>
    </div>

    <div class="block">
      <o-icon pack="fas" icon="user" size="large"> </o-icon>
      <span>txqsdfqsdf</span>
    </div>
  </section>
</template>

<script>
  export default {
    methods: {
      alert() {
        this.$oruga.dialog.alert('Everything looks fine!')
      },
      alertCustom() {
        this.$oruga.dialog.alert({
          title: 'Title Alert',
          message: 'I have a title, a custom button and <b>HTML</b>!',
          confirmText: 'Cool!',
          cancelText: 'notCool!',
          canCancel: true
        })
      },
      alertCustomError() {
        this.$oruga.dialog.alert({
          title: 'Error',
          message: "Something's not good but I have a custom <b>icon</b> and <b>type</b>",
          variant: 'danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fas',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      }
    }
  }
</script>
```

:::

## Props

| Prop name          | Description                                                                                                                                                            | Type           | Values                             | Default                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| active             | Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding                                                | boolean        | -                                  |                                                                                                            |
| component          | Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.\$emit('close')         | object\|func   | -                                  |                                                                                                            |
| content            | Text content                                                                                                                                                           | string         | -                                  |                                                                                                            |
| closeButtonContent | Close button text content                                                                                                                                              | string         | -                                  | '✕'                                                                                                        |
| programmatic       |                                                                                                                                                                        | boolean        | -                                  |                                                                                                            |
| props              | Props to be binded to the injected component                                                                                                                           | object         | -                                  |                                                                                                            |
| events             | Events to be binded to the injected component                                                                                                                          | object         | -                                  |                                                                                                            |
| width              | Width of the Modal                                                                                                                                                     | string\|number | -                                  | Config -> <code> 'modal.width': 960</code>                                                                 |
| custom             | Enable custom style on modal content                                                                                                                                   | boolean        | -                                  |                                                                                                            |
| animation          | Custom animation (transition name)                                                                                                                                     | string         | -                                  | Config -> <code> 'modal.animation': 'zoom-out'</code>                                                      |
| canCancel          | Can close Modal by clicking 'X', pressing escape or clicking outside                                                                                                   | array\|boolean | `escape`, `x`, `outside`, `button` | Config -> <code> 'modal.canCancel': ['escape'</code>                                                       |
| onCancel           | Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside)                                                                         | func           | -                                  | () => {}                                                                                                   |
| scroll             | clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts | string         | `keep`, `clip`                     | Config -> <code> 'modal.scroll': 'keep'</code>                                                             |
| fullScreen         | Display modal as full screen                                                                                                                                           | boolean        | -                                  |                                                                                                            |
| trapFocus          | Trap focus inside the modal.                                                                                                                                           | boolean        | -                                  | () => {<br> return config.defaultTrapFocus<br>}                                                            |
| ariaRole           |                                                                                                                                                                        | string         | -                                  |                                                                                                            |
| ariaModal          |                                                                                                                                                                        | boolean        | -                                  |                                                                                                            |
| destroyOnHide      | Destroy modal on hide                                                                                                                                                  | boolean        | -                                  | Config -> <code> 'modal.destroyOnHide': true</code>                                                        |
| autoFocus          | Automatically focus modal when active                                                                                                                                  | boolean        | -                                  | Config -> <code> 'modal.autoFocus': true</code>                                                            |
| closeIcon          | Icon name                                                                                                                                                              | string         | -                                  | Config -> <code> 'close.icon': 'times'</code>                                                              |
| closeIconSize      |                                                                                                                                                                        | string         | -                                  | 'medium'                                                                                                   |
| title              |                                                                                                                                                                        | string         | -                                  |                                                                                                            |
| message            |                                                                                                                                                                        | string\|array  | -                                  |                                                                                                            |
| icon               |                                                                                                                                                                        | string         | -                                  |                                                                                                            |
| iconPack           |                                                                                                                                                                        | string         | -                                  |                                                                                                            |
| hasIcon            |                                                                                                                                                                        | boolean        | -                                  |                                                                                                            |
| variant            |                                                                                                                                                                        | string         | -                                  | 'primary'                                                                                                  |
| size               |                                                                                                                                                                        | string         | -                                  |                                                                                                            |
| confirmText        |                                                                                                                                                                        | string         | -                                  | () => {<br> return config.defaultDialogConfirmText<br> ? config.defaultDialogConfirmText<br> : 'OK'<br>}   |
| cancelText         |                                                                                                                                                                        | string         | -                                  | () => {<br> return config.defaultDialogCancelText<br> ? config.defaultDialogCancelText<br> : 'Cancel'<br>} |
| hasInput           |                                                                                                                                                                        | boolean        | -                                  |                                                                                                            |
| inputAttrs         |                                                                                                                                                                        | object         | -                                  | {}                                                                                                         |
| onConfirm          |                                                                                                                                                                        | func           | -                                  | () => {}                                                                                                   |
| closeOnConfirm     |                                                                                                                                                                        | boolean        | -                                  | true                                                                                                       |
| container          |                                                                                                                                                                        | string         | -                                  | () => {<br> return config.defaultContainerElement<br>}                                                     |
| focusOn            |                                                                                                                                                                        | string         | -                                  | 'confirm'                                                                                                  |

## Class props

| Prop name       | Description | Type   | Values | Default |
| --------------- | ----------- | ------ | ------ | ------- |
| rootClass       |             | string | -      |         |
| backgroundClass |             | string | -      |         |
| contentClass    |             | string | -      |         |
| closeClass      |             | string | -      |         |
| fullScreenClass |             | string | -      |         |

## Events

| Event name    | Type      | Description |
| ------------- | --------- | ----------- |
| close         |           |
| update:active | undefined |
| confirm       | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

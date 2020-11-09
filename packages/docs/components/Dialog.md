---
title: Dialog
---

# Dialog

> Dialogs inform users about a specific task and may contain critical information or require decisions

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/..\oruga\src\components\modal\examples\Dialog.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
```

:::

### Programmatically

::: demo

```html
<template>
    <section>
        <div class="buttons">
            <o-button variant="danger">Danger</o-button>

            <o-button iconLeft="user" class="button"  size="large" @click="alert">
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
            <o-icon pack="fas" icon="user"  size="large" > </o-icon>
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
                canCancel:true

            })
        },
        alertCustomError() {
            this.$oruga.dialog.alert({
                title: 'Error',
                message: 'Something\'s not good but I have a custom <b>icon</b> and <b>type</b>',
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

| Prop name       | Description                                                                                                                                                            | Type           | Values                             | Default                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------- | ----------------------------------------------------- |
| title           | Type (color) of the confirm button (and the icon if hasIcon)                                                                                                           | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                 |
| active          | Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding                                                | boolean        | -                                  |                                                       |
| component       | Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.\$emit('close')         | object\|func   | -                                  |                                                       |
| content         | Text content                                                                                                                                                           | string         | -                                  |                                                       |
| programmatic    |                                                                                                                                                                        | boolean        | -                                  |                                                       |
| props           | Props to be binded to the injected component                                                                                                                           | object         | -                                  |                                                       |
| events          | Events to be binded to the injected component                                                                                                                          | object         | -                                  |                                                       |
| width           | Width of the Modal                                                                                                                                                     | string\|number | -                                  | Config -> <code> 'modal.width': 960</code>            |
| custom          | Enable custom style on modal content                                                                                                                                   | boolean        | -                                  |                                                       |
| animation       | Custom animation (transition name)                                                                                                                                     | string         | -                                  | Config -> <code> 'modal.animation': 'zoom-out'</code> |
| canCancel       | Can close Modal by clicking 'X', pressing escape or clicking outside                                                                                                   | array\|boolean | `escape`, `x`, `outside`, `button` | Config -> <code> 'modal.canCancel': ['escape'</code>  |
| onCancel        | Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside)                                                                         | func           | -                                  | () => {}                                              |
| scroll          | clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts | string         | `keep`, `clip`                     | Config -> <code> 'modal.scroll': 'keep'</code>        |
| fullScreen      | Display modal as full screen                                                                                                                                           | boolean        | -                                  |                                                       |
| trapFocus       | Trap focus inside the modal.                                                                                                                                           | boolean        | -                                  | Config -> <code> 'modal.trapFocus': true</code>       |
| ariaRole        |                                                                                                                                                                        | string         | -                                  |                                                       |
| ariaModal       |                                                                                                                                                                        | boolean        | -                                  |                                                       |
| destroyOnHide   | Destroy modal on hide                                                                                                                                                  | boolean        | -                                  | Config -> <code> 'modal.destroyOnHide': true</code>   |
| rootClass       |                                                                                                                                                                        | string         | -                                  |                                                       |
| backgroundClass |                                                                                                                                                                        | string         | -                                  |                                                       |
| contentClass    |                                                                                                                                                                        | string         | -                                  |                                                       |
| closeClass      |                                                                                                                                                                        | string         | -                                  |                                                       |
| fullScreenClass |                                                                                                                                                                    | string         | -                                  |                                                       |

## Events

| Event name    | Type      | Description |
| ------------- | --------- | ----------- |
| close         |           |
| update:active | undefined |

## Style

| CSS Variable                                      | SASS Variable                               | Default                      |
| ------------------------------------------------- | ------------------------------------------- | ---------------------------- |
| --oruga-dialog-content-background-color            | \$dialog-content-background-color            | \$white                      |
| --oruga-dialog-content-padding                     | \$dialog-content-padding                     | 10px                         |
| --oruga-dialog-content-border-radius               | \$dialog-content-border-radius               | \$base-border-radius         |
| --oruga-dialog-background-background-color         | \$dialog-background-background-color         | hsla(0,0%,4%,.86)            |
| --oruga-dialog-close-border-radius                 | \$dialog-close-border-radius                 | \$base-rounded-border-radius |
| --oruga-dialog-close-height                        | \$dialog-close-height                        | 32px                         |
| --oruga-dialog-close-right                         | \$dialog-close-right                         | 20px                         |
| --oruga-dialog-close-top                           | \$dialog-close-top                           | 20px                         |
| --oruga-dialog-close-width                         | \$dialog-close-width                         | 32px                         |
| --oruga-dialog-content-fullscreen-background-color | \$dialog-content-fullscreen-background-color | #f5f5f5                      |
| --oruga-dialog-content-max-height                  | \$dialog-content-max-height                  | calc(100vh - 160px)          |
| --oruga-dialog-content-margin                      | \$dialog-content-margin                      | 0 auto                       |
| --oruga-dialog-mobile-breakpoint                   | \$dialog-mobile-breakpoint                   | 1024px                       |
| --oruga-dialog-zindex                              | \$dialog-zindex                              | 40                           |

## Examples

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
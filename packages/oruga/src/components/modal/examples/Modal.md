## Examples

### Base

::: demo
```html
<template>
    <section>
        <div class="buttons">
            <o-button size="medium" variant="primary"
                @click="isImageModalActive = true">
                Open modal
            </o-button>
            <o-button size="medium" variant="primary"
                @click="isCardModalActive = true">
                Open modal (clip scroll)
            </o-button>
        </div>

        <o-modal :active.sync="isImageModalActive">
            <p style="text-align: center">
                <img src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4">
            </p>
        </o-modal>

        <o-modal :active.sync="isCardModalActive" :width="640" scroll="clip">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales leo nec convallis rutrum. Vivamus pharetra molestie arcu at dictum. Nulla faucibus leo eget enim egestas, in tempus justo venenatis. Duis dictum suscipit erat, a dapibus eros lobortis ac. Praesent tempor rhoncus convallis. Nullam in ipsum convallis, rutrum elit eget, dictum ipsum. Nunc sagittis aliquet massa. Etiam lacus sapien, eleifend non eros quis, finibus ornare nisl. Ut laoreet sit amet lacus non dignissim. Sed convallis mattis enim, sed interdum risus molestie ut. Praesent vel ex hendrerit, cursus lectus a, blandit felis. Nam luctus orci nec varius commodo.
            </p>
            <p>
                Sed vulputate metus purus, ut egestas erat congue et. Donec tellus orci, malesuada eget dolor sed, pellentesque bibendum nunc. In eu egestas diam. Integer sed congue massa. Sed a urna quam. Morbi vulputate dolor eleifend ligula lobortis venenatis. Aenean pellentesque risus sit amet faucibus molestie. Aliquam eu lorem aliquet, aliquam nulla in, vestibulum lorem. Donec mollis mi at sollicitudin tristique. Nullam id nibh pulvinar, dignissim nisl id, gravida risus. Nulla arcu elit, scelerisque in sollicitudin et, laoreet et metus. Aenean placerat turpis nec tincidunt tempus.
            </p>
        </o-modal>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isImageModalActive: false,
                isCardModalActive: false
            }
        }
    }
</script>
```
:::

### Programmatically

::: demo
```html
<template>
    <section>
        <div class="buttons">
            <o-button size="medium" variant="primary"
                @click="imageModal()">
                Open modal (HTML)
            </o-button>
            <o-button size="medium" variant="primary"
                @click="cardModal()">
                Open modal (Component)
            </o-button>
        </div>
    </section>
</template>

<script>
    const ModalForm = {
        props: ['email', 'password'],
        template: `
            <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Login</p>
                        <o-icon
                            clickable
                            native-type="button"
                            icon="times"
                            @click.native="$emit('close')"/>
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
            imageModal() {
                const h = this.$createElement
                const vnode = h('p', { style: { 'text-align': 'center' }}, [
                    h('img', { attrs: { src: 'https://avatars2.githubusercontent.com/u/66300512?s=200&v=4' }})
                ])
                this.$oruga.modal.open({
                    content: [ vnode ]
                })
            },
            cardModal() {
                this.$oruga.modal.open({
                    parent: this,
                    component: ModalForm,
                    trapFocus: true
                })
            }
        }
    }
</script>

<style>
.modal-card {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 40px);
    overflow: hidden;
}
@media screen and (min-width: 769px) {
    .modal-card {
        margin: 0 auto;
        max-height: calc(100vh - 40px);
        width: 640px;
    }
}
.modal-card {
    margin: 0 20px;
    max-height: calc(100vh - 160px);
    overflow: auto;
    position: relative;
    width: 100%;
}
.modal-card-foot, .modal-card-head {
    align-items: center;
    background-color: #f5f5f5;
    display: flex;
    flex-shrink: 0;
    justify-content: flex-start;
    padding: 20px;
    position: relative;
}
.modal-card-head {
    border-bottom: 1px solid #dbdbdb;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
.modal-card-body {
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    padding: 20px;
}
.modal-card-foot {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 1px solid #dbdbdb;
}
.modal-card-title {
    color: #363636;
    flex-grow: 1;
    flex-shrink: 0;
    font-size: 1.5rem;
    line-height: 1;
    margin: 0;
}
.modal-card-foot .o-button:not(:last-child) {
    margin-right: .5em;
}
</style>
```
:::

## Examples

### Base

::: demo
```html
<template>
    <section>
        <div class="buttons">
            <o-button size="medium" variant="primary"
                @click="isImageModalActive = true">
                Launch image modal
            </o-button>
            <o-button size="medium" variant="primary"
                @click="isCardModalActive = true">
                Launch card modal (keep scroll)
            </o-button>
        </div>

        <o-modal :active.sync="isImageModalActive">
            <p class="image is-4by3">
                <img src="/static/img/placeholder-1280x960.png">
            </p>
        </o-modal>

        <o-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="/static/img/placeholder-1280x960.png" alt="Image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img src="/static/img/placeholder-1280x960.png" alt="Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">John Smith</p>
                            <p class="subtitle is-6">@johnsmith</p>
                        </div>
                    </div>

                    <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                        <a>#css</a> <a>#responsive</a>
                        <br>
                        <small>11:09 PM - 1 Jan 2016</small>
                    </div>
                </div>
            </div>
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
                Launch image modal (HTML)
            </o-button>
            <o-button size="medium" variant="primary"
                @click="cardModal()">
                Launch card modal (Component)
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
                        <button
                            type="button"
                            class="delete"
                            @click="$emit('close')"/>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Email">
                            <b-input
                                type="email"
                                :value="email"
                                placeholder="Your email"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                :value="password"
                                password-reveal
                                placeholder="Your password"
                                required>
                            </b-input>
                        </b-field>

                        <b-checkbox>Remember me</b-checkbox>
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
                const vnode = h('p', { class: "image is-4by3" }, [
                    h('img', { attrs: { src: 'https://buefy.org/static/img/placeholder-1280x960.png' }})
                ])
                this.$oruga.modal.open({
                    content: [ vnode ]
                })
            },
            cardModal() {
                this.$oruga.modal.open({
                    parent: this,
                    component: ModalForm,
                    hasModalCard: true,
                    trapFocus: true
                })
            }
        }
    }
</script>
```
:::

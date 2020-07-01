---
title: Modal
---

# Modal

> Classic modal overlay to include any content you may need

---

## Examples

### Base

::: demo

```html
<template>
  <section>
    <div class="buttons">
      <o-button
        size="medium"
        variant="primary"
        @click="isImageModalActive = true"
      >
        Launch image modal
      </o-button>
      <o-button
        size="medium"
        variant="primary"
        @click="isCardModalActive = true"
      >
        Launch card modal (keep scroll)
      </o-button>
    </div>

    <o-modal :active.sync="isImageModalActive">
      <p class="image is-4by3">
        <img src="/static/img/placeholder-1280x960.png" />
      </p>
    </o-modal>

    <o-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/static/img/placeholder-1280x960.png" alt="Image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/static/img/placeholder-1280x960.png" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">John Smith</p>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
          </div>

          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris. <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
            <br />
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
      };
    }
  };
</script>
```

:::

### Programmatically

::: demo

```html
<template>
  <section>
    <div class="buttons">
      <o-button size="medium" variant="primary" @click="imageModal()">
        Launch image modal (HTML)
      </o-button>
      <o-button size="medium" variant="primary" @click="cardModal()">
        Launch card modal (Component)
      </o-button>
    </div>
  </section>
</template>

<script>
  const ModalForm = {
    props: ["email", "password"],
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
  };

  export default {
    methods: {
      imageModal() {
        const h = this.$createElement;
        const vnode = h("p", { class: "image is-4by3" }, [
          h("img", {
            attrs: {
              src: "https://buefy.org/static/img/placeholder-1280x960.png"
            }
          })
        ]);
        this.$oruga.modal.open({
          content: [vnode]
        });
      },
      cardModal() {
        this.$oruga.modal.open({
          parent: this,
          component: ModalForm,
          hasModalCard: true,
          trapFocus: true
        });
      }
    }
  };
</script>
```

:::

## Props

| Prop name       | Description | Type           | Values | Default                                                                                                                                                                                                               |
| --------------- | ----------- | -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active          |             | boolean        | -      |                                                                                                                                                                                                                       |
| component       |             | object\|func   | -      |                                                                                                                                                                                                                       |
| content         |             | string         | -      |                                                                                                                                                                                                                       |
| programmatic    |             | boolean        | -      |                                                                                                                                                                                                                       |
| props           |             | object         | -      |                                                                                                                                                                                                                       |
| events          |             | object         | -      |                                                                                                                                                                                                                       |
| width           |             | string\|number | -      | 960                                                                                                                                                                                                                   |
| custom          |             | boolean        | -      |                                                                                                                                                                                                                       |
| animation       |             | string         | -      | 'zoom-out'                                                                                                                                                                                                            |
| canCancel       |             | array\|boolean | -      | () => {<br> getValueByPath(config, 'modal.canCancel', ['escape', 'x', 'outside', 'button'])<br>}                                                                                                                      |
| onCancel        |             | func           | -      | () => {}                                                                                                                                                                                                              |
| scroll          |             | string         | -      | () => {<br> return getValueByPath(config, 'modal.scroll', 'keep')<br>}                                                                                                                                                |
| fullScreen      |             | boolean        | -      |                                                                                                                                                                                                                       |
| trapFocus       |             | boolean        | -      | () => {<br> return getValueByPath(config, 'modal.trapFocus', true)<br>}                                                                                                                                               |
| ariaRole        |             | string         | -      |                                                                                                                                                                                                                       |
| ariaModal       |             | boolean        | -      |                                                                                                                                                                                                                       |
| destroyOnHide   |             | boolean        | -      | true                                                                                                                                                                                                                  |
| rootClass       |             | string         | -      | () => {<br> const override = getValueByPath(config, 'modal.override', false)<br> const clazz = getValueByPath(config, 'modal.rootClass', '')<br> return getCssClass(clazz, override, 'o-modal')<br>}                  |
| backgroundClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'modal.override', false)<br> const clazz = getValueByPath(config, 'modal.backgroundClas', '')<br> return getCssClass(clazz, override, 'o-modal-background')<br>}  |
| contentClass    |             | string         | -      | () => {<br> const override = getValueByPath(config, 'modal.override', false)<br> const clazz = getValueByPath(config, 'modal.contentClass', '')<br> return getCssClass(clazz, override, 'o-modal-content')<br>}       |
| closeClass      |             | string         | -      | () => {<br> const override = getValueByPath(config, 'modal.override', false)<br> const clazz = getValueByPath(config, 'modal.closeClass', '')<br> return getCssClass(clazz, override, 'o-modal-close')<br>}           |
| fullScreenClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'modal.override', false)<br> const clazz = getValueByPath(config, 'modal.fullScreenClass', '')<br> return getCssClass(clazz, override, 'o-modal-fullscreen')<br>} |

## Events

| Event name    | Type      | Description |
| ------------- | --------- | ----------- |
| close         |           |
| update:active | undefined |

## Style

| CSS Variable                                      | SASS Variable                               | Default                      |
| ------------------------------------------------- | ------------------------------------------- | ---------------------------- |
| --oruga-modal-background-color                    | \$modal-background-color                    | hsla(0,0%,4%,.86)            |
| --oruga-modal-close-border-radius                 | \$modal-close-border-radius                 | \$base-rounded-border-radius |
| --oruga-modal-close-height                        | \$modal-close-height                        | 32px                         |
| --oruga-modal-close-right                         | \$modal-close-right                         | 20px                         |
| --oruga-modal-close-top                           | \$modal-close-top                           | 20px                         |
| --oruga-modal-close-width                         | \$modal-close-width                         | 32px                         |
| --oruga-modal-content-fullscreen-background-color | \$modal-content-fullscreen-background-color | #f5f5f5                      |
| --oruga-modal-mobile-breakpoint                   | \$modal-mobile-breakpoint                   | 1024px                       |
| --oruga-modal-zindex                              | \$modal-zindex                              | 40                           |

---
title: Modal
---

# Modal

> Classic modal overlay to include any content you may need

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/modal/examples/Modal.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <div class="buttons">
      <o-button size="medium" variant="primary" @click="isImageModalActive = true">
        Open modal
      </o-button>
      <o-button size="medium" variant="primary" @click="isCardModalActive = true">
        Open modal (clip scroll)
      </o-button>
    </div>

    <o-modal :active.sync="isImageModalActive">
      <p style="text-align: center">
        <img src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
      </p>
    </o-modal>

    <o-modal :active.sync="isCardModalActive" :width="640" scroll="clip">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales leo nec convallis rutrum. Vivamus pharetra molestie arcu at dictum. Nulla faucibus leo eget enim
        egestas, in tempus justo venenatis. Duis dictum suscipit erat, a dapibus eros lobortis ac. Praesent tempor rhoncus convallis. Nullam in ipsum convallis, rutrum elit eget,
        dictum ipsum. Nunc sagittis aliquet massa. Etiam lacus sapien, eleifend non eros quis, finibus ornare nisl. Ut laoreet sit amet lacus non dignissim. Sed convallis mattis
        enim, sed interdum risus molestie ut. Praesent vel ex hendrerit, cursus lectus a, blandit felis. Nam luctus orci nec varius commodo.
      </p>
      <p>
        Sed vulputate metus purus, ut egestas erat congue et. Donec tellus orci, malesuada eget dolor sed, pellentesque bibendum nunc. In eu egestas diam. Integer sed congue massa.
        Sed a urna quam. Morbi vulputate dolor eleifend ligula lobortis venenatis. Aenean pellentesque risus sit amet faucibus molestie. Aliquam eu lorem aliquet, aliquam nulla in,
        vestibulum lorem. Donec mollis mi at sollicitudin tristique. Nullam id nibh pulvinar, dignissim nisl id, gravida risus. Nulla arcu elit, scelerisque in sollicitudin et,
        laoreet et metus. Aenean placerat turpis nec tincidunt tempus.
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
      <o-button size="medium" variant="primary" @click="imageModal()">
        Open modal (HTML)
      </o-button>
      <o-button size="medium" variant="primary" @click="cardModal()">
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
        const vnode = h('p', { style: { 'text-align': 'center' } }, [h('img', { attrs: { src: 'https://avatars2.githubusercontent.com/u/66300512?s=200&v=4' } })])
        this.$oruga.modal.open({
          content: [vnode]
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
  .modal-card-foot,
  .modal-card-head {
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
    margin-right: 0.5em;
  }
</style>
```

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_modal.scss)

<br />
<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-modal v-bind="s" :active.sync="isImageModalActive">
                    <p style="text-align: center">
                        <img src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
                    </p>
                </o-modal>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isImageModalActive: false,
            inspectData: [
                {
                    class: "rootClass",
                    description: "Class of the root element",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "mobileClass",
                    description: "Class of modal component when on mobile",
                    warning: "Switch to mobile view to see it in action!",
                },
                {
                    class: "overlayClass",
                    description: "Class of the modal overlay",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "contentClass",
                    description: "Class of the modal content",
                    specificity: "when <b>mobileClass</b> is applied",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "closeClass",
                    description: "Class of the close button",
                    action: () => {
                        this.isImageModalActive = true;
                    }
                },
                {
                    class: "fullScreenClass",
                    description: "Class of the modal when fullscreen",
                    properties: ['fullScreen'],
                    action: (cmp) => {
                        this.isImageModalActive = true;
                        cmp.data.fullScreen = true;
                    }
                }
            ],
        };
    },
};
</script>

<br />
<br />

## Props

| Prop name        | Description                                                                                                                                                            | Type           | Values                             | Default                                                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active           | Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding                                                | boolean        | -                                  |                                                                                                                                                                      |
| animation        | Custom animation (transition name)                                                                                                                                     | string         | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;animation: 'zoom-out'<br>}</code>                           |
| ariaLabel        |                                                                                                                                                                        | string         | -                                  |                                                                                                                                                                      |
| ariaModal        |                                                                                                                                                                        | boolean        | -                                  |                                                                                                                                                                      |
| ariaRole         |                                                                                                                                                                        | string         | -                                  |                                                                                                                                                                      |
| autoFocus        | Automatically focus modal when active                                                                                                                                  | boolean        | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;autoFocus: true<br>}</code>                                 |
| canCancel        | Can close Modal by clicking 'X', pressing escape or clicking outside                                                                                                   | array\|boolean | `escape`, `x`, `outside`, `button` | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;canCancel: ['escape', 'x', 'outside', 'button']<br>}</code> |
| closeIcon        | Icon name                                                                                                                                                              | string         | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;closeIcon: 'times'<br>}</code>                              |
| closeIconSize    |                                                                                                                                                                        | string         | -                                  | 'medium'                                                                                                                                                             |
| component        | Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.\$emit('close')         | object\|func   | -                                  |                                                                                                                                                                      |
| content          | Text content                                                                                                                                                           | string         | -                                  |                                                                                                                                                                      |
| custom           | Enable custom style on modal content                                                                                                                                   | boolean        | -                                  |                                                                                                                                                                      |
| destroyOnHide    | Destroy modal on hide                                                                                                                                                  | boolean        | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;destroyOnHide: true<br>}</code>                             |
| events           | Events to be binded to the injected component                                                                                                                          | object         | -                                  |                                                                                                                                                                      |
| fullScreen       | Display modal as full screen                                                                                                                                           | boolean        | -                                  |                                                                                                                                                                      |
| mobileBreakpoint | Mobile breakpoint as max-width value                                                                                                                                   | string         | -                                  |                                                                                                                                                                      |
| onCancel         | Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside)                                                                         | func           | -                                  | Default function (see source code)                                                                                                                                   |
| onClose          | Callback function to call after close (programmatically close or user canceled)                                                                                        | func           | -                                  | Default function (see source code)                                                                                                                                   |
| override         | Override classes                                                                                                                                                       | boolean        | -                                  | false                                                                                                                                                                |
| programmatic     |                                                                                                                                                                        | boolean        | -                                  |                                                                                                                                                                      |
| props            | Props to be binded to the injected component                                                                                                                           | object         | -                                  |                                                                                                                                                                      |
| scroll           | clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts | string         | `keep`, `clip`                     | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;scroll: 'keep'<br>}</code>                                  |
| trapFocus        | Trap focus inside the modal.                                                                                                                                           | boolean        | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                                 |
| width            | Width of the Modal                                                                                                                                                     | string\|number | -                                  | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> modal: {<br>&nbsp;&nbsp;width: 960<br>}</code>                                      |

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

| CSS Variable                                      | SASS Variable                               | Default                      |
| ------------------------------------------------- | ------------------------------------------- | ---------------------------- |
| --oruga-modal-content-background-color            | \$modal-content-background-color            | \$white                      |
| --oruga-modal-content-padding                     | \$modal-content-padding                     | 10px                         |
| --oruga-modal-content-border-radius               | \$modal-content-border-radius               | \$base-border-radius         |
| --oruga-modal-overlay-background-color            | \$modal-overlay-background-color            | hsla(0,0%,4%,.86)            |
| --oruga-modal-close-border-radius                 | \$modal-close-border-radius                 | \$base-rounded-border-radius |
| --oruga-modal-close-right                         | \$modal-close-right                         | 20px                         |
| --oruga-modal-close-top                           | \$modal-close-top                           | 20px                         |
| --oruga-modal-close-size                          | \$modal-close-size                          | 32px                         |
| --oruga-modal-close-color                         | \$modal-close-color                         | \$white                      |
| --oruga-modal-content-fullscreen-background-color | \$modal-content-fullscreen-background-color | #f5f5f5                      |
| --oruga-modal-content-max-height                  | \$modal-content-max-height                  | calc(100vh - 160px)          |
| --oruga-modal-content-margin                      | \$modal-content-margin                      | 0 auto                       |
| --oruga-modal-zindex                              | \$modal-zindex                              | 40                           |

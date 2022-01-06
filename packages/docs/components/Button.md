---
title: Button
---

# Button

> The classic button, in different colors, sizes, and states

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/button/examples/Button.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-button @click="clickMe">Click Me</o-button>
  </section>
</template>

<script>
  export default {
    methods: {
      clickMe() {
        alert('Clicked!')
      }
    }
  }
</script>
```

:::

### States and Styles

::: demo

```html
<template>
  <section>
    <div class="buttons">
      <o-button variant="primary">Primary</o-button>
      <o-button variant="success">Success</o-button>
      <o-button variant="danger">Danger</o-button>
      <o-button variant="warning">Warning</o-button>
      <o-button variant="info">Info</o-button>
    </div>

    <div class="buttons">
      <o-button>Normal</o-button>
      <o-button disabled>Disabled</o-button>
      <o-button rounded>Rounded</o-button>
    </div>

    <div class="buttons">
      <o-button variant="primary" outlined>Outlined</o-button>
      <o-button variant="primary" inverted>Inverted</o-button>
    </div>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Icons

::: demo

```html
<template>
  <section>
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

    <br />

    <div class="buttons">
      <o-button variant="danger" icon-left="trash">
        Delete
      </o-button>

      <o-button variant="danger" icon-right="trash">
        Delete
      </o-button>

      <o-button variant="danger" icon-right="trash" />
    </div>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Tags

::: demo

```html
<template>
  <section>
    <div class="buttons">
      <o-button>Button</o-button>

      <o-button tag="a" href="https://oruga.io" target="_blank">
        Anchor
      </o-button>

      <o-button tag="input" native-type="submit" value="Submit input" />

      <!-- Need vue-router -->
      <!-- 
            <o-button tag="router-link"
                to="/home"
                variant="info">
                Docs
            </o-button>
            -->
    </div>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_button.scss)

<br />
<template>
  <div>
    <doc-wrapper>
      <template v-slot:default="s">
      <o-button v-bind="s">Button</o-button>
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
                    description: "Class of the root element",
                },
                {
                    class: "outlinedClass",
                    description: "Class of the button outlined",
                    properties: ["outlined"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.variant = 'primary';
                        cmp.data.outlined = true;
                    },
                },
                {
                    class: "invertedClass",
                    description: "Class of the button when inverted",
                    properties: ["inverted"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.variant = 'primary';
                        cmp.data.inverted = true;
                    },
                },
                {
                    class: "expandedClass",
                    description: "Class of the button when expanded",
                    properties: ["expanded"],
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    },
                },
                {
                    class: "elementsWrapperClass",
                    description: "Class of the button elements wrapper",
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    },
                },
                {
                    class: "roundedClass",
                    description: "Class of the button when rounded",
                    properties: ["rounded"],
                    action: (cmp) => {
                        cmp.data.rounded = true;
                    },
                },
                {
                    class: "disabledClass",
                    description: "Class of the button when disabled",
                    properties: ["disabled"],
                    action: (cmp) => {
                        cmp.data.disabled = true;
                    },
                },
                {
                    class: "labelClass",
                    description: "Class of the button label"
                },
                {
                    class: "iconClass",
                    description: "Class of the button icon",
                    properties: ["iconLeft", "iconRight"],
                    action: (cmp) => {
                        cmp.data['icon-left'] = "plus"
                    },
                },
                {
                    class: "iconLeftClass",
                    description: "Class of the button icon on the left",
                    properties: ["iconLeft"],
                    action: (cmp) => {
                        cmp.data['icon-left'] = "plus"
                    },
                },
                {
                    class: "iconRightClass",
                    description: "Class of the button icon on the right",
                    properties: ["iconRight"],
                    action: (cmp) => {
                        cmp.data['icon-right'] = "plus"
                    },
                },
                {
                    class: "sizeClass",
                    description: "Class of the button size",
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'large';
                    },
                },
                {
                    class: "variantClass",
                    description: "Class of the button variant",
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.variant = 'warning';
                    },
                },
            ],
        };
    }
}
</script>

<br />
<br />

## Props

| Prop name  | Description                              | Type    | Values                                                                          | Default                                                                                                                              |
| ---------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| disabled   | Button will be disabled                  | boolean | -                                                                               |                                                                                                                                      |
| expanded   | Button will be expanded (full-width)     | boolean | -                                                                               |                                                                                                                                      |
| iconBoth   |                                          | boolean | -                                                                               |                                                                                                                                      |
| iconLeft   | Icon name to show on the left            | string  | -                                                                               |                                                                                                                                      |
| iconPack   | Icon pack to use                         | string  | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                                                                                                      |
| iconRight  | Icon name to show on the right           | string  | -                                                                               |                                                                                                                                      |
| inverted   |                                          | boolean | -                                                                               |                                                                                                                                      |
| label      | Button label, optional when default slot | string  | -                                                                               |                                                                                                                                      |
| nativeType | Button type, like native                 | string  | -                                                                               | 'button'                                                                                                                             |
| outlined   | Outlined style                           | boolean | -                                                                               |                                                                                                                                      |
| override   | Override classes                         | boolean | -                                                                               | false                                                                                                                                |
| rounded    | Rounded style                            | boolean | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> button: {<br>&nbsp;&nbsp;rounded: false<br>}</code> |
| size       | Size of button, optional                 | string  | `small`, `medium`, `large`                                                      |                                                                                                                                      |
| tag        | Button tag name                          | string  | `button`, `a`, `input`, `router-link`, `nuxt-link (or other nuxt alias)`        | 'button'                                                                                                                             |
| variant    | Color of the control, optional           | string  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                      |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                         | SASS Variable                  | Default                             |
| ------------------------------------ | ------------------------------ | ----------------------------------- |
| --oruga-button-background-color      | \$button-background-color      | \$primary                           |
| --oruga-button-color                 | \$button-color                 | \$primary-invert                    |
| --oruga-button-border-radius         | \$button-border-radius         | \$base-border-radius                |
| --oruga-button-border                | \$button-border                | 1px solid \$button-background-color |
| --oruga-button-box-shadow            | \$button-box-shadow            | none                                |
| --oruga-button-font-weight           | \$button-font-weight           | 400                                 |
| --oruga-button-line-height           | \$button-line-height           | \$base-line-height                  |
| --oruga-button-margin-icon-to-text   | \$button-margin-icon-to-text   | .1875em                             |
| --oruga-button-margin                | \$button-margin                | 0                                   |
| --oruga-button-height                | \$button-height                | \$control-height                    |
| --oruga-button-padding               | \$button-padding               | \$control-padding-vertical .75em    |
| --oruga-button-rounded-border-radius | \$button-rounded-border-radius | \$base-rounded-border-radius        |
| --oruga-button-disabled-opacity      | \$button-disabled-opacity      | \$base-disabled-opacity             |

---
title: Button
---

# Button

> The classic button, in different colors, sizes, and states

---

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
        alert("Clicked!");
      }
    }
  };
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
  export default {};
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
  export default {};
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
  export default {};
</script>
```

:::

## Props

| Prop name     | Description | Type           | Values | Default                                                                                                                                                                                                              |
| ------------- | ----------- | -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variant       |             | string\|object | -      |                                                                                                                                                                                                                      |
| size          |             | string         | -      |                                                                                                                                                                                                                      |
| label         |             | string         | -      |                                                                                                                                                                                                                      |
| iconPack      |             | string         | -      |                                                                                                                                                                                                                      |
| iconLeft      |             | string         | -      |                                                                                                                                                                                                                      |
| iconRight     |             | string         | -      |                                                                                                                                                                                                                      |
| rounded       |             | boolean        | -      | () => getValueByPath(config, 'button.rounded', false)                                                                                                                                                                |
| outlined      |             | boolean        | -      |                                                                                                                                                                                                                      |
| expanded      |             | boolean        | -      |                                                                                                                                                                                                                      |
| inverted      |             | boolean        | -      |                                                                                                                                                                                                                      |
| nativeType    |             | string         | -      | 'button'                                                                                                                                                                                                             |
| tag           |             | string         | -      | 'button'                                                                                                                                                                                                             |
| disabled      |             | boolean        | -      |                                                                                                                                                                                                                      |
| rootClass     |             | string         | -      | () => {<br> const override = getValueByPath(config, 'button.override', false)<br> const clazz = getValueByPath(config, 'button.rootClass', '')<br> return getCssClass(clazz, override, 'o-button')<br>}              |
| outlinedClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'button.override', false)<br> const clazz = getValueByPath(config, 'button.outlinedClass', '')<br> return getCssClass(clazz, override, 'o-button-outlined')<br>} |
| invertedClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'button.override', false)<br> const clazz = getValueByPath(config, 'button.invertedClass', '')<br> return getCssClass(clazz, override, 'o-button-inverted')<br>} |
| expandedClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'button.override', false)<br> const clazz = getValueByPath(config, 'button.expandedClass', '')<br> return getCssClass(clazz, override, 'o-button-expanded')<br>} |
| roundedClass  |             | string         | -      | () => {<br> const override = getValueByPath(config, 'button.override', false)<br> const clazz = getValueByPath(config, 'button.roundedClass', '')<br> return getCssClass(clazz, override, 'o-button-rounded')<br>}   |
| disabledClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'button.override', false)<br> const clazz = getValueByPath(config, 'button.disabledClass', '')<br> return getCssClass(clazz, override, 'o-button-disabled')<br>} |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                         | SASS Variable                  | Default                      |
| ------------------------------------ | ------------------------------ | ---------------------------- |
| --oruga-button-background-color      | \$button-background-color      | #ffffff                      |
| --oruga-button-border-radius         | \$button-border-radius         | \$base-border-radius         |
| --oruga-button-border                | \$button-border                | 1px solid #000000            |
| --oruga-button-box-shadow            | \$button-box-shadow            | none                         |
| --oruga-button-color                 | \$button-color                 | #000000                      |
| --oruga-button-font-size             | \$button-font-size             | \$base-font-size             |
| --oruga-button-line-height           | \$button-line-height           | \$base-line-height           |
| --oruga-button-margin-border-to-icon | \$button-margin-border-to-icon | calc(-.375em - 1px)          |
| --oruga-button-margin-icon-to-text   | \$button-margin-icon-to-text   | .1875em                      |
| --oruga-button-margin                | \$button-margin                | 0                            |
| --oruga-button-height                | \$button-height                | \$control-height             |
| --oruga-button-padding               | \$button-padding               | calc(.375em - 1px) .75em     |
| --oruga-button-rounded-border-radius | \$button-rounded-border-radius | \$base-rounded-border-radius |
| --oruga-button-disabled-opacity      | \$button-disabled-opacity      | \$base-disabled-opacity      |

---
title: Checkbox
---

# Checkbox

> Select a single or grouped options

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/..\oruga\src\components\checkbox\examples\Checkbox.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <div class="field">
      <o-checkbox>Basic</o-checkbox>
    </div>
    <div class="field">
      <o-checkbox v-model="checkbox">
        {{ checkbox }}
      </o-checkbox>
    </div>
    <div class="field">
      <o-checkbox v-model="checkboxCustom" true-value="Yes" false-value="No">
        {{ checkboxCustom }}
      </o-checkbox>
    </div>
    <div class="field">
      <o-checkbox :indeterminate="true">
        Indeterminate
      </o-checkbox>
    </div>
    <div class="field">
      <o-checkbox disabled>Disabled</o-checkbox>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        checkbox: false,
        checkboxCustom: 'Yes'
      }
    }
  }
</script>
```

:::

### Variants

::: demo

```html
<template>
  <section>
    <div class="field">
      <o-checkbox :value="true">
        Default
      </o-checkbox>
    </div>
    <div class="field">
      <o-checkbox :value="true" variant="info">
        Info
      </o-checkbox>
    </div>
    <div class="field">
      <o-checkbox :value="true" variant="success">
        Success
      </o-checkbox>
    </div>
    <div class="field">
      <o-checkbox :value="true" variant="danger">
        Danger
      </o-checkbox>
    </div>
    <div class="field">
      <o-checkbox :value="true" variant="warning">
        Warning
      </o-checkbox>
    </div>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Array

::: demo

```html
<template>
  <section>
    <div class="block">
      <o-checkbox v-model="checkboxGroup" native-value="Silver">
        Silver
      </o-checkbox>
      <o-checkbox v-model="checkboxGroup" native-value="Flint">
        Flint
      </o-checkbox>
      <o-checkbox v-model="checkboxGroup" native-value="Vane">
        Vane
      </o-checkbox>
      <o-checkbox v-model="checkboxGroup" native-value="Billy" disabled>
        Billy
      </o-checkbox>
    </div>
    <p class="content">
      <b>Selection:</b>
      {{ checkboxGroup }}
    </p>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        checkboxGroup: ['Flint']
      }
    }
  }
</script>
```

:::

## Props

| Prop name     | Description                                        | Type                    | Values                                                                          | Default |
| ------------- | -------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------- | ------- |
| nativeValue   | Same as native value                               | string\|number\|boolean | -                                                                               |         |
| variant       | Color of the control, optional                     | string                  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |
| disabled      | Same as native disabled                            | boolean                 | -                                                                               |         |
| required      |                                                    | boolean                 | -                                                                               |         |
| name          | Same as native name                                | string                  | -                                                                               |         |
| size          | Size of the control, optional                      | string                  | `small`, `medium`, `large`                                                      |         |
| indeterminate | Same as native indeterminate                       | boolean                 | -                                                                               |         |
| trueValue     | Overrides the returned value when it's checked     | string\|number\|boolean | -                                                                               | true    |
| falseValue    | Overrides the returned value when it's not checked | string\|number\|boolean | -                                                                               | false   |
| rootClass     |                                                    | string                  | -                                                                               |         |
| disabledClass |                                                    | string                  | -                                                                               |         |
| checkClass    |                                                    | string                  | -                                                                               |         |
| labelClass    |                                                    | string                  | -                                                                               |         |
| sizeClass     |                                                    | string                  | -                                                                               |         |
| variantClass  |                                                    | string                  | -                                                                               |         |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                                | SASS Variable                         | Default                                                                                |
| ------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------- |
| --oruga-checkbox-active-background-color    | \$checkbox-active-background-color    | \$primary                                                                              |
| --oruga-checkbox-background-color           | \$checkbox-background-color           | transparent                                                                            |
| --oruga-checkbox-border-color               | \$checkbox-border-color               | \$grey                                                                                 |
| --oruga-checkbox-border-radius              | \$checkbox-border-radius              | \$base-border-radius                                                                   |
| --oruga-checkbox-border-width               | \$checkbox-border-width               | 2px                                                                                    |
| --oruga-checkbox-checked-box-shadow-color   | \$checkbox-checked-box-shadow-color   | \$checkbox-active-background-color                                                     |
| --oruga-checkbox-checked-box-shadow-length  | \$checkbox-checked-box-shadow-length  | 0 0 0.5em                                                                              |
| --oruga-checkbox-checked-box-shadow-opacity | \$checkbox-checked-box-shadow-opacity | 0.8                                                                                    |
| --oruga-checkbox-checkmark-color            | \$checkbox-checkmark-color            | \$primary-invert                                                                       |
| --oruga-checkbox-disabled-opacity           | \$checkbox-disabled-opacity           | \$base-disabled-opacity                                                                |
| --oruga-checkbox-focus-sibiling-box-shadow  | \$checkbox-focus-sibiling-box-shadow  | $checkbox-checked-box-shadow-length rgba($grey, \$checkbox-checked-box-shadow-opacity) |
| --oruga-checkbox-label-padding              | \$checkbox-label-padding              | 0 0 0 .5em                                                                             |
| --oruga-checkbox-margin-sibiling            | \$checkbox-margin-sibiling            | 0.5em                                                                                  |
| --oruga-checkbox-size                       | \$checkbox-size                       | 1.25em                                                                                 |
| --oruga-checkbox-line-height                | \$checkbox-line-height                | 1.25                                                                                   |

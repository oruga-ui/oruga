---
title: Checkbox
---

# Checkbox

> Select a single or grouped options

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/checkbox/examples/Checkbox.md" class="docgen-edit-link">edit on github</a>

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

## Class props

<br />
<template>
  <div class="field">
    <doc-wrapper>
      <template v-slot:default="s">
        <o-checkbox v-model="s.checkbox" v-bind="s">Checkbox</o-checkbox>
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
          class: 'rootClass',
          description : 'Class of the root element'
        },
        {
          class: 'labelClass',
          description : 'Class of the label'
        },
        {
          class: 'checkClass',
          description : 'Class of the checkbox'
        },
        {
          class: 'checkCheckedClass',
          description : '',
          action: (cmp) => {
            cmp.data.checkbox = true;
          }
        },
        {
          class: 'checkIndeterminateClass',
          description : 'Class when checkbox is indeterminate',
          properties: ["indeterminate"],
          action: (cmp) => {
            cmp.data.indeterminate = true;
          }
        },
        {
          class: 'sizeClass',
          description : 'Class of the checkbox size',
          properties: ["size"],
          suffixes: ['small', 'medium', 'large'],
          action: (cmp) => {
            cmp.data.size = 'large';
          }
        },
        {
          class: 'disabledClass',
          description : 'Class when checkbox is disabled',
          properties: ["disabled"],
          action: (cmp) => {
            cmp.data.disabled = true;
          }
        },
        {
          class: 'variantClass',
          description : 'Class of the checkbox variant',
          properties: ["variant"],
          suffixes: ['primary', 'info', 'warning', 'danger'],
          action: (cmp) => {
            cmp.data.variant = 'warning';
          }
        }
      ]
    }
  }
}
</script>

<br />
<br />

## Props

| Prop name     | Description                                        | Type                           | Values                                                                          | Default |
| ------------- | -------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------- | ------- |
| disabled      | Same as native disabled                            | boolean                        | -                                                                               |         |
| falseValue    | Overrides the returned value when it's not checked | string\|number\|boolean        | -                                                                               | false   |
| indeterminate | Same as native indeterminate                       | boolean                        | -                                                                               |         |
| name          | Same as native name                                | string                         | -                                                                               |         |
| nativeValue   | Same as native value                               | string\|number\|boolean\|array | -                                                                               |         |
| required      |                                                    | boolean                        | -                                                                               |         |
| size          | Size of the control, optional                      | string                         | `small`, `medium`, `large`                                                      |         |
| trueValue     | Overrides the returned value when it's checked     | string\|number\|boolean        | -                                                                               | true    |
| v-model       |                                                    | string\|number\|boolean\|array | -                                                                               |         |
| variant       | Color of the control, optional                     | string                         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| input      | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                                | SASS Variable                         | Default                                                                                |
| ------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------- |
| --oruga-checkbox-active-background-color    | \$checkbox-active-background-color    | \$primary                                                                              |
| --oruga-checkbox-background-color           | \$checkbox-background-color           | \$primary                                                                              |
| --oruga-checkbox-border-color               | \$checkbox-border-color               | \$primary                                                                              |
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
| --oruga-checkbox-size                       | \$checkbox-size                       | 1.5em                                                                                  |
| --oruga-checkbox-line-height                | \$checkbox-line-height                | 1.5                                                                                    |

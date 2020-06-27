---
title: Switch
---

# Switch

> Switch between two opposing states

---

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-field>
      <o-switch>Default</o-switch>
    </o-field>
    <o-field>
      <o-switch v-model="isSwitched">
        {{ isSwitched }}
      </o-switch>
    </o-field>
    <o-field>
      <o-switch v-model="isSwitchedCustom" true-value="Yes" false-value="No">
        {{ isSwitchedCustom }}
      </o-switch>
    </o-field>
    <o-field>
      <o-switch disabled>Disabled</o-switch>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        isSwitched: false,
        isSwitchedCustom: "Yes"
      };
    }
  };
</script>
```

:::

### Variants

::: demo

```html
<template>
  <section>
    <o-field>
      <o-switch :value="true">
        Default
      </o-switch>
    </o-field>
    <o-field>
      <o-switch :value="true" variant="info">
        Info
      </o-switch>
    </o-field>
    <o-field>
      <o-switch :value="true" variant="success">
        Success
      </o-switch>
    </o-field>
    <o-field>
      <o-switch :value="true" variant="danger">
        Danger
      </o-switch>
    </o-field>
    <o-field>
      <o-switch :value="true" variant="warning">
        Warning
      </o-switch>
    </o-field>
  </section>
</template>

<script>
  export default {};
</script>
```

:::

### Sizes

::: demo

```html
<template>
  <section>
    <o-field>
      <o-switch size="small">Small</o-switch>
    </o-field>
    <o-field>
      <o-switch>Default</o-switch>
    </o-field>
    <o-field>
      <o-switch size="medium">Medium</o-switch>
    </o-field>
    <o-field>
      <o-switch size="large">Large</o-switch>
    </o-field>
  </section>
</template>

<script>
  export default {};
</script>
```

:::

### Style variants

::: demo

```html
<template>
  <section>
    <o-field grouped>
      <o-switch v-model="isRounded">Rounded</o-switch>
      <o-switch v-model="isOutlined">Outlined</o-switch>
    </o-field>
    <o-field label="Variant">
      <o-select expanded v-model="variant" placeholder="Variant">
        <option value="null">Default</option>
        <option value="primary">Primary</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="danger">Danger</option>
      </o-select>
    </o-field>
    <o-field label="Passive Variant">
      <o-select expanded v-model="passive" placeholder="Passive Variant">
        <option value="null">Default</option>
        <option value="primary">Primary</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="danger">Danger</option>
      </o-select>
    </o-field>
    <o-field label="Size">
      <o-select expanded v-model="size">
        <option value="">Default</option>
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
      </o-select>
    </o-field>
    <o-switch
      :rounded="isRounded"
      :outlined="isOutlined"
      :size="size"
      :variant="variant"
      :passive-variant="passive"
      >Sample</o-switch
    >
  </section>
</template>

<script>
  export default {
    data() {
      return {
        size: "",
        variant: null,
        passive: null,
        isRounded: false,
        isOutlined: false
      };
    }
  };
</script>
```

:::

## Props

| Prop name      | Description | Type                    | Values | Default                                                                                                                                                                                                              |
| -------------- | ----------- | ----------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value          |             | string\|number\|boolean | -      |                                                                                                                                                                                                                      |
| nativeValue    |             | string\|number\|boolean | -      |                                                                                                                                                                                                                      |
| disabled       |             | boolean                 | -      |                                                                                                                                                                                                                      |
| variant        |             | string                  | -      |                                                                                                                                                                                                                      |
| passiveVariant |             | string                  | -      |                                                                                                                                                                                                                      |
| name           |             | string                  | -      |                                                                                                                                                                                                                      |
| required       |             | boolean                 | -      |                                                                                                                                                                                                                      |
| size           |             | string                  | -      |                                                                                                                                                                                                                      |
| trueValue      |             | string\|number\|boolean | -      | true                                                                                                                                                                                                                 |
| falseValue     |             | string\|number\|boolean | -      | false                                                                                                                                                                                                                |
| rounded        |             | boolean                 | -      | true                                                                                                                                                                                                                 |
| outlined       |             | boolean                 | -      | false                                                                                                                                                                                                                |
| rootClass      |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'switch.override', false)<br> const clazz = getValueByPath(config, 'switch.rootClass', '')<br> return getCssClass(clazz, override, 'o-switch')<br>}              |
| disabledClass  |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'switch.override', false)<br> const clazz = getValueByPath(config, 'switch.disabledClass', '')<br> return getCssClass(clazz, override, 'o-switch-disabled')<br>} |
| checkClass     |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'switch.override', false)<br> const clazz = getValueByPath(config, 'switch.checkClass', '')<br> return getCssClass(clazz, override, 'o-switch-check')<br>}       |
| roundedClass   |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'switch.override', false)<br> const clazz = getValueByPath(config, 'switch.roundedClass', '')<br> return getCssClass(clazz, override, 'o-switch-rounded')<br>}   |
| outlinedClass  |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'switch.override', false)<br> const clazz = getValueByPath(config, 'switch.outlinedClass', '')<br> return getCssClass(clazz, override, 'o-switch-outlined')<br>} |
| labelClass     |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'switch.override', false)<br> const clazz = getValueByPath(config, 'switch.labelClass', '')<br> return getCssClass(clazz, override, 'o-switch-label')<br>}       |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| input      | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                                   | SASS Variable                            | Default                                                                                          |
| ---------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| --oruga-switch-active-background-color-opacity | \$switch-active-background-color-opacity | 0.9                                                                                              |
| --oruga-switch-active-background-color         | \$switch-active-background-color         | \$primary                                                                                        |
| --oruga-switch-active-box-shadow-color         | \$switch-active-box-shadow-color         | #b5b5b5                                                                                          |
| --oruga-switch-active-box-shadow-length        | \$switch-active-box-shadow-length        | 0 0 0.5em                                                                                        |
| --oruga-switch-active-box-shadow-opacity       | \$switch-active-box-shadow-opacity       | 0.6                                                                                              |
| --oruga-swtich-action-background               | \$swtich-action-background               | #f5f5f5                                                                                          |
| --oruga-switch-background                      | \$switch-background                      | #b5b5b5                                                                                          |
| --oruga-switch-border-radius                   | \$switch-border-radius                   | \$base-border-radius                                                                             |
| --oruga-switch-box-shadow                      | \$switch-box-shadow                      | 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05) |
| --oruga-switch-checked-box-shadow-color        | \$switch-checked-box-shadow-color        | \$switch-active-background-color                                                                 |
| --oruga-switch-checked-box-shadow-length       | \$switch-checked-box-shadow-length       | 0 0 0.5em                                                                                        |
| --oruga-switch-checked-box-shadow-opacity      | \$switch-checked-box-shadow-opacity      | 0.8                                                                                              |
| --oruga-switch-disabled-opacity                | \$switch-disabled-opacity                | \$base-disabled-opacity                                                                          |
| --oruga-switch-hover-background-color          | \$switch-hover-background-color          | rgba(#b5b5b5, 0.9)                                                                               |
| --oruga-switch-hover-border-color-opacity      | \$switch-hover-border-color-opacity      | 0.9                                                                                              |
| --oruga-switch-hover-border-color              | \$switch-hover-border-color              | #b5b5b5                                                                                          |
| --oruga-switch-label-padding                   | \$switch-label-padding                   | 0 0 0 .5em                                                                                       |
| --oruga-switch-margin-sibling                  | \$switch-margin-sibling                  | 0.5em                                                                                            |
| --oruga-switch-outlined-background             | \$switch-outlined-background             | #b5b5b5                                                                                          |
| --oruga-switch-outlined-border-color-opacity   | \$switch-outlined-border-color-opacity   | 0.9                                                                                              |
| --oruga-switch-outlined-border-color           | \$switch-outlined-border-color           | \$switch-outlined-background                                                                     |
| --oruga-switch-outlined-border-style           | \$switch-outlined-border-style           | solid                                                                                            |
| --oruga-switch-outlined-border-width           | \$switch-outlined-border-width           | .1rem                                                                                            |
| --oruga-switch-padding                         | \$switch-padding                         | 0.2em                                                                                            |
| --oruga-switch-rounded-border-radius           | \$switch-rounded-border-radius           | \$base-rounded-border-radius                                                                     |
| --oruga-switch-width-number                    | \$switch-width-number                    | 2.75                                                                                             |
| --oruga-switch-width                           | \$switch-width                           | \$switch-width-number \* 1em                                                                     |

---
title: Select
---

# Select

> Select an item in a dropdown list. Use with Field to access all functionalities

---

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-field label="Simple">
      <o-select placeholder="Select a name">
        <option value="flint">Flint</option>
        <option value="silver">Silver</option>
      </o-select>
    </o-field>

    <o-field label="Grouped">
      <o-select placeholder="Select a character" icon="user">
        <optgroup label="Black Sails">
          <option value="flint">Flint</option>
          <option value="silver">Silver</option>
          <option value="vane">Vane</option>
          <option value="billy">Billy</option>
          <option value="jack">Jack</option>
        </optgroup>

        <optgroup label="Breaking Bad">
          <option value="heisenberg">Heisenberg</option>
          <option value="jesse">Jesse</option>
          <option value="saul">Saul</option>
          <option value="mike">Mike</option>
        </optgroup>

        <optgroup label="Game of Thrones">
          <option value="tyrion-lannister">Tyrion Lannister</option>
          <option value="jamie-lannister">Jamie Lannister</option>
          <option value="daenerys-targaryen">Daenerys Targaryen</option>
          <option value="jon-snow">Jon Snow</option>
        </optgroup>
      </o-select>
    </o-field>

    <o-field
      label="Error"
      variant="danger"
      message="Something went wrong with this field"
    >
      <o-select placeholder="Select a character">
        <option value="flint">Flint</option>
        <option value="silver">Silver</option>
      </o-select>
    </o-field>

    <o-field label="Rounded">
      <o-select placeholder="Select a character" rounded>
        <option value="flint">Flint</option>
        <option value="silver">Silver</option>
      </o-select>
    </o-field>

    <o-field label="Disabled">
      <o-select placeholder="Select a character" disabled>
        <option value="flint">Flint</option>
        <option value="silver">Silver</option>
      </o-select>
    </o-field>

    <o-field label="Disabled option">
      <o-select placeholder="Select a character">
        <option value="flint">Flint</option>
        <option value="silver" disabled>Silver</option>
      </o-select>
    </o-field>

    <o-field label="Expanded">
      <o-select placeholder="Select a character" expanded>
        <option value="flint">Flint</option>
        <option value="silver">Silver</option>
      </o-select>
    </o-field>

    <o-field>
      <o-select placeholder="Large" size="large" expanded>
        <option value="flint">Flint</option>
        <option value="silver">Silver</option>
      </o-select>
    </o-field>
  </section>
</template>

<script>
  export default {};
</script>
```

:::

## Props

| Prop name          | Description | Type                                   | Values | Default                                                                                                                                                                                                              |
| ------------------ | ----------- | -------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| size               |             | string                                 | -      |                                                                                                                                                                                                                      |
| expanded           |             | boolean                                | -      |                                                                                                                                                                                                                      |
| loading            |             | boolean                                | -      |                                                                                                                                                                                                                      |
| rounded            |             | boolean                                | -      |                                                                                                                                                                                                                      |
| icon               |             | string                                 | -      |                                                                                                                                                                                                                      |
| iconPack           |             | string                                 | -      |                                                                                                                                                                                                                      |
| autocomplete       |             | string                                 | -      |                                                                                                                                                                                                                      |
| maxlength          |             | number\|string                         | -      |                                                                                                                                                                                                                      |
| useHtml5Validation |             | boolean                                | -      | () => getValueByPath(config, 'useHtml5Validation', true)                                                                                                                                                             |
| validationMessage  |             | string                                 | -      |                                                                                                                                                                                                                      |
| value              |             | string\|number\|boolean\|object\|array | -      | null                                                                                                                                                                                                                 |
| iconRight          |             | string                                 | -      | 'caret-down'                                                                                                                                                                                                         |
| placeholder        |             | string                                 | -      |                                                                                                                                                                                                                      |
| multiple           |             | boolean                                | -      |                                                                                                                                                                                                                      |
| nativeSize         |             | string\|number                         | -      |                                                                                                                                                                                                                      |
| rootClass          |             | string                                 | -      | () => {<br> const override = getValueByPath(config, 'select.override', false)<br> const clazz = getValueByPath(config, 'select.inputClass', '')<br> return getCssClass(clazz, override, 'o-control-select')<br>}     |
| selectClass        |             | string                                 | -      | () => {<br> const override = getValueByPath(config, 'select.override', false)<br> const clazz = getValueByPath(config, 'select.selectClass', '')<br> return getCssClass(clazz, override, 'o-select')<br>}            |
| roundedClass       |             | string                                 | -      | () => {<br> const override = getValueByPath(config, 'select.override', false)<br> const clazz = getValueByPath(config, 'select.roundedClass', '')<br> return getCssClass(clazz, override, 'o-select-rounded')<br>}   |
| multipleClass      |             | string                                 | -      | () => {<br> const override = getValueByPath(config, 'select.override', false)<br> const clazz = getValueByPath(config, 'select.multipleClass', '')<br> return getCssClass(clazz, override, 'o-select-multiple')<br>} |
| emptyClass         |             | string                                 | -      | () => {<br> const override = getValueByPath(config, 'select.override', false)<br> const clazz = getValueByPath(config, 'select.emptyClass', '')<br> return getCssClass(clazz, override, 'o-select-empty')<br>}       |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| blur       | undefined |
| focus      | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                           | SASS Variable                    | Default                               |
| -------------------------------------- | -------------------------------- | ------------------------------------- |
| --oruga-select-background-color        | \$select-background-color        | #fff                                  |
| --oruga-select-border-color            | \$select-border-color            | #dbdbdb                               |
| --oruga-select-border-radius           | \$select-border-radius           | \$base-border-radius                  |
| --oruga-select-box-shadow              | \$select-box-shadow              | none                                  |
| --oruga-select-color                   | \$select-color                   | #363636                               |
| --oruga-select-control-icon-zindex     | \$select-control-icon-zindex     | 4                                     |
| --oruga-select-empty-color             | \$select-empty-color             | rgba(\$grey, 0.7)                     |
| --oruga-select-font-size               | \$select-font-size               | \$base-font-size                      |
| --oruga-select-height                  | \$select-height                  | \$control-height                      |
| --oruga-select-line-height             | \$select-line-height             | \$base-line-height                    |
| --oruga-select-margin                  | \$select-margin                  | 0                                     |
| --oruga-select-max-width               | \$select-max-width               | 100%                                  |
| --oruga-select-optgroup-color          | \$select-optgroup-color          | \$grey-light                          |
| --oruga-select-optgroup-font-style     | \$select-optgroup-font-style     | normal                                |
| --oruga-select-optgroup-font-weight    | \$select-optgroup-font-weight    | 500                                   |
| --oruga-select-optgroup-padding        | \$select-optgroup-padding        | 0.25em 0                              |
| --oruga-select-option-color            | \$select-option-color            | #4a4a4a                               |
| --oruga-select-option-disabled-opacity | \$select-option-disabled-opacity | \$base-disabled-opacity               |
| --oruga-select-option-padding          | \$select-option-padding          | .25em .5em                            |
| --oruga-select-padding                 | \$select-padding                 | calc(.375em - 1px) calc(.625em - 1px) |

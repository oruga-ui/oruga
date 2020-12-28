---
title: Field
---

# Field

> Fields are used to add functionality to controls and to attach/group components and elements together

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/field/examples/Field.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-field label="Name">
      <o-input value="Kevin Garvey"></o-input>
    </o-field>

    <o-field label="Email" variant="danger" message="This email is invalid">
      <o-input type="email" value="john@" maxlength="30"> </o-input>
    </o-field>

    <o-field label="Username" variant="success" message="This username is available">
      <o-input value="johnsilver" maxlength="30"></o-input>
    </o-field>

    <o-field label="Password" variant="warning">
      <o-input value="123" type="password" maxlength="30"></o-input>
    </o-field>

    <o-field label="Subject">
      <o-select placeholder="Select a subject">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </o-select>
    </o-field>

    <o-field label="Wrong subject" variant="danger" message="Selected subject is wrong">
      <o-select placeholder="Select a subject">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </o-select>
    </o-field>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Addons

::: demo

```html
<template>
  <section>
    <o-field variant="danger">
      <o-input placeholder="Search..." type="search" icon="search"> </o-input>
      <o-button variant="primary">Search</o-button>
    </o-field>

    <o-field>
      <o-input placeholder="This is expanded" expanded></o-input>
      <o-button>@gmail.com</o-button>
    </o-field>

    <hr />

    <o-field>
      <o-select placeholder="Currency">
        <option>$</option>
        <option>£</option>
        <option>€</option>
      </o-select>
      <o-input type="number" placeholder="0,00"></o-input>
      <o-button variant="success">Transfer</o-button>
    </o-field>

    <o-field>
      <o-button>
        <o-icon icon="bold"></o-icon>
      </o-button>

      <o-button>
        <o-icon icon="italic"></o-icon>
      </o-button>

      <o-button>
        <o-icon icon="underline"></o-icon>
      </o-button>

      <o-button>
        <o-icon icon="align-left"></o-icon>
      </o-button>

      <o-button>
        <o-icon icon="align-center"></o-icon>
      </o-button>

      <o-button>
        <o-icon icon="align-right"></o-icon>
      </o-button>

      <o-input placeholder="Search..." type="search" icon="search"></o-input>
    </o-field>

    <o-field>
      <o-button variant="primary">
        Button
      </o-button>
      <o-dropdown>
        <o-button variant="primary" slot="trigger">
          <o-icon icon="caret-down"></o-icon>
        </o-button>

        <o-dropdown-item>Action</o-dropdown-item>
        <o-dropdown-item>Another action</o-dropdown-item>
        <o-dropdown-item>Something else</o-dropdown-item>
      </o-dropdown>
    </o-field>

    <o-field>
      <o-dropdown>
        <o-button slot="trigger">
          <span>Filters</span>
          <o-icon icon="caret-down"></o-icon>
        </o-button>

        <o-dropdown-item value="open_issues">Open Issues and Pull Requests</o-dropdown-item>
        <o-dropdown-item value="your_issues">Your Issues</o-dropdown-item>
        <o-dropdown-item value="pull_requests">Your Pull Requests</o-dropdown-item>
        <o-dropdown-item value="everything">Everything</o-dropdown-item>
      </o-dropdown>
      <o-input icon="search" type="search" placeholder="Search..."></o-input>
    </o-field>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Grouped

::: demo

```html
<template>
  <section>
    <o-field grouped variant="danger" message="What do you want to search?">
      <o-input placeholder="Search..."></o-input>
      <o-button variant="primary">Search</o-button>
    </o-field>

    <o-field grouped message="What do you want to search?">
      <o-input placeholder="Search..." expanded></o-input>
      <o-button variant="primary">Search</o-button>
    </o-field>

    <o-field grouped group-multiline>
      <o-input></o-input>
      <o-button>First</o-button>
      <o-button>Second</o-button>
      <o-button>Third</o-button>
      <o-button>Fourth</o-button>
      <o-button>Fifth</o-button>
      <o-button>Sixth</o-button>
      <o-button>Seventh</o-button>
      <o-button>Eighth</o-button>
    </o-field>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Horizontal

::: demo

```html
<template>
  <section>
    <o-field horizontal label="Subject" variant="danger" message="Please enter a subject">
      <o-input name="subject" expanded></o-input>
    </o-field>

    <o-field horizontal label="From">
      <o-input name="name" placeholder="Name" expanded></o-input>
      <o-input name="email" type="email" placeholder="nobody@nowhere.com" expanded></o-input>
    </o-field>

    <o-field horizontal label="Topic">
      <o-select placeholder="Select a topic">
        <option value="1">Oruga</option>
        <option value="2">Vue.js</option>
        <option value="3">UI</option>
      </o-select>
    </o-field>

    <o-field horizontal label="Message">
      <o-input type="textarea"></o-input>
    </o-field>

    <o-field horizontal
      ><!-- Label left empty for spacing -->
      <o-button variant="primary">
        Send message
      </o-button>
    </o-field>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Slots

::: demo

```html
<template>
  <section>
    <o-field horizontal>
      <template slot="label">
        With tooltip
        <o-tooltip label="Help text here for explanation">
          <o-icon size="small" icon="question-circle"></o-icon>
        </o-tooltip>
      </template>
      <o-input size="medium"></o-input>
    </o-field>

    <o-field>
      <template slot="label"> Label with custom <i>style</i> </template>
      <o-input></o-input>
      <template slot="message"> Message with custom <b>style</b> </template>
    </o-field>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

## Props

| Prop name      | Description                                                                                                      | Type           | Values                                                                          | Default |
| -------------- | ---------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------- |
| variant        | Color of the field and help message, also adds a matching icon, optional. Used by Input, Select and Autocomplete | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |
| label          | Field label                                                                                                      | string         | -                                                                               |         |
| labelFor       | Same as native for set on the label                                                                              | string         | -                                                                               |         |
| message        | Help message text                                                                                                | string         | -                                                                               |         |
| grouped        | Direct child components/elements of Field will be grouped horizontally (see which ones at the top of the page)   | boolean        | -                                                                               |         |
| groupMultiline | Allow controls to fill up multiple lines, making it responsive                                                   | boolean        | -                                                                               |         |
| horizontal     | Group label and control on the same line for horizontal forms                                                    | boolean        | -                                                                               |         |
| addons         | Field automatically attach controls together                                                                     | boolean        | -                                                                               | true    |
| labelSize      | Vertical size of input, optional                                                                                 | string         | `small`, `medium`, `large`                                                      |         |

## Class props

| Prop name            | Description | Type   | Values | Default |
| -------------------- | ----------- | ------ | ------ | ------- |
| rootClass            |             | string | -      |         |
| horizontalClass      |             | string | -      |         |
| groupedClass         |             | string | -      |         |
| groupMultilineClass  |             | string | -      |         |
| labelClass           |             | string | -      |         |
| labelSizeClass       |             | string | -      |         |
| labelHorizontalClass |             | string | -      |         |
| bodyClass            |             | string | -      |         |
| bodyHorizontalClass  |             | string | -      |         |
| addonsClass          |             | string | -      |         |
| messageClass         |             | string | -      |         |
| variantClass         |             | string | -      |         |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| label   |             |          |
| default |             |          |
| message |             |          |

## Style

| CSS Variable                          | SASS Variable                   | Default          |
| ------------------------------------- | ------------------------------- | ---------------- |
| --oruga-field-label-color             | \$field-label-color             | #363636          |
| --oruga-field-label-font-size         | \$field-label-font-size         | \$base-font-size |
| --oruga-field-label-font-weight       | \$field-label-font-weight       | 600              |
| --oruga-field-margin-bottom           | \$field-margin-bottom           | .75rem           |
| --oruga-field-message-font-size       | \$field-message-font-size       | .75rem           |
| --oruga-field-message-margin-top      | \$field-message-margin-top      | .25rem           |
| --oruga-field-margin-right            | \$field-margin-right            | .37rem           |
| --oruga-field-horizontal-breakpoint   | \$field-horizontal-breakpoint   | 768px            |
| --oruga-field-horizontal-label-margin | \$field-horizontal-label-margin | 0 1.5rem 0 0     |

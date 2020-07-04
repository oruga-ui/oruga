---
title: Field
---

# Field

> Fields are used to add functionality to controls and to attach/group components and elements together

---

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

    <o-field
      label="Username"
      variant="success"
      message="This username is available"
    >
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
  </section>
</template>

<script>
  export default {};
</script>
```

:::

### Addons

::: demo

```html
<template>
  <section>
    <o-field>
      <o-input placeholder="Search..." type="search" icon="search"> </o-input>
      <o-button variant="primary">Search</o-button>
    </o-field>

    <o-field>
      <o-input placeholder="This is expanded" expanded></o-input>
      <span class="o-button">@gmail.com</span>
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

        <o-dropdown-item value="open_issues"
          >Open Issues and Pull Requests</o-dropdown-item
        >
        <o-dropdown-item value="your_issues">Your Issues</o-dropdown-item>
        <o-dropdown-item value="pull_requests"
          >Your Pull Requests</o-dropdown-item
        >
        <o-dropdown-item value="everything">Everything</o-dropdown-item>
      </o-dropdown>
      <o-input icon="search" type="search" placeholder="Search..."></o-input>
    </o-field>
  </section>
</template>

<script>
  export default {};
</script>
```

:::

### Grouped

::: demo

```html
<template>
  <section>
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

    <o-field grouped>
      <o-input placeholder="Search..."></o-input>
      <o-button variant="primary">Search</o-button>
    </o-field>

    <o-field grouped>
      <o-input placeholder="Search..." expanded></o-input>
      <o-button variant="primary">Search</o-button>
    </o-field>
  </section>
</template>

<script>
  export default {};
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
  export default {};
</script>
```

:::

## Props

| Prop name              | Description | Type           | Values | Default |
| ---------------------- | ----------- | -------------- | ------ | ------- |
| variant                |             | string\|object | -      |         |
| label                  |             | string         | -      |         |
| labelFor               |             | string         | -      |         |
| message                |             | string         | -      |         |
| grouped                |             | boolean        | -      |         |
| groupMultiline         |             | boolean        | -      |         |
| expanded               |             | boolean        | -      |         |
| horizontal             |             | boolean        | -      |         |
| addons                 |             | boolean        | -      | true    |
| rootClass              |             | string         | -      |         |
| horizontalClass        |             | string         | -      |         |
| expandedClass          |             | string         | -      |         |
| groupMultilineClass    |             | string         | -      |         |
| labelClass             |             | string         | -      |         |
| labelHorizontalClass   |             | string         | -      |         |
| contentHorizontalClass |             | string         | -      |         |
| messageClass           |             | string         | -      |         |
| variantClass           |             | string         | -      |         |

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
| --oruga-field-horizontal-breakpoint   | \$field-horizontal-breakpoint   | 769px            |
| --oruga-field-horizontal-label-margin | \$field-horizontal-label-margin | 0 1.5rem 0 0     |

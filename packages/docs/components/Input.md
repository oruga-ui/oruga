---
title: Input
---

# Input

> Get user Input. Use with Field to access all functionalities

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/input/examples/Input.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-field label="Name">
      <o-input v-model="name"></o-input>
    </o-field>

    <o-field label="Email" variant="danger" message="This email is invalid">
      <o-input type="email" value="john@" maxlength="30"> </o-input>
    </o-field>

    <o-field label="Username" variant="success" message="This username is available">
      <o-input value="johnsilver" maxlength="30"></o-input>
    </o-field>

    <o-field label="Password">
      <o-input type="password" value="iwantmytreasure" password-reveal> </o-input>
    </o-field>

    <o-field label="Message">
      <o-input maxlength="200" type="textarea"></o-input>
    </o-field>

    <o-field>
      <o-input placeholder="No label"></o-input>
    </o-field>

    <o-field label="Rounded">
      <o-input placeholder="No label" rounded></o-input>
    </o-field>

    <o-field label="Success" variant="success">
      <o-input placeholder="Success"></o-input>
    </o-field>

    <o-field label="Error" variant="danger" message="You can have a message too">
      <o-input placeholder="Error"></o-input>
    </o-field>

    <o-field label="Info" variant="info">
      <o-input placeholder="Info"></o-input>
    </o-field>

    <o-field label="Warning" variant="warning">
      <o-input placeholder="Warning"></o-input>
    </o-field>

    <o-field label="Disabled">
      <o-input placeholder="Disabled" disabled></o-input>
    </o-field>

    <o-field>
      <o-input placeholder="Large" size="large" icon="user"> </o-input>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        name: 'John Silver'
      }
    }
  }
</script>
```

:::

### Base

::: demo

```html
<template>
  <section>
    <h3 class="subtitle">With Icons</h3>
    <o-field>
      <o-input placeholder="Search..." type="search" icon="search" icon-clickable @icon-click="searchIconClick"> </o-input>
    </o-field>

    <o-field>
      <o-input placeholder="Email" v-model="email" type="email" icon="envelope" icon-right="times-circle" icon-right-clickable @icon-right-click="clearIconClick"> </o-input>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        email: ''
      }
    },
    methods: {
      searchIconClick() {
        alert('You wanna make a search?')
      },
      clearIconClick() {
        this.email = ''
        alert('Email cleared!')
      }
    }
  }
</script>
```

:::

## Class props

<br />
<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-field :variant="s.fieldvariant">
                    <o-input v-bind="s" placeholder="Input"></o-input>
                </o-field>
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
                    description: ""
                },
                {
                    class: "controlExpandedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    }
                },
                {
                    class: "iconsLeftClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                    }
                },
                {
                    class: "iconsRightClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                    }
                },
                {
                    class: "inputClass",
                    description: ""
                },
                {
                    class: "roundedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.rounded = true;
                    }
                },
                {
                    class: "iconLeftClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                    }
                },
                {
                    class: "iconRightClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                    }
                },
                {
                    class: "counterClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.hasCounter = true;
                        cmp.data.maxlength = 10;
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                    }
                },
                {
                    class: "sizeClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.size = 'large';
                    }
                },
                {
                    class: "variantClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.fieldvariant = "info";
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

| Prop name          | Description                                                 | Type           | Values                                            | Default                                            |
| ------------------ | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | -------------------------------------------------- |
| autocomplete       | Native options to use in HTML5 validation                   | string         | -                                                 |                                                    |
| expanded           | Makes input full width when inside a grouped or addon field | boolean        | -                                                 |                                                    |
| hasCounter         | Show character counter when maxlength prop is passed        | boolean        | -                                                 | Config -> <code> 'input.counter': false</code>     |
| icon               | Icon name to be added                                       | string         | -                                                 |                                                    |
| iconClickable      | Makes the icon clickable                                    | boolean        | -                                                 |                                                    |
| iconPack           | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                    |
| iconRight          | Icon name to be added on the right side                     | string         | -                                                 |                                                    |
| iconRightClickable | Make the icon right clickable                               | boolean        | -                                                 |                                                    |
| iconRightType      | Variant of right icon                                       | string\|func   | -                                                 |                                                    |
| maxlength          | Same as native maxlength, plus character counter            | number\|string | -                                                 |                                                    |
| override           |                                                             | boolean        | -                                                 |                                                    |
| passwordReveal     | Adds the reveal password functionality                      | boolean        | -                                                 |                                                    |
| rounded            | Makes the element rounded                                   | boolean        | -                                                 |                                                    |
| size               | Vertical size of input, optional                            | string         | `small`, `medium`, `large`                        |                                                    |
| statusIcon         | Show status icon using field and variant prop               | boolean        | -                                                 | Config -> <code> "statusIcon": true</code>         |
| type               | Input type, like native                                     | string         | `Any native input type`, `and textarea`           | 'text'                                             |
| useHtml5Validation | Enable html 5 native validation                             | boolean        | -                                                 | Config -> <code> "useHtml5Validation": true</code> |
| v-model            |                                                             | number\|string | -                                                 |                                                    |
| validationMessage  | The message which is shown when a validation error occurs   | string         | -                                                 |                                                    |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| blur       | undefined |
| focus      | undefined |
| input      | undefined |

## Style

| CSS Variable                        | SASS Variable                 | Default                                               |
| ----------------------------------- | ----------------------------- | ----------------------------------------------------- |
| --oruga-input-background-color      | \$input-background-color      | #ffffff                                               |
| --oruga-input-border-color          | \$input-border-color          | \$grey-lighter                                        |
| --oruga-input-border-style          | \$input-border-style          | solid                                                 |
| --oruga-input-border-width          | \$input-border-width          | 1px                                                   |
| --oruga-input-border-radius         | \$input-border-radius         | \$base-border-radius                                  |
| --oruga-input-rounded-border-radius | \$input-rounded-border-radius | \$base-rounded-border-radius                          |
| --oruga-input-box-shadow            | \$input-box-shadow            | inset 0 1px 2px hsla(0,0%,4%,.1)                      |
| --oruga-input-color                 | \$input-color                 | #363636                                               |
| --oruga-input-icon-zindex           | \$input-icon-zindex           | 4                                                     |
| --oruga-input-counter-font-size     | \$input-counter-font-size     | .75rem                                                |
| --oruga-input-counter-margin        | \$input-counter-margin        | .25rem 0 0 .5rem                                      |
| --oruga-input-height                | \$input-height                | \$control-height                                      |
| --oruga-input-line-height           | \$input-line-height           | \$base-line-height                                    |
| --oruga-input-margin                | \$input-margin                | 0                                                     |
| --oruga-input-max-width             | \$input-max-width             | 100%                                                  |
| --oruga-input-padding               | \$input-padding               | $control-padding-vertical $control-padding-horizontal |
| --oruga-input-textarea-max-height   | \$input-textarea-max-height   | 600px                                                 |
| --oruga-input-textarea-min-height   | \$input-textarea-min-height   | 120px                                                 |
| --oruga-input-textarea-padding      | \$input-textarea-padding      | 0.625em                                               |
| --oruga-input-width                 | \$input-width                 | 100%                                                  |

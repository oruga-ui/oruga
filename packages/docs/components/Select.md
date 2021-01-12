---
title: Select
---

# Select

> Select an item in a dropdown list. Use with Field to access all functionalities

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/select/examples/Select.md" class="docgen-edit-link">edit on github</a>

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

    <o-field label="Error" variant="danger" message="Something went wrong with this field">
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

    <o-field label="Size 'large'">
      <o-select placeholder="Large" size="large">
        <option value="flint">Flint</option>
        <option value="silver">Silver</option>
      </o-select>
    </o-field>

    <o-field label="Multiple">
      <o-select multiple native-size="8" v-model="selectedOptions">
        <option value="flint">Flint</option>
        <option value="silver">Silver</option>
        <option value="vane">Vane</option>
        <option value="billy">Billy</option>
        <option value="jack">Jack</option>
        <option value="heisenberg">Heisenberg</option>
        <option value="jesse">Jesse</option>
        <option value="saul">Saul</option>
        <option value="mike">Mike</option>
      </o-select>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        selectedOptions: []
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
                <o-field :variant="s.fieldvariant" :message="s.fieldmessage">
                    <o-select placeholder="Select a character" v-bind="s" v-model="selectedOptions">
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
                    </o-select>
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
            selectedOptions: null,
            inspectData: [
                {
                    class: "rootClass",
                    description: "Class of the root element",
                    action: () => {
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconLeftSpaceClass",
                    description: "Class of the left icon space inside the select",
                    properties: ['icon'],
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconRightSpaceClass",
                    description: "Class of the right icon space inside the select",
                    properties: ['iconRight'],
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "roundedClass",
                    description: "Class of select when rounded",
                    properties: ['rounded'],
                    action: (cmp) => {
                        cmp.data.rounded = true;
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "multipleClass",
                    description: "Class of the select when multiple mode is active",
                    properties: ['multiple'],
                    action: (cmp) => {
                        cmp.data.multiple = true;
                        this.selectedOptions = [];
                    }
                },
                {
                    class: "expandedClass",
                    description: "Class of select when expanded",
                    properties: ['expanded'],
                    action: (cmp) => {
                        cmp.data.expanded = true;
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconLeftClass",
                    description: "Class of the left icon",
                    properties: ['icon'],
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "iconRightClass",
                    description: "Class of the right icon",
                    properties: ['iconRight'],
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "sizeClass",
                    description: "Class of the select size",
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'large';
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "variantClass",
                    description : 'Class of the select variant',
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.fieldvariant = 'info';
                        cmp.data.fieldmessage = "Info for this field"
                        this.selectedOptions = null;
                    }
                },
                {
                    class: "placeholderClass",
                    description: "Class of the select placeholder",
                    action: () => {
                        this.selectedOptions = null;
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

| Prop name          | Description                                                 | Type                                   | Values                                            | Default                                                  |
| ------------------ | ----------------------------------------------------------- | -------------------------------------- | ------------------------------------------------- | -------------------------------------------------------- |
| autocomplete       | Native options to use in HTML5 validation                   | string                                 | -                                                 |                                                          |
| expanded           | Makes input full width when inside a grouped or addon field | boolean                                | -                                                 |                                                          |
| icon               | Icon name to be added                                       | string                                 | -                                                 |                                                          |
| iconPack           | Icon pack to use                                            | string                                 | `mdi`, `fa`, `fas and any other custom icon pack` |                                                          |
| iconRight          | Icon name to be added on the right side                     | string                                 | -                                                 | Config -> <code> 'select.iconRight': 'caret-down'</code> |
| maxlength          | Same as native maxlength, plus character counter            | number\|string                         | -                                                 |                                                          |
| multiple           |                                                             | boolean                                | -                                                 |                                                          |
| nativeSize         | Same as native size                                         | string\|number                         | -                                                 |                                                          |
| override           |                                                             | boolean                                | -                                                 |                                                          |
| placeholder        | Text when nothing is selected                               | string                                 | -                                                 |                                                          |
| rounded            | Makes the element rounded                                   | boolean                                | -                                                 |                                                          |
| size               | Vertical size of input, optional                            | string                                 | `small`, `medium`, `large`                        |                                                          |
| statusIcon         | Show status icon using field and variant prop               | boolean                                | -                                                 | Config -> <code> "statusIcon": true</code>               |
| useHtml5Validation | Enable html 5 native validation                             | boolean                                | -                                                 | Config -> <code> "useHtml5Validation": true</code>       |
| v-model            |                                                             | string\|number\|boolean\|object\|array | -                                                 | null                                                     |
| validationMessage  | The message which is shown when a validation error occurs   | string                                 | -                                                 |                                                          |

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

| CSS Variable                         | SASS Variable                  | Default                                               |
| ------------------------------------ | ------------------------------ | ----------------------------------------------------- |
| --oruga-select-background-color      | \$select-background-color      | #fff                                                  |
| --oruga-select-border-color          | \$select-border-color          | \$grey-lighter                                        |
| --oruga-select-border-width          | \$select-border-width          | 1px                                                   |
| --oruga-select-border-style          | \$select-border-style          | solid                                                 |
| --oruga-select-border-radius         | \$select-border-radius         | \$base-border-radius                                  |
| --oruga-select-rounded-border-radius | \$select-rounded-border-radius | \$base-rounded-border-radius                          |
| --oruga-select-box-shadow            | \$select-box-shadow            | none                                                  |
| --oruga-select-color                 | \$select-color                 | #363636                                               |
| --oruga-select-icon-zindex           | \$select-icon-zindex           | 4                                                     |
| --oruga-select-font-size             | \$select-font-size             | \$base-font-size                                      |
| --oruga-select-height                | \$select-height                | \$control-height                                      |
| --oruga-select-line-height           | \$select-line-height           | \$base-line-height                                    |
| --oruga-select-margin                | \$select-margin                | 0                                                     |
| --oruga-select-max-width             | \$select-max-width             | 100%                                                  |
| --oruga-select-width                 | \$select-width                 | 100%                                                  |
| --oruga-select-placeholder-opacity   | \$select-placeholder-opacity   | \$base-disabled-opacity                               |
| --oruga-select-padding               | \$select-padding               | $control-padding-vertical $control-padding-horizontal |

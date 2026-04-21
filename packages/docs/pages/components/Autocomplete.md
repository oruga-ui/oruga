[//]: # "This file is generated and should not be edited by hand!"

# Autocomplete

<section class="odocs-head">

The **Autocomplete** input component allows you to search through a list of options.
It is an advanced input that provides suggestions as the user types.
Based on the [Dropdown](/components/Dropdown.html) component, the component implements the W3C ARIA APG [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).
Use it with the [Field](/components/Field) component to access all functionalities.

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Autocomplete/examples/base.vue";
import BaseCode from "@/components/Autocomplete/examples/base.vue?raw";

import OptionsArray from "@/components/Autocomplete/examples/options-array.vue";
import OptionsArrayCode from "@/components/Autocomplete/examples/options-array.vue?raw";

import OptionsGrouped from "@/components/Autocomplete/examples/options-grouped.vue";
import OptionsGroupedCode from "@/components/Autocomplete/examples/options-grouped.vue?raw";

import Templates from "@/components/Autocomplete/examples/templates.vue";
import TemplatesCode from "@/components/Autocomplete/examples/templates.vue?raw";

import Selection from "@/components/Autocomplete/examples/selection.vue";
import SelectionCode from "@/components/Autocomplete/examples/selection.vue?raw";

import Scroll from "@/components/Autocomplete/examples/scroll.vue";
import ScrollCode from "@/components/Autocomplete/examples/scroll.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Selection

The autocomplete input can only contain one item at a time.
For the multiple selection version, see the [Taginput](/components/Taginput.html) component.

<ExampleViewer :component="Selection" :code="SelectionCode" />

### Options

There are several ways to define options for the component.
They are similiar to the options definition of the [Dropdown](/components/Dropdown.html) component:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects where each object represent an item
- An array of grouped items where each group object has its own `options` property
- Using the `<o-dropdown-item>` component directly inside the default template slot

::: info TypeScript
The options property type is defined by the <code>AutocompleteOptions</code> type.
:::

#### Array of objects

The most flexible way to define options is to provide an array of objects.
The object has the same properties as the `<o-dropdown-item>` component.

<ExampleViewer :component="OptionsArray" :code="OptionsArrayCode" />

#### Grouped options

You can also use the array of objects syntax to create grouped options,
wrapping each group of options in an object with a `label` and an `options` property.
The object has the same properties as the `<o-dropdown-item>` component.

<ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

### Templates

Instead of using the `options` prop the options can also be defined by using the `o-dropdown-item` component in the `default` template slot. Additionally a header and a footer can be added to the options list by using the `header` and `footer` template slots. The header and footer can be made clickable by adding the `selectable-header` and `selectable-footer` props. Clicking them will clear the input.

::: info Known limitations
Due to the way the Vue reactivity system works, it is not possible to define a JavaScript object for the `value` property of the `o-dropdown-item` component directly in the template block. This will result in a recursive rendering error. In order to use an object as a value, the object must be defined as variable in the script block. (See [Issue #1531](https://github.com/oruga-ui/oruga/issues/1531))
:::

<ExampleViewer :component="Templates" :code="TemplatesCode" />

### Infinite Scroll & Async Data

When `check-scroll` prop is set, the component will emits the `scroll-start` and `scroll-end` events. These events can be used to load more options as needed. Consider adding `backend-filtering` when manually updating options on input values changes.

::: info Note
The autocomplete component does not have a default slot for defining options. The default slot is used to override the option element template.
:::

<ExampleViewer :component="Scroll" :code="ScrollCode" />

</section>

<section class="odocs-specs">

## Autocomplete Component

> Extended input that provide suggestions while the user types.

```html
<o-autocomplete></o-autocomplete>
```

### Props

| Prop name          | Description                                                                                                                                                                      | Type                                                                                         | Values                                            | Default                                                                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active             | The active state of the dropdown, use v-model:active to make it two-way binding                                                                                                  | boolean                                                                                      | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| animation          | Transition name to apply on dropdown list                                                                                                                                        | string                                                                                       | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>         |
| autocomplete       | Native options to use in HTML5 validation                                                                                                                                        | string                                                                                       | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>       |
| backendFiltering   | Options won't be filtered based on the input value on clientside                                                                                                                 | boolean                                                                                      | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;backendFiltering: false<br>}</code>   |
| clearIcon          | Icon name to be added on the clear button                                                                                                                                        | string                                                                                       | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;clearIcon: "close-circle"<br>}</code> |
| clearOnSelect      | Clear input text on select                                                                                                                                                       | boolean                                                                                      | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;clearOnSelect: false<br>}</code>      |
| clearable          | Add a button/icon to clear the inputed text                                                                                                                                      | boolean                                                                                      | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;clearable: false<br>}</code>          |
| customValidity     | Custom HTML 5 validation error to set on the form control                                                                                                                        | string \| ((currentValue: unknown \| null , state: ValidityState) =&gt; string) \| undefined | -                                                 |                                                                                                                                                                  |
| debounce           | Number of milliseconds to delay before to emit input event                                                                                                                       | number                                                                                       | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;debounce: 400<br>}</code>             |
| desktopModal       | Dropdown content (items) are shown into a modal on desktop                                                                                                                       | boolean                                                                                      | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;desktopModal: false<br>}</code>           |
| disabled           | Same as native input disabled                                                                                                                                                    | boolean                                                                                      | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| expanded           | Makes input full width when inside a grouped or addon field                                                                                                                      | boolean                                                                                      | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;expanded: false<br>}</code>           |
| filter             | Function to filter the option based on the input value - default is label string comparison                                                                                      | ((option: unknown, value: string) =&gt; boolean)                                             | -                                                 |                                                                                                                                                                  |
| icon               | Icon to be shown                                                                                                                                                                 | string                                                                                       | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>           |
| iconClickable      | Makes the icon clickable                                                                                                                                                         | boolean                                                                                      | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| iconPack           | Icon pack to use                                                                                                                                                                 | string                                                                                       | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>       |
| iconRight          | Icon to be added on the right side                                                                                                                                               | string                                                                                       | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>      |
| iconRightClickable | Make the icon right clickable                                                                                                                                                    | boolean                                                                                      | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| iconRightVariant   | Variant of right icon                                                                                                                                                            | string                                                                                       | -                                                 |                                                                                                                                                                  |
| input              | The value of the inner input, use v-model:input to make it two-way binding                                                                                                       | string                                                                                       | -                                                 | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                         |
| itemTag            | Menu item tag name                                                                                                                                                               | DynamicComponent                                                                             | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;itemTag: "div"<br>}</code>            |
| keepFirst          | The first option will always be focused (easier to just hit enter or tab)                                                                                                        | boolean                                                                                      | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;keepFirst: false<br>}</code>          |
| keepOpen           | Keep open dropdown list after select                                                                                                                                             | boolean                                                                                      | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;keepOpen: false<br>}</code>           |
| maxHeight          | Max height of dropdown content                                                                                                                                                   | Numberish                                                                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;maxHeight: undefined<br>}</code>      |
| maxlength          | Same as native maxlength, plus character counter                                                                                                                                 | Numberish                                                                                    | -                                                 |                                                                                                                                                                  |
| menuTag            | Menu tag name                                                                                                                                                                    | DynamicComponent                                                                             | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;menuTag: "div"<br>}</code>            |
| mobileModal        | Dropdown content (items) are shown into a modal on mobile                                                                                                                        | boolean                                                                                      | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;mobileModal: false<br>}</code>        |
| v-model            | The selected option value, use v-model to make it two-way binding<br/>the selected value, use v-model to make it two-way binding                                                 | string\|number\|object                                                                       | -                                                 |                                                                                                                                                                  |
| openOnFocus        | Open dropdown list on focus                                                                                                                                                      | boolean                                                                                      | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;openOnFocus: false<br>}</code>        |
| options            | Autocomplete options                                                                                                                                                             | AutocompleteOptions&lt;unknown&gt;                                                           | -                                                 |                                                                                                                                                                  |
| override           | Override existing theme classes completely                                                                                                                                       | boolean                                                                                      | -                                                 |                                                                                                                                                                  |
| placeholder        | Input placeholder                                                                                                                                                                | string                                                                                       | -                                                 |                                                                                                                                                                  |
| position           | Position of the dropdown                                                                                                                                                         | "auto" \| "bottom" \| "top"                                                                  | `auto`, `top`, `bottom`                           | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;position: "auto"<br>}</code>          |
| rounded            | Makes the element rounded                                                                                                                                                        | boolean                                                                                      | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| selectOnClose      | Trigger the select event for focused option when drodpown got closed                                                                                                             | boolean                                                                                      | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| selectableFooter   | Allows the footer in the autocomplete to be selectable                                                                                                                           | boolean                                                                                      | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| selectableHeader   | Allows the header in the autocomplete to be selectable                                                                                                                           | boolean                                                                                      | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| size               | Size of the input control                                                                                                                                                        | string                                                                                       | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| statusIcon         | Show status icon using field and variant prop                                                                                                                                    | boolean                                                                                      | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;statusIcon: true<br>}</code>                        |
| teleport           | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean \| object \| string                                                                  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;teleport: false<br>}</code>           |
| type               | Input type                                                                                                                                                                       | string                                                                                       | -                                                 | <code style='white-space: nowrap; padding: 0;'>"text"</code>                                                                                                     |
| useHtml5Validation | Enable HTML 5 native validation                                                                                                                                                  | boolean                                                                                      | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                |

### Events

| Event name         | Properties                                                            | Description                                    |
| ------------------ | --------------------------------------------------------------------- | ---------------------------------------------- |
| update:model-value | **value** `unknown` - updated modelValue prop                         | modelValue prop two-way binding                |
| update:input       | **value** `string` - updated input prop                               | input prop two-way binding                     |
| update:active      | **value** `boolean` - updated active prop                             | active prop two-way binding                    |
| input              | **value** `string` - input value<br/>**event** `Event` - native event | on input change event                          |
| select             | **value** `unknown` - selected value                                  | selected element changed event                 |
| select-header      |                                                                       | header is selected                             |
| select-footer      |                                                                       | footer is selected                             |
| focus              | **event** `Event` - native event                                      | on input focus event                           |
| blur               | **event** `Event` - native event                                      | on input blur event                            |
| invalid            | **event** `Event` - native event                                      | on input invalid event                         |
| icon-click         | **event** `Event` - native event                                      | on icon click event                            |
| icon-right-click   | **event** `Event` - native event                                      | on icon right click event                      |
| scroll-start       |                                                                       | the list inside the dropdown reached the start |
| scroll-end         |                                                                       | the list inside the dropdown reached it's end  |

### Slots

| Name    | Description                                     | Bindings                                             |
| ------- | ----------------------------------------------- | ---------------------------------------------------- |
| header  | Define an additional header                     | **toggle** `(): void` - toggle dropdown active state |
| default | Define the autocomplete items here              | **toggle** `(): void` - toggle dropdown active state |
| group   | Override the option group                       | **group** `object` - options group                   |
| option  | Override the select option                      | **option** `object` - option object                  |
| empty   | Define the content to show if the list is empty | **toggle** `(): void` - toggle dropdown active state |
| footer  | Define an additional footer                     | **toggle** `(): void` - toggle dropdown active state |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-autocomplete-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                 | Default |
| ----------------------------- | ------- |
| $autocomplete-menu-max-height | 200px   |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_autocomplete.scss)

</div>

</section>

---
sidebarDepth: 2
---

[//]: # "This file is generated and should not be edited by hand!"

# Listbox

<section class="odocs-head">

The **Listbox** component presents a list of options and allows a user to select one or more of them.
The component uses the [ARIA listbox role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/listbox_role) and implements the W3C ARIA APG [Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).
Combine it with the [Field](/components/Field) component to access all functionalities.

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Listbox/examples/base.vue";
import BaseCode from "@/components/Listbox/examples/base.vue?raw";

import Multiple from "@/components/Listbox/examples/multiple.vue";
import MultipleCode from "@/components/Listbox/examples/multiple.vue?raw";

import OptionsPrimitives from "@/components/Listbox/examples/options-primitives.vue";
import OptionsPrimitivesCode from "@/components/Listbox/examples/options-primitives.vue?raw";

import OptionsObject from "@/components/Listbox/examples/options-object.vue";
import OptionsObjectCode from "@/components/Listbox/examples/options-object.vue?raw";

import OptionsArray from "@/components/Listbox/examples/options-array.vue";
import OptionsArrayCode from "@/components/Listbox/examples/options-array.vue?raw";

import OptionsGrouped from "@/components/Listbox/examples/options-grouped.vue";
import OptionsGroupedCode from "@/components/Listbox/examples/options-grouped.vue?raw";

import Filterable from "@/components/Listbox/examples/filterable.vue";
import FilterableCode from "@/components/Listbox/examples/filterable.vue?raw";

import Templates from "@/components/Listbox/examples/templates.vue";
import TemplatesCode from "@/components/Listbox/examples/templates.vue?raw";

import Scroll from "@/components/Listbox/examples/scroll.vue";
import ScrollCode from "@/components/Listbox/examples/scroll.vue?raw";
</script>

### Base

Listboxes are great and accessible select menus for your app, complete with robust support for keyboard navigation and, unlike HTML `<select>` elements, may contain images. The `v-model` can be used to bind the selected value. By default the component allows a single option to be chosen.

::: info Accessibility Note:
When assistive technologies present a listbox, the name of an option is calculated by the browser as a flat string. Therefore, the content of an option should not contain any semantic information, such as a heading. In addition, assistive technologies does not provide an accessible way to present a list of interactive elements for the listbox role, such as links, buttons, or checkboxes.
:::

<ExampleViewer :component="Base" :code="BaseCode" />

### Multiple

When the `multiple` prop is used, the component become a multi-select listbox that allows multiple options to be selected. The `v-model` now contains a list of all selected items.

<ExampleViewer :component="Multiple" :code="MultipleCode" />

### Options

Instead of using the `<o-list-item>` component directly inside the default template slot, an `options` prop can be defined, which can be used to specify the options programmatically. It accepts several different value formats:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects where each object represent an item
- An array of grouped items where each group object has its own `options` property

::: info TypeScript
The options property type is defined by the `ListboxOptions` type.
:::

#### Array of primitives

The simplest way to provide options is an array of primitives like strings or numbers, where the primitive will be used for both the string casted `label` representation and the `value` of the option.

<ExampleViewer
    :component="OptionsPrimitives"
    :code="OptionsPrimitivesCode" />

#### Key-Value pair object

You may also provide the `options` prop where the keys are values and the values of each property are the labels.

<ExampleViewer :component="OptionsObject" :code="OptionsObjectCode" />

#### Array of objects

The most flexible way to define options is to provide an array of objects. The object has the same properties as the `<o-list-item>` component.

<ExampleViewer :component="OptionsArray" :code="OptionsArrayCode" />

#### Grouped options

You can also use the array of objects syntax to create grouped options, wrapping each group of options in an object with a `label` and an `options` property. The object has the same properties as the `<o-list-item>` component.

<ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

### Filterable

The component provides a built-in filtering feature, which can be enabled by adding the `filterable` property. A custom filter function can be defined using the `filter` property. By default, a lowercased label string comparison is performed.

<ExampleViewer :component="Filterable" :code="FilterableCode" />

### Templates

A custom header and footer can be added before and after the options list by using the `header` and `footer` template slots. You can also display content, when no options are visible, either because there are no options or because they are hidden through filtering, using the `empty` template slot.

<ExampleViewer :component="Templates" :code="TemplatesCode" />

### Infinite Scroll & Async Data

<p>
    When having to many options, consider adding a max height using the
    <code>scrollHeight</code> property, which allows to cap the list at a
    fixed <code>max-height</code>. This will render a long list of options
    with a scrollbar. The component will emit a <code>scroll-start</code> or
    <code>scroll-end</code> event, when the top or bottom of the list is
    reached. These events can be used to load more options as needed.
    Consider adding <code>backend-filtering</code> when updating options
    manually in response to changes in the filter value.
</p>
<ExampleViewer :component="Scroll" :code="ScrollCode" />

</section>

<section class="odocs-specs">

## Listbox Component

> Listbox is used to select one or more values from a list of items.

```html
<o-listbox></o-listbox>
```

### Props

| Prop name         | Description                                                                                              | Type                                             | Values                                            | Default                                                                                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation         | Custom animation (transition name)                                                                       | string                                           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>            |
| ariaLabel         | Defines a string value that labels an interactive element.                                               | string                                           | -                                                 |                                                                                                                                                                |
| ariaLabelledby    | Identifier of the underlying input element.                                                              | string                                           | -                                                 |                                                                                                                                                                |
| backendFiltering  | Items won't be filtered on clientside, use the `filter` event to filter in your backend                  | boolean                                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| disabled          | Interaction is disabled                                                                                  | boolean                                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| emptyLabel        | A label which is displayed when no options are visible                                                   | string                                           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;emptyLabel: undefined<br>}</code>        |
| filter            | Custom filter function to filter the items based on the input value - default is label string comparison | ((option: unknown, value: string) =&gt; boolean) | -                                                 |                                                                                                                                                                |
| filterDebounce    | Number of milliseconds to delay the filter event                                                         | number                                           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;filterDebounce: 400<br>}</code>          |
| filterIcon        | Icon of the column search input                                                                          | string                                           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;filterIcon: undefined<br>}</code>        |
| filterPlaceholder | Placeholder of the column search input                                                                   | string                                           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;filterPlaceholder: undefined<br>}</code> |
| filterable        | Enable an additional searchbar below the header                                                          | boolean                                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| iconPack          | Icon pack to use                                                                                         | string                                           | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>          |
| id                | Same as native id. Also pass the id to an wrapping `o-field` component - default is an uuid.             | string                                           | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                                  |
| v-model           | The selected option value, use v-model to make it two-way binding                                        | string\|number\|object                           | -                                                 |                                                                                                                                                                |
| multiple          | Allows multiple selections - converts the `modelValue` into an array                                     | IsMultiple                                       | -                                                 |                                                                                                                                                                |
| options           | Autocomplete options                                                                                     | ListboxOptions&lt;unknown&gt;                    | -                                                 |                                                                                                                                                                |
| override          | Override existing theme classes completely                                                               | boolean                                          | -                                                 |                                                                                                                                                                |
| scrollHeight      | Height of the listbox, a scrollbar is defined if height of list exceeds this value                       | number \| string                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;scrollHeight: "225"<br>}</code>          |
| selectOnFocus     | Select current focused item when focused                                                                 | boolean                                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| selectable        | Enables item selection                                                                                   | boolean                                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                     |

### Events

| Event name         | Properties                                                             | Description                                      |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------------------------ |
| update:model-value | **value** `unknown \| unknown[]` - updated modelValue prop             | modelValue prop two-way binding                  |
| select             | **value** `unknown` - selected value                                   | on select event - fired before update:modelValue |
| filter             | **value** `string` - filter value<br/>**event** `Event` - native event | on filter change event                           |
| focus              | **event** `Event` - native event                                       | on list focus event                              |
| blur               | **event** `Event` - native event                                       | on list blur event                               |
| scroll-start       |                                                                        | scrolling inside the list reached the start      |
| scroll-end         |                                                                        | scrolling inside the list reached the end        |

### Slots

| Name    | Description                                     | Bindings                                                                                                                                                                                               |
| ------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| header  | Define an additional header                     |                                                                                                                                                                                                        |
| filter  | Overridet the filter input                      | **value** `string` - filter input value<br/>**onChange** `(input: string, event: Event): void` - on filter input change event<br/>**onKeydown** `(event: Event): void` - on filter input keydown event |
| default | Define the listbox items here                   |                                                                                                                                                                                                        |
| empty   | Define the content to show if the list is empty |                                                                                                                                                                                                        |
| footer  | Define an additional footer                     |                                                                                                                                                                                                        |

</section>

[//]: # "This file is generated and should not be edited by hand!"

<section class="odocs-specs">

## ListItem Component

> An option item used by the listbox component.

```html
<o-list-item></o-list-item>
```

### Props

| Prop name      | Description                                                                       | Type                   | Values                                            | Default                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaLabel      | Defines a string value that labels an interactive element.                        | string                 | -                                                 |                                                                                                                                                       |
| ariaLabelledby | Identifier of the underlying input element.                                       | string                 | -                                                 |                                                                                                                                                       |
| disabled       | Item is disabled                                                                  | boolean                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| hidden         | Define whether the item is visible or not                                         | boolean                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| icon           | Icon to be shown                                                                  | string                 | -                                                 |                                                                                                                                                       |
| iconPack       | Icon pack to use                                                                  | string                 | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconSize       | Icon size                                                                         | string                 | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code> |
| label          | Item label, unnecessary when default slot is used                                 | string                 | -                                                 |                                                                                                                                                       |
| override       | Override existing theme classes completely                                        | boolean                | -                                                 |                                                                                                                                                       |
| value          | Item value (it will be used as v-model of wrapper component) - default is an uuid | string\|number\|object | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                         |

### Events

| Event name | Properties                                                                 | Description   |
| ---------- | -------------------------------------------------------------------------- | ------------- |
| click      | **value** `unknown` - value prop data<br/>**event** `event` - native event | onclick event |

### Slots

| Name    | Description                               | Bindings                                                                                |
| ------- | ----------------------------------------- | --------------------------------------------------------------------------------------- |
| default | Override the label, default is label prop | **selected** `boolean` - item is selected<br/>**disabled** `boolean` - item is disabled |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-listbox-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                         | Default                                                          |
| ------------------------------------- | ---------------------------------------------------------------- |
| $listbox-disabled-opacity             | h.useVar("control-disabled-opacity")                             |
| $listbox-background-color             | h.useVar("control-background-color")                             |
| $listbox-border-color                 | h.useVar("control-border-color")                                 |
| $listbox-border-style                 | solid                                                            |
| $listbox-border-width                 | h.useVar("control-border-width")                                 |
| $listbox-border-radius                | h.useVar("border-radius")                                        |
| $listbox-item-padding                 | h.useVar("control-spacer") calc(h.useVar("control-spacer") \* 2) |
| $listbox-item-color                   | h.useVar("font-color")                                           |
| $listbox-item-font-size               | h.useVar("font-size")                                            |
| $listbox-item-font-weight             | h.useVar("font-weight")                                          |
| $listbox-item-line-height             | h.useVar("line-height")                                          |
| $listbox-item-background-color        | transparent                                                      |
| $listbox-item-active-color            | h.useVar("primary-invert")                                       |
| $listbox-item-active-background-color | h.useVar("primary")                                              |
| $listbox-item-hover-background-color  | h.useVar("grey-lighter")                                         |
| $listbox-item-hover-color             | h.useVar("font-color")                                           |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_listbox.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                         | Default                                           |
| ------------------------------------- | ------------------------------------------------- |
| $listbox-disabled-opacity             | 0.5                                               |
| $listbox-item-hover-background-color  | css.getVar( "panel-block-hover-background-color") |
| $listbox-item-active-background-color | css.getVar("primary")                             |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_listbox.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable | Default |
| ------------- | ------- |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_listbox.scss)

</div>

</section>

# Listbox

<section class="odocs-head">

The **Listbox** component presents a list of options and allows a user to select one or more of them.
The component implements the W3C ARIA APG [Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).
When assistive technologies present a listbox, the name of an option is calculated by the browser as a flat string.
Therefore, the content of an option should not contain any semantic information, such as a heading.
In addition, assistive technologies does not provide an accessible way to present a list of interactive elements for the listbox role, such as links, buttons, or checkboxes.

</section>

<section class="odocs-examples">

## Examples

<example-listbox />

</section>

<section class="odocs-specs">

## Listbox component

> Listbox is used to select one or more values from a list of items.

```html
<o-listbox></o-listbox>
```

### Props

| Prop name          | Description                                                                                              | Type                                             | Values                                            | Default                                                                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation          | Custom animation (transition name)                                                                       | string                                           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>             |
| ariaLabel          | Defines a string value that labels an interactive element.                                               | string                                           | -                                                 |                                                                                                                                                                 |
| ariaLabelledby     | Identifier of the underlying input element.                                                              | string                                           | -                                                 |                                                                                                                                                                 |
| backendFiltering   | Items won't be filtered on clientside, use the `filter` event to filter in your backend                  | boolean                                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                     |
| disabled           | Interaction is disabled                                                                                  | boolean                                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                     |
| filter             | Custom filter function to filter the items based on the input value - default is label string comparison | ((option: unknown, value: string) =&gt; boolean) | -                                                 |                                                                                                                                                                 |
| filterDebounce     | Number of milliseconds to delay the filter event                                                         | number                                           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;filterDebounce: 400<br>}</code>           |
| filterable         | Enable an additional searchbar below the header                                                          | boolean                                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                     |
| filtersIcon        | Icon of the column search input                                                                          | string                                           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;filtersIcon: undefined<br>}</code>        |
| filtersPlaceholder | Placeholder of the column search input                                                                   | string                                           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;filtersPlaceholder: undefined<br>}</code> |
| iconPack           | Icon pack to use                                                                                         | string                                           | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>           |
| itemTag            | List item tag name                                                                                       | DynamicComponent                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;itemTag: "li"<br>}</code>                 |
| listTag            | List tag name                                                                                            | DynamicComponent                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;listTag: "ul"<br>}</code>                 |
| v-model            | The selected option value, use v-model to make it two-way binding                                        | string\|number\|object                           | -                                                 |                                                                                                                                                                 |
| multiple           | Allows multiple selections - converts the `modelValue` into an array                                     | boolean                                          | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                          |
| options            | Autocomplete options                                                                                     | OptionsPropWithGroups&lt;unknown&gt;             | -                                                 |                                                                                                                                                                 |
| override           | Override existing theme classes completely                                                               | boolean                                          | -                                                 |                                                                                                                                                                 |
| scrollHeight       | Height of the listbox, a scrollbar is defined if height of list exceeds this value                       | number \| string                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>listbox: {<br>&nbsp;&nbsp;scrollHeight: "225"<br>}</code>           |
| selectOnFocus      | Select current focused item when focused                                                                 | boolean                                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                     |
| selectable         | Enables item selection                                                                                   | boolean                                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                      |

### Events

| Event name         | Properties                                                             | Description                                      |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------------------------ |
| update:model-value | **value** `T \| T[]` - updated modelValue prop                         | modelValue prop two-way binding                  |
| select             | **value** `T` - selected value                                         | on select event - fired before update:modelValue |
| filter             | **value** `string` - filter value<br/>**event** `Event` - native event | on filter change event                           |
| focus              | **event** `Event` - native event                                       | on list focus event                              |
| blur               | **event** `Event` - native event                                       | on list blur event                               |
| scroll-start       |                                                                        | scrolling the list reached the start             |
| scroll-end         |                                                                        | scrolling the list inside reached it's end       |

### Slots

| Name        | Description                               | Bindings                                                                                                                                                                |
| ----------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| header      | Define an additional header               |                                                                                                                                                                         |
| filterable  |                                           |                                                                                                                                                                         |
| default     | Place items here                          |                                                                                                                                                                         |
| optiongroup | Override the option group                 | **group** `object` - options group item<br/>**index** `number` - group option index                                                                                     |
| option      | Override the label, default is label prop | **option** `object` - option item<br/>**index** `number` - option index<br/>**selected** `boolean` - option is selected<br/>**disabled** `boolean` - option is disabled |
| empty       | Define content for empty state            |                                                                                                                                                                         |
| footer      | Define an additional footer               |                                                                                                                                                                         |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-listbox-viewer />

</section>

<section class="odocs-style">

## Sass variables

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

<p>The theme does not have any custom variables for this component.</p>
</div>

</section>

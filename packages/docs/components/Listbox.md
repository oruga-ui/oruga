# Listbox

<section class="odocs-head">
<Badge type="warning" text="experimental" />

The **Listbox** component presents a list of options and allows a user to select one or more of them.
The component implements the W3C ARIA APG [Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).
Combine it with the [Field](/components/Field) component to access all functionalities.

</section>

<section class="odocs-examples">

## Examples

<example-listbox />

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
| multiple          | Allows multiple selections - converts the `modelValue` into an array                                     | boolean                                          | -                                                 |                                                                                                                                                                |
| options           | Autocomplete options                                                                                     | OptionsPropWithGroups&lt;unknown&gt;             | -                                                 |                                                                                                                                                                |
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

<section class="odocs-classes">

## Class Inspector

<inspector-listbox-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                         | Default                                                                      |
| ------------------------------------- | ---------------------------------------------------------------------------- |
| $listbox-disabled-opacity             | h.useVar("control-disabled-opacity")                                         |
| $listbox-box-shadow                   | 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02) |
| $listbox-background-color             | h.useVar("control-brackground-color")                                        |
| $listbox-border-color                 | h.useVar("control-border-color")                                             |
| $listbox-border-style                 | solid                                                                        |
| $listbox-border-width                 | h.useVar("control-border-width")                                             |
| $listbox-border-radius                | h.useVar("border-radius")                                                    |
| $listbox-item-padding                 | h.useVar("control-spacer") calc(h.useVar("control-spacer") \* 2)             |
| $listbox-item-color                   | h.useVar("font-color")                                                       |
| $listbox-item-font-size               | h.useVar("font-size")                                                        |
| $listbox-item-font-weight             | h.useVar("font-weight")                                                      |
| $listbox-item-line-height             | h.useVar("line-height")                                                      |
| $listbox-item-background-color        | transparent                                                                  |
| $listbox-item-active-color            | h.useVar("primary-invert")                                                   |
| $listbox-item-active-background-color | h.useVar("primary")                                                          |
| $listbox-item-hover-background-color  | h.useVar("grey-lighter")                                                     |
| $listbox-item-hover-color             | h.useVar("font-color")                                                       |

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

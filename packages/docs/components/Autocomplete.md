# Autocomplete

<div class="vp-doc">

The **Autocomplete** input component allows you to search through a list of options.
It is an advanced input that provides suggestions as the user types.
Based on the Dropdown component, the Autocomplete component implements the W3C ARIA APG [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

</div>

<div class="vp-example">

## Examples

<example-autocomplete />

</div>

<div class="vp-doc">

## Autocomplete component

> Extended input that provide suggestions while the user types.

```html
<o-autocomplete></o-autocomplete>
```

### Props

| Prop name          | Description                                                                                                                                                                      | Type                                                                   | Values                                            | Default                                                                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active             | The active state of the dropdown, use v-model:active to make it two-way binding                                                                                                  | boolean                                                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| animation          | Transition name to apply on dropdown list                                                                                                                                        | string                                                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>         |
| autocomplete       | Native options to use in HTML5 validation                                                                                                                                        | string                                                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>       |
| checkScroll        | Makes the component check if list reached scroll start or end and emit scroll events.                                                                                            | boolean                                                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;checkScroll: false<br>}</code>        |
| clearIcon          | Icon name to be added on the clear button                                                                                                                                        | string                                                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;clearIcon: "close-circle"<br>}</code> |
| clearOnSelect      | Clear input text on select                                                                                                                                                       | boolean                                                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;clearOnSelect: false<br>}</code>      |
| clearable          | Add a button/icon to clear the inputed text                                                                                                                                      | boolean                                                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;clearable: false<br>}</code>          |
| customValidity     | Custom HTML 5 validation error to set on the form control                                                                                                                        | string \| ((currentValue: unknown, state: ValidityState) =&gt; string) | -                                                 |                                                                                                                                                                  |
| debounce           | Number of milliseconds to delay before to emit input event                                                                                                                       | number                                                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;debounce: 400<br>}</code>             |
| desktopModal       | Dropdown content (items) are shown into a modal on desktop                                                                                                                       | boolean                                                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;desktopModal: false<br>}</code>           |
| disabled           | Same as native input disabled                                                                                                                                                    | boolean                                                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| expanded           | Makes input full width when inside a grouped or addon field                                                                                                                      | boolean                                                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| filter             | Function to filter the option based on the input value - default is label string comparison                                                                                      | ((option: unknown, value: string) =&gt; boolean)                       | -                                                 |                                                                                                                                                                  |
| icon               | Icon to be shown                                                                                                                                                                 | string                                                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>           |
| iconClickable      | Makes the icon clickable                                                                                                                                                         | boolean                                                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| iconPack           | Icon pack to use                                                                                                                                                                 | string                                                                 | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>       |
| iconRight          | Icon to be added on the right side                                                                                                                                               | string                                                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>      |
| iconRightClickable | Make the icon right clickable                                                                                                                                                    | boolean                                                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| iconRightVariant   | Variant of right icon                                                                                                                                                            | string                                                                 | -                                                 |                                                                                                                                                                  |
| input              | The value of the inner input, use v-model:input to make it two-way binding                                                                                                       | string                                                                 | -                                                 | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                         |
| itemTag            | Menu item tag name                                                                                                                                                               | DynamicComponent                                                       | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;itemTag: "div"<br>}</code>            |
| keepFirst          | The first option will always be focused (easier to just hit enter or tab)                                                                                                        | boolean                                                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;keepFirst: false<br>}</code>          |
| keepOpen           | Keep open dropdown list after select                                                                                                                                             | boolean                                                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;keepOpen: false<br>}</code>           |
| maxHeight          | Max height of dropdown content                                                                                                                                                   | number \| string                                                       | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;maxHeight: undefined<br>}</code>      |
| maxlength          | Same as native maxlength, plus character counter                                                                                                                                 | number \| string                                                       | -                                                 |                                                                                                                                                                  |
| menuTag            | Menu tag name                                                                                                                                                                    | DynamicComponent                                                       | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;menuTag: "div"<br>}</code>            |
| mobileModal        | Dropdown content (items) are shown into a modal on mobile                                                                                                                        | boolean                                                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;mobileModal: false<br>}</code>        |
| v-model            | The selected option value, use v-model to make it two-way binding                                                                                                                | string\|number\|object                                                 | -                                                 |                                                                                                                                                                  |
| openOnFocus        | Open dropdown list on focus                                                                                                                                                      | boolean                                                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;openOnFocus: false<br>}</code>        |
| options            | Autocomplete options                                                                                                                                                             | OptionsPropWithGroups&lt;unknown&gt;                                   | -                                                 |                                                                                                                                                                  |
| override           | Override existing theme classes completely                                                                                                                                       | boolean                                                                | -                                                 |                                                                                                                                                                  |
| placeholder        | Input placeholder                                                                                                                                                                | string                                                                 | -                                                 |                                                                                                                                                                  |
| position           | Position of the dropdown                                                                                                                                                         | "auto" \| "bottom" \| "top"                                            | `auto`, `top`, `bottom`                           | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;position: "auto"<br>}</code>          |
| rounded            | Makes the element rounded                                                                                                                                                        | boolean                                                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| selectOnClose      | Trigger the select event for focused option when drodpown got closed                                                                                                             | boolean                                                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| selectableFooter   | Allows the footer in the autocomplete to be selectable                                                                                                                           | boolean                                                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| selectableHeader   | Allows the header in the autocomplete to be selectable                                                                                                                           | boolean                                                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| size               | Size of the input control                                                                                                                                                        | string                                                                 | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| statusIcon         | Show status icon using field and variant prop                                                                                                                                    | boolean                                                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;statusIcon: true<br>}</code>                        |
| teleport           | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean \| object \| string                                            | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;teleport: false<br>}</code>           |
| type               | Input type                                                                                                                                                                       | string                                                                 | -                                                 | <code style='white-space: nowrap; padding: 0;'>"text"</code>                                                                                                     |
| useHtml5Validation | Enable HTML 5 native validation                                                                                                                                                  | boolean                                                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                |

### Events

| Event name         | Properties                                                            | Description                                    |
| ------------------ | --------------------------------------------------------------------- | ---------------------------------------------- |
| update:model-value | **value** `T` - updated modelValue prop                               | modelValue prop two-way binding                |
| update:input       | **value** `string` - updated input prop                               | input prop two-way binding                     |
| update:active      | **value** `boolean` - updated active prop                             | active prop two-way binding                    |
| input              | **value** `string` - input value<br/>**event** `Event` - native event | on input change event                          |
| select             | **value** `T` - selected value                                        | selected element changed event                 |
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

| Name    | Description                    | Bindings                                                                                                         |
| ------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| header  | Define an additional header    |                                                                                                                  |
| group   | Override the option group      | **group** `object` - options group<br/>**index** `number` - option index                                         |
| default | Override the select option     | **option** `object` - option object<br/>**value** `unknown` - option value<br/>**index** `number` - option index |
| empty   | Define content for empty state |                                                                                                                  |
| footer  | Define an additional footer    |                                                                                                                  |

</div>

<div class="vp-example">

## Class Inspector

<inspector-autocomplete-viewer />

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                             | Default |
| ----------------------------------------- | ------- |
| $autocomplete-item-hover-background-color | #f5f5f5 |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_autocomplete.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                | Default |
| ---------------------------- | ------- |
| $dropdown-content-max-height | 200px   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_autocomplete.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                 | Default |
| ----------------------------- | ------- |
| $autocomplete-menu-max-height | 200px   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_autocomplete.scss)

</div>

</div>

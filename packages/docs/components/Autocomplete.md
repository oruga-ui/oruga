# Autocomplete

<div class="vp-doc">

> Extended input that provide suggestions while the user types

</div>

<div class="vp-example">

## Examples

<example-autocomplete />

</div>
<div class="vp-example">

## Class props

<inspector-autocomplete-viewer />

</div>

<div class="vp-doc">

## Autocomplete component

> Extended input that provide suggestions while the user types

```html
<o-autocomplete></o-autocomplete>
```

### Props

| Prop name            | Description | Type | Values | Default                                                                                                                                                             |
| -------------------- | ----------- | ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>            |
| autocomplete         |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>          |
| checkScroll          |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;checkScroll: false<br>}</code>           |
| clearIcon            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;clearIcon: "close-circle"<br>}</code>    |
| clearOnSelect        |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;clearOnSelect: false<br>}</code>         |
| clearable            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;clearable: false<br>}</code>             |
| confirmKeys          |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;confirmKeys: ["Tab","Enter"]<br>}</code> |
| customValidity       |             |      | -      |                                                                                                                                                                     |
| debounce             |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;debounce: 400<br>}</code>                |
| disabled             |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| expanded             |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| filter               |             |      | -      |                                                                                                                                                                     |
| icon                 |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>              |
| iconClickable        |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| iconPack             |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>          |
| iconRight            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>         |
| iconRightClickable   |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| iconRightVariant     |             |      | -      |                                                                                                                                                                     |
| input                |             |      | -      | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                            |
| itemTag              |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;itemTag: "div"<br>}</code>               |
| keepFirst            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;keepFirst: false<br>}</code>             |
| keepOpen             |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;keepOpen: false<br>}</code>              |
| maxHeight            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;maxHeight: undefined<br>}</code>         |
| maxlength            |             |      | -      |                                                                                                                                                                     |
| menuTag              |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;menuTag: "div"<br>}</code>               |
| mobileModal          |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;mobileModal: false<br>}</code>           |
| v-model              |             |      | -      |                                                                                                                                                                     |
| openOnFocus          |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;openOnFocus: false<br>}</code>           |
| options              |             |      | -      |                                                                                                                                                                     |
| override             |             |      | -      |                                                                                                                                                                     |
| placeholder          |             |      | -      |                                                                                                                                                                     |
| position             |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;position: "auto"<br>}</code>             |
| rounded              |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| selectOnClickOutside |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| selectableFooter     |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| selectableHeader     |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| size                 |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;size: undefined<br>}</code>              |
| statusIcon           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;statusIcon: true<br>}</code>                           |
| teleport             |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;teleport: false<br>}</code>              |
| type                 |             |      | -      | <code style='white-space: nowrap; padding: 0;'>"text"</code>                                                                                                        |
| useHtml5Validation   |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                   |

### Events

| Event name        | Properties                                             | Description                                    |
| ----------------- | ------------------------------------------------------ | ---------------------------------------------- |
| icon-click        | **event** `Event` - native event                       | on icon click event                            |
| update:modelValue | **value** `string \| object` - updated modelValue prop | modelValue prop two-way binding                |
| update:input      | **value** `string` - updated input prop                | input prop two-way binding                     |
| input             | **value** `string` - input value                       | on input change event                          |
| select            | **value** `string \| object` - selected value          | selected element changed event                 |
| select-header     | **event** `Event` - native event                       | header is selected                             |
| select-footer     | **event** `Event` - native event                       | footer is selected                             |
| focus             | **event** `Event` - native event                       | on input focus event                           |
| blur              | **event** `Event` - native event                       | on input blur event                            |
| invalid           | **event** `Event` - native event                       | on input invalid event                         |
| icon-right-click  | **event** `Event` - native event                       | on icon right click event                      |
| scroll-start      |                                                        | the list inside the dropdown reached the start |
| scroll-end        |                                                        | the list inside the dropdown reached it's end  |

### Slots

| Name    | Description                    | Bindings                                                                                                         |
| ------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| header  | Define an additional header    |                                                                                                                  |
| group   | Override the option grpup      | **group** `object` - options group<br/>**index** `number` - option index                                         |
| default | Override the select option     | **option** `object` - option object<br/>**value** `unknown` - option value<br/>**index** `number` - option index |
| empty   | Define content for empty state |                                                                                                                  |
| footer  | Define an additional footer    |                                                                                                                  |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                             | Default |
| ----------------------------------------- | ------- |
| $autocomplete-item-hover-background-color | #f5f5f5 |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_autocomplete.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                | Default |
| ---------------------------- | ------- |
| $dropdown-content-max-height | 200px   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_autocomplete.scss)

</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                 | Default |
| ----------------------------- | ------- |
| $autocomplete-menu-max-height | 200px   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_autocomplete.scss)

</div>

</div>

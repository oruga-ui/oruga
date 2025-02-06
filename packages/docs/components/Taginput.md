# Taginput

<div class="vp-doc">

The **taginput** component allows users to search through a list of options and apply any number of tags.
The component is based on the autocomplete component and supports the W3C ARIA APG [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

</div>

<div class="vp-example">

## Examples

<example-taginput />

</div>

<div class="vp-example">

## Class props

<inspector-taginput-viewer />

</div>

<div class="vp-doc">

## Taginput component

> A simple tag input field that can have autocomplete functionality.

```html
<o-taginput></o-taginput>
```

### Props

| Prop name          | Description                                                                                                                                                                      | Type                                                                                           | Values                                                                          | Default                                                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| allowDuplicates    | Allows adding the same item multiple time                                                                                                                                        | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;allowDuplicates: false<br>}</code>          |
| allowNew           | Allows adding new items                                                                                                                                                          | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;allowNew: false<br>}</code>                 |
| ariaCloseLabel     | Accessibility label for the close button                                                                                                                                         | string                                                                                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;ariaCloseLabel: "Remove"<br>}</code>        |
| autocomplete       | Native options to use in HTML5 validation                                                                                                                                        | string                                                                                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>             |
| checkScroll        | Makes the component check if list reached scroll start or end and emit scroll events.                                                                                            | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;checkScroll: false<br>}</code>              |
| closable           | Add close/delete button to the item                                                                                                                                              | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;closable: true<br>}</code>                  |
| closeIcon          | Icon name of close icon on selected item                                                                                                                                         | string                                                                                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>              |
| counter            | Show counter when maxlength or maxtags props are passed                                                                                                                          | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;counter: true<br>}</code>                   |
| createItem         | Function to create a new item to push into v-model (items)                                                                                                                       | ((value: unknown) =&gt; unknown)                                                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>item as T</code>                                                                                                    |
| customValidity     | Custom HTML 5 validation error to set on the form control                                                                                                                        | string \| ((currentValue: unknown[] \| null , state: ValidityState) =&gt; string) \| undefined | -                                                                               |                                                                                                                                                                    |
| disabled           | Same as native input disabled                                                                                                                                                    | boolean                                                                                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                        |
| expanded           | Makes input full width when inside a grouped or addon field                                                                                                                      | boolean                                                                                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                        |
| filter             | Function to filter the options based on the input value - default is label string comparison                                                                                     | ((options: unknown, value: string) =&gt; boolean)                                              | -                                                                               |                                                                                                                                                                    |
| icon               | Icon to be shown                                                                                                                                                                 | string                                                                                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>                 |
| iconPack           | Icon pack to use                                                                                                                                                                 | string                                                                                         | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>             |
| input              | The value of the inner input, use v-model:input to make it two-way binding                                                                                                       | string                                                                                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                           |
| keepFirst          | The first option will always be pre-selected (easier to just hit enter or tab)                                                                                                   | boolean                                                                                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                        |
| keepOpen           | Keep open dropdown list after select                                                                                                                                             | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;keepOpen: false<br>}</code>                 |
| maxitems           | Limits the number of items, plus item counter                                                                                                                                    | number \| string                                                                               | -                                                                               |                                                                                                                                                                    |
| maxlength          | Same as native maxlength, plus character counter                                                                                                                                 | number \| string                                                                               | -                                                                               |                                                                                                                                                                    |
| v-model            | The selected items, use v-model to make it two-way binding binding                                                                                                               | unknown[]                                                                                      | -                                                                               |                                                                                                                                                                    |
| openOnFocus        | Opens a dropdown with choices when the input field is focused                                                                                                                    | boolean                                                                                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                        |
| options            | Taginput options                                                                                                                                                                 | OptionsPropWithGroups&lt;unknown&gt;                                                           | -                                                                               |                                                                                                                                                                    |
| override           | Override existing theme classes completely                                                                                                                                       | boolean                                                                                        | -                                                                               |                                                                                                                                                                    |
| placeholder        | Input placeholder                                                                                                                                                                | string                                                                                         | -                                                                               |                                                                                                                                                                    |
| removeOnKeys       | Allow removing last item when pressing given keys<br/>(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values),<br/>if input is empty                     | string[]                                                                                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;removeOnKeys: ["Backspace"]<br>}</code>     |
| separators         | Array of chars used to split when pasting a new string                                                                                                                           | string[]                                                                                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;separators: [",","Enter","Tab"]<br>}</code> |
| size               | Vertical size of the input control                                                                                                                                               | string                                                                                         | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;size: undefined<br>}</code>                 |
| teleport           | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean \| object \| string                                                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                 |
| useHtml5Validation | Enable HTML 5 native validation                                                                                                                                                  | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                  |
| validateItem       | Function to validate the value of a new item before it got added                                                                                                                 | ((value: unknown) =&gt; boolean)                                                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                         |
| variant            | Color of the each item                                                                                                                                                           | string                                                                                         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>              |

### Events

| Event name         | Properties                                                             | Description                                    |
| ------------------ | ---------------------------------------------------------------------- | ---------------------------------------------- |
| scroll-start       |                                                                        | the list inside the dropdown reached the start |
| scroll-end         |                                                                        | the list inside the dropdown reached it's end  |
| icon-click         | **event** `Event` - native event                                       | on icon click event                            |
| icon-right-click   | **event** `Event` - native event                                       | on icon right click event                      |
| update:model-value | **value** `string[] \| number[] \| object[]` - updated modelValue prop | modelValue prop two-way binding                |
| update:input       | **value** `string` - updated input prop                                | input prop two-way binding                     |
| input              | **value** `string` - input value<br/>**event** `Event` - native event  | on input change event                          |
| add                | **value** `string \| number \| object` - added item                    | new item got added                             |
| remove             | **value** `string \| number \| object` - removed item                  | item got removed                               |
| focus              | **event** `Event` - native event                                       | on input focus event                           |
| blur               | **event** `Event` - native event                                       | on input blur event                            |
| invalid            | **event** `Event` - native event                                       | on input invalid event                         |

### Slots

| Name     | Description                    | Bindings                                                                                                         |
| -------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| selected | Override selected items        | **items** `(string, object)[]` - selected items<br/>**options** `object[]` - selected options<br/>               |
| header   | Define an additional header    |                                                                                                                  |
| default  | Override the select option     | **option** `object` - option object<br/>**index** `number` - option index<br/>**value** `unknown` - option value |
| empty    | Define content for empty state |                                                                                                                  |
| footer   | Define an additional footer    |                                                                                                                  |
| counter  | Override the counter           | **items** `number` - items count<br/>**total** `number` - total count                                            |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                   | Default                             |
| ------------------------------- | ----------------------------------- |
| $taginput-counter-font-size     | 0.75rem                             |
| $taginput-counter-margin        | 0.25rem 0 0 0.5rem                  |
| $taginput-item-background-color | var(--#{$prefix}primary)            |
| $taginput-item-color            | var(--#{$prefix}primary-invert)     |
| $taginput-item-border-radius    | var(--#{$prefix}base-border-radius) |
| $taginput-item-margin           | 0.275em                             |
| $taginput-item-padding          | 0 0.75em 0 0.75em                   |
| $taginput-margin-icon-to-text   | 0.1875em                            |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_taginput.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable      | Default |
| ------------------ | ------- |
| $taginput-height   | 2em     |
| $taginput-tag-size | 0.9em   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_taginput.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable               | Default            |
| --------------------------- | ------------------ |
| $taginput-badge-bg          | $light             |
| $taginput-badge-color       | $dark              |
| $taginput-badge-font-size   | 0.9em              |
| $taginput-badge-margin      | 0.25em             |
| $taginput-badge-icon-space  | 0.25em             |
| $taginput-counter-margin    | 0.25rem 0 0 0.5rem |
| $taginput-counter-font-size | 0.75rem            |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_taginput.scss)

</div>

</div>

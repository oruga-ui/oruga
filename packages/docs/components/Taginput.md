---
title: Taginput
---

# Taginput

<div class="vp-doc">

> A simple tag input field that can have autocomplete functionality

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

> A simple tag input field that can have autocomplete functionality

```html
<o-taginput></o-taginput>
```

### Props

| Prop name          | Description                                                                                                                                                                      | Type                               | Values                                                                          | Default                                                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowAutocomplete  | Add autocomplete feature (if true, any Autocomplete props may be used too)                                                                                                       | boolean                            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| allowDuplicates    | Allows adding the same item multiple time                                                                                                                                        | boolean                            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| allowNew           | When autocomplete, it allow to add new items                                                                                                                                     | boolean                            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| ariaCloseLabel     | Accessibility label for the close button                                                                                                                                         | string                             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;ariaCloseLabel: undefined<br>}</code>        |
| autocomplete       | Native options to use in HTML5 validation                                                                                                                                        | string                             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>              |
| beforeAdding       | Function to validate the value of the item before adding                                                                                                                         | (value: T \| string) =&gt; boolean | -                                                                               | Default function (see source code)                                                                                                                                  |
| checkScroll        | Makes the component check if list reached scroll start or end and emit scroll events.                                                                                            | boolean                            | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;checkScroll: false<br>}</code>               |
| closable           | Add close/delete button to the item                                                                                                                                              | boolean                            | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;closable: true<br>}</code>                   |
| closeIcon          | Icon name of close icon on selected item                                                                                                                                         | string                             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>               |
| confirmKeys        | Array of keys<br/>(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)<br/>which will add a item when typing                                          | string[]                           | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;confirmKeys: [",","Tab","Enter"]<br>}</code> |
| counter            | Show counter when maxlength or maxtags props are passed                                                                                                                          | boolean                            | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;counter: true<br>}</code>                    |
| createItem         | Function to create a new item to push into v-model (items)                                                                                                                       | (value: T \| string) =&gt; T       | -                                                                               | Default function (see source code)                                                                                                                                  |
| data               | Items data                                                                                                                                                                       | T[]                                | -                                                                               | Default function (see source code)                                                                                                                                  |
| disabled           | Same as native input disabled                                                                                                                                                    | boolean                            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| expanded           | Makes input full width when inside a grouped or addon field                                                                                                                      | boolean                            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| field              | Property of the object (if data is array of objects) to use as display text                                                                                                      | string                             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>"value"</code>                                                                                                       |
| groupField         | Property of the object (if `data` is array of objects) to use as display text of group                                                                                           | string                             | -                                                                               |                                                                                                                                                                     |
| groupOptions       | Property of the object (if `data` is array of objects) to use as key to get items array of each group                                                                            | string                             | -                                                                               |                                                                                                                                                                     |
| icon               | Icon to be shown                                                                                                                                                                 | string                             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>                  |
| iconPack           | Icon pack to use                                                                                                                                                                 | string                             | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>              |
| keepFirst          | The first option will always be pre-selected (easier to just hit enter or tab)                                                                                                   | boolean                            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| keepOpen           | Keep open dropdown list after select                                                                                                                                             | boolean                            | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;keepOpen: false<br>}</code>              |
| maxitems           | Limits the number of items, plus item counter                                                                                                                                    | string\|number                     | -                                                                               |                                                                                                                                                                     |
| maxlength          | Same as native maxlength, plus character counter                                                                                                                                 | string\|number                     | -                                                                               |                                                                                                                                                                     |
| openOnFocus        | Opens a dropdown with choices when the input field is focused                                                                                                                    | boolean                            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| override           | Override existing theme classes completely                                                                                                                                       | boolean                            | -                                                                               |                                                                                                                                                                     |
| placeholder        | Input placeholder                                                                                                                                                                | string                             | -                                                                               |                                                                                                                                                                     |
| removeOnKeys       | Allow removing last item when pressing given keys, if input is empty                                                                                                             | string[]                           | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;removeOnKeys: ["Backspace"]<br>}</code>      |
| separators         | Array of chars used to split when pasting a new string                                                                                                                           | string[]                           | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;separators: [","]<br>}</code>                |
| size               | Vertical size of the input control                                                                                                                                               | string                             | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;size: undefined<br>}</code>                  |
| teleport           | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean\|string\|object            | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                  |
| useHtml5Validation | Enable html 5 native validation                                                                                                                                                  | boolean                            | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                   |
| v-model            |                                                                                                                                                                                  | T[]                                | -                                                                               | Default function (see source code)                                                                                                                                  |
| validationMessage  | The message which is shown when a validation error occurs                                                                                                                        | string                             | -                                                                               |                                                                                                                                                                     |
| variant            | Color of the each item                                                                                                                                                           | string                             | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>               |

### Events

| Event name        | Properties                                                           | Description                                    |
| ----------------- | -------------------------------------------------------------------- | ---------------------------------------------- |
| scroll-start      |                                                                      | the list inside the dropdown reached the start |
| scroll-end        |                                                                      | the list inside the dropdown reached it's end  |
| icon-click        | **event** `Event` - native event                                     | on icon click event                            |
| icon-right-click  | **event** `Event` - native event                                     | on icon right click event                      |
| update:modelValue | **value** `(string \| number \| object)[]` - updated modelValue prop | modelValue prop two-way binding                |
| input             | **value** `String` - input value                                     | on input change event                          |
| add               | **value** `string \| number \| object` - added item                  | new item got added                             |
| remove            | **value** `string \| number \| object` - removed item                | item got removed                               |
| focus             | **event** `Event` - native event                                     | on input focus event                           |
| blur              | **event** `Event` - native event                                     | on input blur event                            |
| invalid           | **event** `Event` - native event                                     | on input invalid event                         |

### Slots

| Name     | Description                    | Bindings                                                                                                         |
| -------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| selected | Override selected items        | **items** `unknown[]` - selected items<br/>                                                                      |
| header   | Define an additional header    |                                                                                                                  |
| default  | Override the select option     | **option** `object` - option object<br/>**index** `number` - option index<br/>**value** `unknown` - option value |
| empty    | Define content for empty state |                                                                                                                  |
| footer   | Define an additional footer    |                                                                                                                  |
| counter  | Override the counter           | **items** `number` - items count<br/>**total** `number` - total count                                            |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                   | Default                              |
| ------------------------------- | ------------------------------------ |
| $taginput-background-color      | $input-background-color              |
| $taginput-height                | calc(2em - 1px)                      |
| $taginput-padding               | calc(0.275em - 1px) 0 0              |
| $taginput-border-color          | $grey-lighter                        |
| $taginput-border-style          | solid                                |
| $taginput-border-width          | 1px                                  |
| $taginput-border-radius         | $base-border-radius                  |
| $taginput-color                 | #363636                              |
| $taginput-line-height           | $base-line-height                    |
| $taginput-box-shadow            | inset 0 1px 2px hsla(0, 0%, 4%, 0.1) |
| $taginput-max-width             | 100%                                 |
| $taginput-width                 | 100%                                 |
| $taginput-counter-font-size     | 0.75rem                              |
| $taginput-counter-margin        | 0.25rem 0 0 0.5rem                   |
| $taginput-item-background-color | $primary                             |
| $taginput-item-color            | $primary-invert                      |
| $taginput-item-border-radius    | $base-border-radius                  |
| $taginput-item-margin           | 0 0 0 0.275em                        |
| $taginput-item-padding          | 0 0.75em 0 0.75em                    |
| $taginput-margin-icon-to-text   | 0.1875em                             |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_taginput.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                   | Default                              |
| ------------------------------- | ------------------------------------ |
| $taginput-background-color      | $input-background-color              |
| $taginput-height                | calc(2em - 1px)                      |
| $taginput-padding               | calc(0.275em - 1px) 0 0              |
| $taginput-border-color          | $grey-lighter                        |
| $taginput-border-style          | solid                                |
| $taginput-border-width          | 1px                                  |
| $taginput-border-radius         | $base-border-radius                  |
| $taginput-color                 | #363636                              |
| $taginput-line-height           | $base-line-height                    |
| $taginput-box-shadow            | inset 0 1px 2px hsla(0, 0%, 4%, 0.1) |
| $taginput-max-width             | 100%                                 |
| $taginput-width                 | 100%                                 |
| $taginput-counter-font-size     | 0.75rem                              |
| $taginput-counter-margin        | 0.25rem 0 0 0.5rem                   |
| $taginput-item-background-color | $primary                             |
| $taginput-item-color            | $primary-invert                      |
| $taginput-item-border-radius    | $base-border-radius                  |
| $taginput-item-margin           | 0 0 0 0.275em                        |
| $taginput-item-padding          | 0 0.75em 0 0.75em                    |
| $taginput-margin-icon-to-text   | 0.1875em                             |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_taginput.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

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

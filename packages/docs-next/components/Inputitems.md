---
title: Inputitems
---

# Inputitems

<div class="vp-doc">

> A simple item input field that can have autocomplete functionality

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-inputitems />

</div>
<div class="vp-example">

## Class props

<inspector-inputitems-viewer />

</div>

<div class="vp-doc">

## Inputitems component

```html
<o-inputitems></o-inputitems>
```

### Props

| Prop name           | Description                                                                                                                                                            | Type           | Values                                                                          | Default                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| allowAutocomplete   | Add autocomplete feature (if true, any Autocomplete props may be used too)                                                                                             | boolean        | -                                                                               |                                                                                                                                                                          |
| allowDuplicates     | Allows adding the same item multiple time                                                                                                                              | boolean        | -                                                                               | false                                                                                                                                                                    |
| allowNew            | When autocomplete, it allow to add new items                                                                                                                           | boolean        | -                                                                               |                                                                                                                                                                          |
| appendToBody        | Append autocomplete content to body                                                                                                                                    | boolean        | -                                                                               |                                                                                                                                                                          |
| ariaCloseLabel      | Accessibility label for the close button                                                                                                                               | string         | -                                                                               |                                                                                                                                                                          |
| autocomplete        | Native options to use in HTML5 validation                                                                                                                              | string         | -                                                                               |                                                                                                                                                                          |
| beforeAdding        | Function to validate the value of the item before adding                                                                                                               | func           | -                                                                               | Default function (see source code)                                                                                                                                       |
| checkInfiniteScroll | Makes the autocomplete component check if list reached scroll end and emit infinite-scroll event                                                                       | boolean        | -                                                                               | false                                                                                                                                                                    |
| closable            | Add close/delete button to the item                                                                                                                                    | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;closable: true<br>}</code>                     |
| closeIcon           | Icon name of close icon on selected item                                                                                                                               | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;closeIcon: 'close'<br>}</code>                 |
| confirmKeys         | Array of keys<br/>(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)<br/>which will add a item when typing (default comma, tab and enter) | array          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;confirmKeys: [',', 'Tab', 'Enter']<br>}</code> |
| createItem          | Function to create a new item to push into v-model (items)                                                                                                             | func           | -                                                                               | Default function (see source code)                                                                                                                                       |
| data                | Items data                                                                                                                                                             | array          | -                                                                               | []                                                                                                                                                                       |
| disabled            | Input will be disabled                                                                                                                                                 | boolean        | -                                                                               |                                                                                                                                                                          |
| expanded            | Makes input full width when inside a grouped or addon field                                                                                                            | boolean        | -                                                                               |                                                                                                                                                                          |
| field               | Property of the object (if data is array of objects) to use as display text                                                                                            | string         | -                                                                               | 'value'                                                                                                                                                                  |
| groupField          | Property of the object (if data is array of objects) to use as display text of group                                                                                   | string         | -                                                                               |                                                                                                                                                                          |
| groupOptions        | Property of the object (if data is array of objects) to use as key to get items array of each group, optional                                                          | string         | -                                                                               |                                                                                                                                                                          |
| hasCounter          | Show counter when maxlength or maxtags props are passed                                                                                                                | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;hasCounter: true<br>}</code>                   |
| icon                | Icon name to be added                                                                                                                                                  | string         | -                                                                               |                                                                                                                                                                          |
| iconPack            | Icon pack to use                                                                                                                                                       | string         | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                                                                                                                                          |
| keepFirst           | The first option will always be pre-selected (easier to just hit enter or tab)                                                                                         | boolean        | -                                                                               |                                                                                                                                                                          |
| maxitems            | Limits the number of items, plus item counter                                                                                                                          | number\|string | -                                                                               |                                                                                                                                                                          |
| maxlength           | Same as native maxlength, plus character counter                                                                                                                       | number\|string | -                                                                               |                                                                                                                                                                          |
| onPasteSeparators   | Array of chars used to split when pasting a new string                                                                                                                 | array          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;onPasteSeparators: [',']<br>}</code>           |
| openOnFocus         | Opens a dropdown with choices when the input field is focused                                                                                                          | boolean        | -                                                                               |                                                                                                                                                                          |
| override            |                                                                                                                                                                        | boolean        | -                                                                               |                                                                                                                                                                          |
| removeOnKeys        | Allow removing last item when pressing given keys, if input is empty                                                                                                   | array          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;removeOnKeys: ['Backspace']<br>}</code>        |
| rounded             | Makes the element rounded                                                                                                                                              | boolean        | -                                                                               |                                                                                                                                                                          |
| size                | Vertical size of input, optional                                                                                                                                       | string         | `small`, `medium`, `large`                                                      |                                                                                                                                                                          |
| statusIcon          | Show status icon using field and variant prop                                                                                                                          | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>                             |
| useHtml5Validation  | Enable html 5 native validation                                                                                                                                        | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>                     |
| v-model             |                                                                                                                                                                        | array          | -                                                                               | []                                                                                                                                                                       |
| validationMessage   | The message which is shown when a validation error occurs                                                                                                              | string         | -                                                                               |                                                                                                                                                                          |
| variant             | Color of the each items, optional                                                                                                                                      | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                                          |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| infinite-scroll   |            |
| icon-right-click  |            |
| blur              |            |
| focus             |            |
| invalid           |            |
| update:modelValue |            |
| add               |            |
| remove            |            |
| typing            |            |

### Slots

| Name     | Description | Bindings |
| -------- | ----------- | -------- |
| selected |             |          |
| header   |             |          |
| default  |             | <br/>    |
| empty    |             |          |
| footer   |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                              |
| --------------------------------- | ------------------------------------ |
| $inputitems-background-color      | $input-background-color              |
| $inputitems-height                | calc(2em - 1px)                      |
| $inputitems-padding               | calc(0.275em - 1px) 0 0              |
| $inputitems-border-color          | $grey-lighter                        |
| $inputitems-border-style          | solid                                |
| $inputitems-border-width          | 1px                                  |
| $inputitems-border-radius         | $base-border-radius                  |
| $inputitems-color                 | #363636                              |
| $inputitems-line-height           | $base-line-height                    |
| $inputitems-box-shadow            | inset 0 1px 2px hsla(0, 0%, 4%, 0.1) |
| $inputitems-max-width             | 100%                                 |
| $inputitems-width                 | 100%                                 |
| $inputitems-counter-font-size     | 0.75rem                              |
| $inputitems-counter-margin        | 0.25rem 0 0 0.5rem                   |
| $inputitems-item-background-color | $primary                             |
| $inputitems-item-color            | $primary-invert                      |
| $inputitems-item-border-radius    | $base-border-radius                  |
| $inputitems-item-margin           | 0 0 0 0.275em                        |
| $inputitems-item-padding          | 0 0.75em 0 0.75em                    |
| $inputitems-margin-icon-to-text   | 0.1875em                             |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_inputitems.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                              |
| --------------------------------- | ------------------------------------ |
| $inputitems-background-color      | $input-background-color              |
| $inputitems-height                | calc(2em - 1px)                      |
| $inputitems-padding               | calc(0.275em - 1px) 0 0              |
| $inputitems-border-color          | $grey-lighter                        |
| $inputitems-border-style          | solid                                |
| $inputitems-border-width          | 1px                                  |
| $inputitems-border-radius         | $base-border-radius                  |
| $inputitems-color                 | #363636                              |
| $inputitems-line-height           | $base-line-height                    |
| $inputitems-box-shadow            | inset 0 1px 2px hsla(0, 0%, 4%, 0.1) |
| $inputitems-max-width             | 100%                                 |
| $inputitems-width                 | 100%                                 |
| $inputitems-counter-font-size     | 0.75rem                              |
| $inputitems-counter-margin        | 0.25rem 0 0 0.5rem                   |
| $inputitems-item-background-color | $primary                             |
| $inputitems-item-color            | $primary-invert                      |
| $inputitems-item-border-radius    | $base-border-radius                  |
| $inputitems-item-margin           | 0 0 0 0.275em                        |
| $inputitems-item-padding          | 0 0.75em 0 0.75em                    |
| $inputitems-margin-icon-to-text   | 0.1875em                             |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_inputitems.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>

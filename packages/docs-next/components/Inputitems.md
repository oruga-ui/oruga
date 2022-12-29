---
title: Inputitems
---

# Inputitems

<div class="vp-doc">

> A simple item input field that can have autocomplete functionality

<Carbon />
</div>
<example-inputitems />

## Class props

<br />

<inspector-inputitems-viewer />

<br />
<br />

<div class="vp-doc">

## Props

| Prop name           | Description                                                                                                                                                          | Type           | Values                                                                          | Default                                                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| allowAutocomplete   | Add autocomplete feature (if true, any Autocomplete props may be used too)                                                                                           | boolean        | -                                                                               |                                                                                                                                                              |
| allowDuplicates     | Allows adding the same item multiple time                                                                                                                            | boolean        | -                                                                               | false                                                                                                                                                        |
| allowNew            | When autocomplete, it allow to add new items                                                                                                                         | boolean        | -                                                                               |                                                                                                                                                              |
| appendToBody        | Append autocomplete content to body                                                                                                                                  | boolean        | -                                                                               |                                                                                                                                                              |
| ariaCloseLabel      | Accessibility label for the close button                                                                                                                             | string         | -                                                                               |                                                                                                                                                              |
| autocomplete        | Native options to use in HTML5 validation                                                                                                                            | string         | -                                                                               |                                                                                                                                                              |
| beforeAdding        | Function to validate the value of the item before adding                                                                                                             | func           | -                                                                               | Default function (see source code)                                                                                                                           |
| checkInfiniteScroll | Makes the autocomplete component check if list reached scroll end and emit infinite-scroll event                                                                     | boolean        | -                                                                               | false                                                                                                                                                        |
| closable            | Add close/delete button to the item                                                                                                                                  | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;closable: true<br>}</code>                     |
| closeIcon           | Icon name of close icon on selected item                                                                                                                             | string         | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;closeIcon: 'close'<br>}</code>                 |
| confirmKeys         | Array of keys<br>(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)<br>which will add a item when typing (default comma, tab and enter) | array          | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;confirmKeys: [',', 'Tab', 'Enter']<br>}</code> |
| createItem          | Function to create a new item to push into v-model (items)                                                                                                           | func           | -                                                                               | Default function (see source code)                                                                                                                           |
| data                | Items data                                                                                                                                                           | array          | -                                                                               | []                                                                                                                                                           |
| disabled            | Input will be disabled                                                                                                                                               | boolean        | -                                                                               |                                                                                                                                                              |
| expanded            | Makes input full width when inside a grouped or addon field                                                                                                          | boolean        | -                                                                               |                                                                                                                                                              |
| field               | Property of the object (if data is array of objects) to use as display text                                                                                          | string         | -                                                                               | 'value'                                                                                                                                                      |
| groupField          | Property of the object (if data is array of objects) to use as display text of group                                                                                 | string         | -                                                                               |                                                                                                                                                              |
| groupOptions        | Property of the object (if data is array of objects) to use as key to get items array of each group, optional                                                        | string         | -                                                                               |                                                                                                                                                              |
| hasCounter          | Show counter when maxlength or maxtags props are passed                                                                                                              | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;hasCounter: true<br>}</code>                   |
| icon                | Icon name to be added                                                                                                                                                | string         | -                                                                               |                                                                                                                                                              |
| iconPack            | Icon pack to use                                                                                                                                                     | string         | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                                                                                                                              |
| keepFirst           | The first option will always be pre-selected (easier to just hit enter or tab)                                                                                       | boolean        | -                                                                               |                                                                                                                                                              |
| maxitems            | Limits the number of items, plus item counter                                                                                                                        | number\|string | -                                                                               |                                                                                                                                                              |
| maxlength           | Same as native maxlength, plus character counter                                                                                                                     | number\|string | -                                                                               |                                                                                                                                                              |
| onPasteSeparators   | Array of chars used to split when pasting a new string                                                                                                               | array          | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;onPasteSeparators: [',']<br>}</code>           |
| openOnFocus         | Opens a dropdown with choices when the input field is focused                                                                                                        | boolean        | -                                                                               |                                                                                                                                                              |
| override            |                                                                                                                                                                      | boolean        | -                                                                               |                                                                                                                                                              |
| removeOnKeys        | Allow removing last item when pressing given keys, if input is empty                                                                                                 | array          | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;removeOnKeys: ['Backspace']<br>}</code>        |
| rounded             | Makes the element rounded                                                                                                                                            | boolean        | -                                                                               |                                                                                                                                                              |
| size                | Vertical size of input, optional                                                                                                                                     | string         | `small`, `medium`, `large`                                                      |                                                                                                                                                              |
| statusIcon          | Show status icon using field and variant prop                                                                                                                        | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>                             |
| useHtml5Validation  | Enable html 5 native validation                                                                                                                                      | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>                     |
| v-model             |                                                                                                                                                                      | array          | -                                                                               | []                                                                                                                                                           |
| validationMessage   | The message which is shown when a validation error occurs                                                                                                            | string         | -                                                                               |                                                                                                                                                              |
| variant             | Color of the each items, optional                                                                                                                                    | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                              |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| infinite-scroll   |            |
| icon-right-click  |            |
| blur              |            |
| focus             |            |
| update:modelValue |            |
| add               |            |
| remove            |            |
| typing            |            |

## Slots

| Name     | Description | Bindings |
| -------- | ----------- | -------- |
| selected |             |          |
| header   |             |          |
| default  |             | <br/>    |
| empty    |             |          |
| footer   |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_inputitems.scss)

| CSS Variable                             | SASS Variable                      | Default                          |
| ---------------------------------------- | ---------------------------------- | -------------------------------- |
| --oruga-inputitems-background-color      | \$inputitems-background-color      | \$input-background-color         |
| --oruga-inputitems-height                | \$inputitems-height                | calc(2em - 1px)                  |
| --oruga-inputitems-padding               | \$inputitems-padding               | calc(.275em - 1px) 0 0           |
| --oruga-inputitems-border-color          | \$inputitems-border-color          | \$grey-lighter                   |
| --oruga-inputitems-border-style          | \$inputitems-border-style          | solid                            |
| --oruga-inputitems-border-width          | \$inputitems-border-width          | 1px                              |
| --oruga-inputitems-border-radius         | \$inputitems-border-radius         | \$base-border-radius             |
| --oruga-inputitems-color                 | \$inputitems-color                 | #363636                          |
| --oruga-inputitems-line-height           | \$inputitems-line-height           | \$base-line-height               |
| --oruga-inputitems-box-shadow            | \$inputitems-box-shadow            | inset 0 1px 2px hsla(0,0%,4%,.1) |
| --oruga-inputitems-max-width             | \$inputitems-max-width             | 100%                             |
| --oruga-inputitems-width                 | \$inputitems-width                 | 100%                             |
| --oruga-inputitems-counter-font-size     | \$inputitems-counter-font-size     | .75rem                           |
| --oruga-inputitems-counter-margin        | \$inputitems-counter-margin        | .25rem 0 0 .5rem                 |
| --oruga-inputitems-item-background-color | \$inputitems-item-background-color | \$primary                        |
| --oruga-inputitems-item-color            | \$inputitems-item-color            | \$primary-invert                 |
| --oruga-inputitems-item-border-radius    | \$inputitems-item-border-radius    | \$base-border-radius             |
| --oruga-inputitems-item-margin           | \$inputitems-item-margin           | 0 0 0 0.275em                    |
| --oruga-inputitems-item-padding          | \$inputitems-item-padding          | 0 .75em 0 .75em                  |
| --oruga-inputitems-margin-icon-to-text   | \$inputitems-margin-icon-to-text   | .1875em                          |

</div>

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

## Inputitems Component

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

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $inputitems-background-color | $input-background-color !default |
| $inputitems-height | calc(2em - 1px) !default |
| $inputitems-padding | calc(.275em - 1px) 0 0 !default |
| $inputitems-border-color | $grey-lighter !default |
| $inputitems-border-style | solid !default |
| $inputitems-border-width | 1px !default |
| $inputitems-border-radius | $base-border-radius !default |
| $inputitems-color | #363636 !default |
| $inputitems-line-height | $base-line-height !default |
| $inputitems-box-shadow | inset 0 1px 2px hsla(0,0%,4%,.1) !default |
| $inputitems-max-width | 100% !default |
| $inputitems-width | 100% !default |
| $inputitems-counter-font-size | .75rem !default |
| $inputitems-counter-margin | .25rem 0 0 .5rem !default |
| $inputitems-item-background-color | $primary !default |
| $inputitems-item-color | $primary-invert !default |
| $inputitems-item-border-radius | $base-border-radius !default |
| $inputitems-item-margin | 0 0 0 0.275em !default |
| $inputitems-item-padding | 0 .75em 0 .75em !default |
| $inputitems-margin-icon-to-text | .1875em !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_inputitems.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $inputitems-background-color | $input-background-color !default |
| $inputitems-height | calc(2em - 1px) !default |
| $inputitems-padding | calc(.275em - 1px) 0 0 !default |
| $inputitems-border-color | $grey-lighter !default |
| $inputitems-border-style | solid !default |
| $inputitems-border-width | 1px !default |
| $inputitems-border-radius | $base-border-radius !default |
| $inputitems-color | #363636 !default |
| $inputitems-line-height | $base-line-height !default |
| $inputitems-box-shadow | inset 0 1px 2px hsla(0,0%,4%,.1) !default |
| $inputitems-max-width | 100% !default |
| $inputitems-width | 100% !default |
| $inputitems-counter-font-size | .75rem !default |
| $inputitems-counter-margin | .25rem 0 0 .5rem !default |
| $inputitems-item-background-color | $primary !default |
| $inputitems-item-color | $primary-invert !default |
| $inputitems-item-border-radius | $base-border-radius !default |
| $inputitems-item-margin | 0 0 0 0.275em !default |
| $inputitems-item-padding | 0 .75em 0 .75em !default |
| $inputitems-margin-icon-to-text | .1875em !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_inputitems.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">

<p> This component does not have any Oruga style overrides for the Bootstrap Theme. </p>
      
</div>

</div>

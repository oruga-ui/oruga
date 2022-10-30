---
title: Autocomplete
---

# Autocomplete

<div class="vp-doc">

> Extended input that provide suggestions while the user types

</div>
<example-autocomplete />

## Class props

<br />

<inspector-autocomplete-viewer />

<br />
<br />

<div class="vp-doc">

## Props

| Prop name            | Description                                                                                                                                            | Type           | Values                                            | Default                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| animation            | Transition name to apply on dropdown list                                                                                                              | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> autocomplete: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| appendToBody         | Append autocomplete content to body                                                                                                                    | boolean        | -                                                 |                                                                                                                                               |
| autocomplete         | Native options to use in HTML5 validation                                                                                                              | string         | -                                                 |                                                                                                                                               |
| checkInfiniteScroll  | Makes the component check if list reached scroll end and emit infinite-scroll event.                                                                   | boolean        | -                                                 |                                                                                                                                               |
| clearOnSelect        | Clear input text on select                                                                                                                             | boolean        | -                                                 |                                                                                                                                               |
| clearable            | Add a button/icon to clear the inputed text                                                                                                            | boolean        | -                                                 |                                                                                                                                               |
| confirmKeys          | Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) | array          | -                                                 | ['Tab', 'Enter']                                                                                                                              |
| customFormatter      | Function to format an option to a string for display in the input as alternative to field prop)                                                        | func           | -                                                 |                                                                                                                                               |
| data                 | Options / suggestions                                                                                                                                  | array          | -                                                 | []                                                                                                                                            |
| debounceTyping       | Number of milliseconds to delay before to emit typing event                                                                                            | number         | -                                                 |                                                                                                                                               |
| expanded             | Makes input full width when inside a grouped or addon field                                                                                            | boolean        | -                                                 |                                                                                                                                               |
| field                | Property of the object (if data is array of objects) to use as display text, and to keep track of selected option                                      | string         | -                                                 | 'value'                                                                                                                                       |
| groupField           | Property of the object (if <code>data</code> is array of objects) to use as display text of group                                                      | string         | -                                                 |                                                                                                                                               |
| groupOptions         | Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional                             | string         | -                                                 |                                                                                                                                               |
| icon                 | Icon name to be added                                                                                                                                  | string         | -                                                 |                                                                                                                                               |
| iconPack             | Icon pack to use                                                                                                                                       | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                               |
| iconRight            | Icon name to be added on the right side                                                                                                                | string         | -                                                 |                                                                                                                                               |
| iconRightClickable   | Clickable icon right if exists                                                                                                                         | boolean        | -                                                 |                                                                                                                                               |
| itemTag              | Menu item tag name                                                                                                                                     | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> autocomplete: {<br>&nbsp;&nbsp;itemTag: 'div'<br>}</code>    |
| keepFirst            | The first option will always be pre-selected (easier to just hit enter or tab)                                                                         | boolean        | -                                                 |                                                                                                                                               |
| keepOpen             | Keep open dropdown list after select                                                                                                                   | boolean        | -                                                 |                                                                                                                                               |
| maxHeight            | Max height of dropdown content                                                                                                                         | string\|number | -                                                 |                                                                                                                                               |
| maxlength            | Same as native maxlength, plus character counter                                                                                                       | number\|string | -                                                 |                                                                                                                                               |
| menuPosition         | Position of dropdown                                                                                                                                   | string         | `auto`, `top`, `bottom`                           | 'auto'                                                                                                                                        |
| menuTag              | Menu tag name                                                                                                                                          | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> autocomplete: {<br>&nbsp;&nbsp;menuTag: 'div'<br>}</code>    |
| openOnFocus          | Open dropdown list on focus                                                                                                                            | boolean        | -                                                 |                                                                                                                                               |
| override             |                                                                                                                                                        | boolean        | -                                                 |                                                                                                                                               |
| rounded              | Makes the element rounded                                                                                                                              | boolean        | -                                                 |                                                                                                                                               |
| selectOnClickOutside | Trigger the select event for the first pre-selected option when clicking outside and <code>keep-first</code> is enabled                                | boolean        | -                                                 |                                                                                                                                               |
| selectableFooter     | Allows the footer in the autocomplete to be selectable                                                                                                 | boolean        | -                                                 |                                                                                                                                               |
| selectableHeader     | Allows the header in the autocomplete to be selectable                                                                                                 | boolean        | -                                                 |                                                                                                                                               |
| size                 | Vertical size of input, optional                                                                                                                       | string         | `small`, `medium`, `large`                        |                                                                                                                                               |
| statusIcon           | Show status icon using field and variant prop                                                                                                          | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>              |
| type                 | Input type                                                                                                                                             | string         | -                                                 | 'text'                                                                                                                                        |
| useHtml5Validation   | Enable html 5 native validation                                                                                                                        | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>      |
| v-model              |                                                                                                                                                        | number\|string | -                                                 |                                                                                                                                               |
| validationMessage    | The message which is shown when a validation error occurs                                                                                              | string         | -                                                 |                                                                                                                                               |

## Events

| Event name        | Properties                                                                   | Description |
| ----------------- | ---------------------------------------------------------------------------- | ----------- |
| icon-click        |                                                                              |
| blur              |                                                                              |
| focus             |                                                                              |
| update:modelValue |                                                                              |
| select            | **selected** `Object` - selected option<br/>**event** `Event` - native event |
| infinite-scroll   |                                                                              |
| typing            |                                                                              |
| icon-right-click  |                                                                              |
| select-header     |                                                                              |
| select-footer     |                                                                              |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| header  |             |          |
| group   |             | <br/>    |
| default |             | <br/>    |
| empty   |             |          |
| footer  |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__autocomplete.scss.scss)

| CSS Variable                                     | SASS Variable                              | Default                                                              |
| ------------------------------------------------ | ------------------------------------------ | -------------------------------------------------------------------- |
| --oruga-autocomplete-item-color                  | \$autocomplete-item-color                  | #000000                                                              |
| --oruga-autocomplete-item-disabled-opacity       | \$autocomplete-item-disabled-opacity       | \$base-disabled-opacity                                              |
| --oruga-autocomplete-item-font-size              | \$autocomplete-item-font-size              | \$base-font-size                                                     |
| --oruga-autocomplete-item-hover-background-color | \$autocomplete-item-hover-background-color | #f5f5f5                                                              |
| --oruga-autocomplete-item-hover-color            | \$autocomplete-item-hover-color            | #000000                                                              |
| --oruga-autocomplete-item-line-height            | \$autocomplete-item-line-height            | \$base-line-height                                                   |
| --oruga-autocomplete-item-padding                | \$autocomplete-item-padding                | .375rem 1rem                                                         |
| --oruga-autocomplete-menu-background             | \$autocomplete-menu-background             | #ffffff                                                              |
| --oruga-autocomplete-menu-border-radius          | \$autocomplete-menu-border-radius          | \$base-border-radius                                                 |
| --oruga-autocomplete-menu-box-shadow             | \$autocomplete-menu-box-shadow             | 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02) |
| --oruga-autocomplete-menu-margin                 | \$autocomplete-menu-margin                 | 0                                                                    |
| --oruga-autocomplete-menu-max-height             | \$autocomplete-menu-max-height             | 200px                                                                |
| --oruga-autocomplete-menu-padding                | \$autocomplete-menu-padding                | .5rem 0 .5rem 0                                                      |
| --oruga-autocomplete-menu-zindex                 | \$autocomplete-menu-zindex                 | 20                                                                   |

</div>

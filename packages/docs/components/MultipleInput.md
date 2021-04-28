---
title: Multiple Input
---

# Multiple Input

> A simple item input field that can have autocomplete functionality

---

## Props

| Prop name           | Description                                                                | Type           | Values                                            | Default                                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------- | -------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowDuplicates     |                                                                            | boolean        | -                                                 | false                                                                                                                                              |
| allowNew            |                                                                            | boolean        | -                                                 |                                                                                                                                                    |
| appendToBody        |                                                                            | boolean        | -                                                 |                                                                                                                                                    |
| ariaCloseLabel      |                                                                            | string         | -                                                 |                                                                                                                                                    |
| autocomplete        | Native options to use in HTML5 validation                                  | boolean        | -                                                 |                                                                                                                                                    |
| autocompleteClasses | Classes to apply on internal autocomplete (@see o-autocomplete style docs) | object         | -                                                 |                                                                                                                                                    |
| beforeAdding        |                                                                            | func           | -                                                 | Default function (see source code)                                                                                                                 |
| checkInfiniteScroll |                                                                            | boolean        | -                                                 | false                                                                                                                                              |
| closable            |                                                                            | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> taginput {<br>&nbsp;&nbsp;closable: true<br>}</code>              |
| confirmKeys         |                                                                            | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> taginput {<br>&nbsp;&nbsp;confirmKeys: ['<br>}</code>             |
| createItem          |                                                                            | func           | -                                                 | Default function (see source code)                                                                                                                 |
| data                |                                                                            | array          | -                                                 | []                                                                                                                                                 |
| disabled            |                                                                            | boolean        | -                                                 |                                                                                                                                                    |
| expanded            | Makes input full width when inside a grouped or addon field                | boolean        | -                                                 |                                                                                                                                                    |
| field               |                                                                            | string         | -                                                 | 'value'                                                                                                                                            |
| groupField          |                                                                            | string         | -                                                 |                                                                                                                                                    |
| groupOptions        |                                                                            | string         | -                                                 |                                                                                                                                                    |
| hasCounter          |                                                                            | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> taginput {<br>&nbsp;&nbsp;hasCounter: true<br>}</code>            |
| icon                | Icon name to be added                                                      | string         | -                                                 |                                                                                                                                                    |
| iconPack            | Icon pack to use                                                           | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                    |
| inputClasses        | Classes to apply on internal input (@see o-input style docs)               | object         | -                                                 |                                                                                                                                                    |
| maxitems            |                                                                            | number\|string | -                                                 |                                                                                                                                                    |
| maxlength           | Same as native maxlength, plus character counter                           | number\|string | -                                                 |                                                                                                                                                    |
| nativeAutocomplete  |                                                                            | string         | -                                                 |                                                                                                                                                    |
| onPasteSeparators   |                                                                            | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> taginput {<br>&nbsp;&nbsp;onPasteSeparators: ['<br>}</code>       |
| openOnFocus         |                                                                            | boolean        | -                                                 |                                                                                                                                                    |
| override            | Override classes                                                           | boolean        | -                                                 | false                                                                                                                                              |
| removeOnKeys        |                                                                            | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> taginput {<br>&nbsp;&nbsp;removeOnKeys: ['Backspace']<br>}</code> |
| rounded             | Makes the element rounded                                                  | boolean        | -                                                 |                                                                                                                                                    |
| statusIcon          | Show status icon using field and variant prop                              | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>                   |
| useHtml5Validation  | Enable html 5 native validation                                            | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>           |
| validationMessage   | The message which is shown when a validation error occurs                  | string         | -                                                 |                                                                                                                                                    |
| value               |                                                                            | array          | -                                                 | []                                                                                                                                                 |
| variant             |                                                                            | string         | -                                                 |                                                                                                                                                    |

## Events

| Event name      | Properties | Description |
| --------------- | ---------- | ----------- |
| blur            |            |
| focus           |            |
| input           |            |
| add             |            |
| remove          |            |
| typing          |            |
| infinite-scroll |            |

## Slots

| Name     | Description | Bindings |
| -------- | ----------- | -------- |
| selected |             |          |
| header   |             |          |
| default  |             | <br>     |
| empty    |             |          |
| footer   |             |          |

## Style

| CSS Variable                           | SASS Variable                    | Default                          |
| -------------------------------------- | -------------------------------- | -------------------------------- |
| --oruga-taginput-height                | \$taginput-height                | calc(2em - 1px)                  |
| --oruga-taginput-padding               | \$taginput-padding               | calc(.275em - 1px) 0 0           |
| --oruga-taginput-border-color          | \$taginput-border-color          | \$grey-lighter                   |
| --oruga-taginput-border-style          | \$taginput-border-style          | solid                            |
| --oruga-taginput-border-width          | \$taginput-border-width          | 1px                              |
| --oruga-taginput-border-radius         | \$taginput-border-radius         | \$base-border-radius             |
| --oruga-taginput-color                 | \$taginput-color                 | #363636                          |
| --oruga-taginput-line-height           | \$taginput-line-height           | \$base-line-height               |
| --oruga-taginput-box-shadow            | \$taginput-box-shadow            | inset 0 1px 2px hsla(0,0%,4%,.1) |
| --oruga-taginput-max-width             | \$taginput-max-width             | 100%                             |
| --oruga-taginput-width                 | \$taginput-width                 | 100%                             |
| --oruga-taginput-counter-font-size     | \$taginput-counter-font-size     | .75rem                           |
| --oruga-taginput-counter-margin        | \$taginput-counter-margin        | .25rem 0 0 .5rem                 |
| --oruga-taginput-item-background-color | \$taginput-item-background-color | \$primary                        |
| --oruga-taginput-item-color            | \$taginput-item-color            | \$primary-invert                 |
| --oruga-taginput-item-border-radius    | \$taginput-item-border-radius    | \$base-border-radius             |
| --oruga-taginput-item-margin           | \$taginput-item-margin           | 0 0 0 0.275em                    |
| --oruga-taginput-item-padding          | \$taginput-item-padding          | 0 .75em 0 .75em                  |
| --oruga-taginput-margin-icon-to-text   | \$taginput-margin-icon-to-text   | .1875em                          |

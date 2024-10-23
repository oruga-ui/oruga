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

| Prop name          | Description | Type | Values | Default                                                                                                                                                             |
| ------------------ | ----------- | ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowDuplicates    |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;allowDuplicates: false<br>}</code>           |
| allowNew           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;allowNew: false<br>}</code>                  |
| ariaCloseLabel     |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;ariaCloseLabel: undefined<br>}</code>        |
| autocomplete       |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>              |
| checkScroll        |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;checkScroll: false<br>}</code>               |
| closable           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;closable: true<br>}</code>                   |
| closeIcon          |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>               |
| confirmKeys        |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;confirmKeys: [",","Tab","Enter"]<br>}</code> |
| counter            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;counter: true<br>}</code>                    |
| createItem         |             |      | -      | Default function (see source code)                                                                                                                                  |
| customValidity     |             |      | -      |                                                                                                                                                                     |
| disabled           |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| expanded           |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| filter             |             |      | -      |                                                                                                                                                                     |
| icon               |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>                  |
| iconPack           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>              |
| input              |             |      | -      | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                            |
| keepFirst          |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| keepOpen           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;keepOpen: false<br>}</code>                  |
| maxitems           |             |      | -      |                                                                                                                                                                     |
| maxlength          |             |      | -      |                                                                                                                                                                     |
| v-model            |             |      | -      |                                                                                                                                                                     |
| openOnFocus        |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| options            |             |      | -      |                                                                                                                                                                     |
| override           |             |      | -      |                                                                                                                                                                     |
| placeholder        |             |      | -      |                                                                                                                                                                     |
| removeOnKeys       |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;removeOnKeys: ["Backspace"]<br>}</code>      |
| separators         |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;separators: [","]<br>}</code>                |
| size               |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;size: undefined<br>}</code>                  |
| teleport           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                  |
| useHtml5Validation |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                   |
| validateItem       |             |      | -      | Default function (see source code)                                                                                                                                  |
| variant            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>               |

### Events

| Event name        | Properties                                                 | Description                                    |
| ----------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| scroll-start      |                                                            | the list inside the dropdown reached the start |
| scroll-end        |                                                            | the list inside the dropdown reached it's end  |
| icon-click        | **event** `Event` - native event                           | on icon click event                            |
| icon-right-click  | **event** `Event` - native event                           | on icon right click event                      |
| update:modelValue | **value** `string[] \| object[]` - updated modelValue prop | modelValue prop two-way binding                |
| update:input      | **value** `string` - updated input prop                    | input prop two-way binding                     |
| input             | **value** `string` - input value                           | on input change event                          |
| add               | **value** `string \| object` - added item                  | new item got added                             |
| remove            | **value** `string \| object` - removed item                | item got removed                               |
| focus             | **event** `Event` - native event                           | on input focus event                           |
| blur              | **event** `Event` - native event                           | on input blur event                            |
| invalid           | **event** `Event` - native event                           | on input invalid event                         |

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

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable      | Default |
| ------------------ | ------- |
| $taginput-height   | 2em     |
| $taginput-tag-size | 0.9em   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_taginput.scss)

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

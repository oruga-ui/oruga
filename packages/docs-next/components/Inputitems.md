---
title: Inputitems
---

# Inputitems

<div class="vp-doc">

> A simple tag input field that can have autocomplete functionality

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

| Prop name          | Description                                                                                                                                                            | Type                          | Values                                                                          | Default                                                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowAutocomplete  | Add autocomplete feature (if true, any Autocomplete props may be used too)                                                                                             | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| allowDuplicates    | Allows adding the same item multiple time                                                                                                                              | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| allowNew           | When autocomplete, it allow to add new items                                                                                                                           | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| appendToBody       | Append autocomplete content to body                                                                                                                                    | boolean                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;appendToBody: false<br>}</code>         |
| ariaCloseLabel     | Accessibility label for the close button                                                                                                                               | string                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;ariaCloseLabel: undefined<br>}</code>   |
| autocomplete       | Native options to use in HTML5 validation                                                                                                                              | string                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>         |
| beforeAdding       | Function to validate the value of the item before adding                                                                                                               | (value: string) =&gt; boolean | -                                                                               | Default function (see source code)                                                                                                                               |
| checkScroll        | Makes the component check if list reached scroll start or end and emit scroll events.                                                                                  | boolean                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;checkScroll: false<br>}</code>          |
| closable           | Add close/delete button to the item                                                                                                                                    | boolean                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;closable: true<br>}</code>              |
| closeIcon          | Icon name of close icon on selected item                                                                                                                               | string                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>          |
| confirmKeys        | Array of keys<br/>(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)<br/>which will add a item when typing (default comma, tab and enter) | array                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>nputitems: {<br>&nbsp;&nbsp;confirmKeys: ["<br>}</code>              |
| createItem         | Function to create a new item to push into v-model (items)                                                                                                             | (value: any) =&gt; any        | -                                                                               | Default function (see source code)                                                                                                                               |
| data               | Items data                                                                                                                                                             | array                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>[]</code>                                                                                                         |
| disabled           | Same as native input disabled                                                                                                                                          | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| expanded           | Makes input full width when inside a grouped or addon field                                                                                                            | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| field              | Property of the object (if data is array of objects) to use as display text                                                                                            | string                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>"value"</code>                                                                                                    |
| groupField         | Property of the object (if &lt;code&gt;data&lt;/code&gt; is array of objects) to use as display text of group                                                          | string                        | -                                                                               |                                                                                                                                                                  |
| groupOptions       | Property of the object (if &lt;code&gt;data&lt;/code&gt; is array of objects) to use as key to get items array of each group, optional                                 | string                        | -                                                                               |                                                                                                                                                                  |
| hasCounter         | Show counter when maxlength or maxtags props are passed                                                                                                                | boolean                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;hasCounter: true<br>}</code>            |
| icon               | Icon name to be shown                                                                                                                                                  | string                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>             |
| iconPack           | Icon pack to use                                                                                                                                                       | string                        | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>         |
| keepFirst          | The first option will always be pre-selected (easier to just hit enter or tab)                                                                                         | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| maxitems           | Limits the number of items, plus item counter                                                                                                                          | number                        | -                                                                               |                                                                                                                                                                  |
| maxlength          | Same as native maxlength, plus character counter                                                                                                                       | number                        | -                                                                               |                                                                                                                                                                  |
| openOnFocus        | Opens a dropdown with choices when the input field is focused                                                                                                          | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| pasteSeparators    | Array of chars used to split when pasting a new string                                                                                                                 | string[]                      | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;pasteSeparators: ["<br>}</code>         |
| placeholder        | Input placeholder                                                                                                                                                      | string                        | -                                                                               |                                                                                                                                                                  |
| removeOnKeys       | Allow removing last item when pressing given keys, if input is empty                                                                                                   | array                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;removeOnKeys: ["Backspace"]<br>}</code> |
| size               | Vertical size of the input control, optional                                                                                                                           | string                        | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;size: undefined<br>}</code>             |
| useHtml5Validation | Enable html 5 native validation                                                                                                                                        | boolean                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                |
| v-model            |                                                                                                                                                                        | array                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>[]</code>                                                                                                         |
| variant            | Color of the each items, optional                                                                                                                                      | string                        | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>inputitems: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>          |

### Events

| Event name        | Properties                             | Description                                           |
| ----------------- | -------------------------------------- | ----------------------------------------------------- |
| scroll-start      |                                        | the scroll list inside the dropdown reached the start |
| scroll-end        |                                        | the scroll list inside the dropdown reached it's end  |
| icon-click        | **event** `Event` - native event       | on icon click event                                   |
| icon-right-click  | **event** `Event` - native event       | on icon right click event                             |
| update:modelValue | **value** `any[]` - updated modelValue | modelValue prop two-way binding                       |
| input             | **value** `any` - input value          | on input change event                                 |
| add               | **value** `any` - added item           | new item got added                                    |
| remove            | **value** `any` - removed item         | item got removed                                      |
| focus             | **event** `Event` - native event       | on input focus event                                  |
| blur              | **event** `Event` - native event       | on input blur event                                   |
| invalid           | **event** `Event` - native event       | on input invalid event                                |

### Slots

| Name     | Description | Bindings   |
| -------- | ----------- | ---------- |
| selected |             |            |
| header   |             |            |
| default  |             | <br/><br/> |
| empty    |             |            |
| footer   |             |            |

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

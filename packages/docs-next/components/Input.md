---
title: Input
---

# Input

<div class="vp-doc">

> Get user Input. Use with Field to access all functionalities

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">

## Class props

<inspector-Input-viewer />

</div>

<div class="vp-doc">

## Input component

> Get user Input. Use with Field to access all functionalities

```html
<o-input></o-input>
```

### Props

| Prop name          | Description                                                 | Type           | Values                                                                          | Default                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Native options to use in HTML5 validation                   | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>       |
| autosize           | Automatically adjust height in textarea                     | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| clearIcon          | Icon name to be added on the clear button                   | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;clearIcon: "close-circle"<br>}</code> |
| clearable          | Add a button/icon to clear the inputed text                 | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;clearable: false<br>}</code>          |
| counter            | Show character counter when maxlength prop is passed        | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;counter: false<br>}</code>            |
| disabled           | Same as native disabled                                     | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| expanded           | Makes input full width when inside a grouped or addon field | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| icon               | Icon to be shown                                            | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>           |
| iconClickable      | Makes the icon clickable                                    | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| iconPack           | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>       |
| iconRight          | Icon to be added on the right side                          | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>      |
| iconRightClickable | Make the icon right clickable                               | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| iconRightVariant   | Variant of right icon                                       | string         | -                                                                               |                                                                                                                                                           |
| maxlength          | Same as native maxlength, plus character counter            | number         | -                                                                               |                                                                                                                                                           |
| passwordReveal     | Adds the reveal password functionality                      | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| placeholder        | Input placeholder                                           | string         | -                                                                               |                                                                                                                                                           |
| rounded            | Makes the element rounded                                   | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| size               | Size of the control                                         | string         | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| statusIcon         | Show status icon using field and variant prop               | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;statusIcon: true<br>}</code>                 |
| type               | Input type, like native                                     | string         | `Any native input type`, `and textarea`                                         | <code style='white-space: nowrap; padding: 0;'>"text"</code>                                                                                              |
| useHtml5Validation | Enable html 5 native validation                             | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>         |
| v-model            |                                                             | string\|number | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                  |
| validationMessage  | The message which is shown when a validation error occurs   | string         | -                                                                               |                                                                                                                                                           |
| variant            | Color of the control                                        | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>        |

### Events

| Event name        | Properties                                                                      | Description                     |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `string \| number` - updated modelValue prop                          | modelValue prop two-way binding |
| input             | **value** `string \| number` - input value<br/>**event** `Event` - native event | on input change event           |
| focus             | **event** `Event` - native event                                                | on input focus event            |
| blur              | **event** `Event` - native event                                                | on input blur event             |
| invalid           | **event** `Event` - native event                                                | on input invalid event          |
| icon-click        | **event** `Event` - native event                                                | on icon click event             |
| icon-right-click  | **event** `Event` - native event                                                | on icon right click event       |

</div>

<div class="vp-doc">
</div>

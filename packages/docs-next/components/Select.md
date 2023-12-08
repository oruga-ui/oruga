---
title: Select
---

# Select

<div class="vp-doc">

> Select an item in a dropdown list. Use with Field to access all functionalities

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">

## Class props

<inspector-Select-viewer />

</div>

<div class="vp-doc">

## Select component

> Select an item in a dropdown list. Use with Field to access all functionalities

```html
<o-select></o-select>
```

### Props

| Prop name          | Description                                                    | Type                                   | Values                                                                          | Default                                                                                                                                               |
| ------------------ | -------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Same as native autocomplete options to use in HTML5 validation | string                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>  |
| expanded           | Makes input full width when inside a grouped or addon field    | boolean                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| icon               | Icon to be shown                                               | string                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>      |
| iconClickable      | Makes the icon clickable                                       | boolean                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| iconPack           | Icon pack to use                                               | string                                 | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>  |
| iconRight          | Icon to be added on the right side                             | string                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code> |
| iconRightClickable | Make the icon right clickable                                  | boolean                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| iconRightVariant   | Variant of right icon                                          | string                                 | -                                                                               |                                                                                                                                                       |
| multiple           | Allow multiple selection                                       | boolean                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| nativeSize         | Same as native size                                            | string\|number                         | -                                                                               |                                                                                                                                                       |
| options            | Select options, unnecessary when default slot is used          | string[] \| OptionsItem[]              | -                                                                               |                                                                                                                                                       |
| placeholder        | Text when nothing is selected                                  | string                                 | -                                                                               |                                                                                                                                                       |
| rounded            | Makes the element rounded                                      | boolean                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| size               | Vertical size of input                                         | string                                 | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;size: undefined<br>}</code>      |
| statusIcon         | Show status icon using field and variant prop                  | boolean                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;statusIcon: true<br>}</code>             |
| useHtml5Validation | Enable html 5 native validation                                | boolean                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>     |
| v-model            |                                                                | string\|number\|boolean\|object\|array | -                                                                               | <code style='white-space: nowrap; padding: 0;'>null</code>                                                                                            |
| validationMessage  | The message which is shown when a validation error occurs      | string                                 | -                                                                               |                                                                                                                                                       |
| variant            | Color of the control                                           | string                                 | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>   |

### Events

| Event name        | Properties                                                                                      | Description                     |
| ----------------- | ----------------------------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `string \| number \| boolean \| object \| Array&lt;any&gt;` - updated modelValue prop | modelValue prop two-way binding |
| focus             | **event** `Event` - native event                                                                | on input focus event            |
| blur              | **event** `Event` - native event                                                                | on input blur event             |
| invalid           | **event** `Event` - native event                                                                | on input invalid event          |
| icon-click        | **event** `Event` - native event                                                                | on icon click event             |
| icon-right-click  | **event** `Event` - native event                                                                | on icon right click event       |

### Slots

| Name        | Description                                   | Bindings |
| ----------- | --------------------------------------------- | -------- |
| placeholder | Override the placeholder                      |          |
| default     | Override the options, default is options prop |          |

</div>

<div class="vp-doc">
</div>

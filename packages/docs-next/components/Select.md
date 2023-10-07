---
title: Select
---

# Select

<div class="vp-doc">

> Select an item in a dropdown list. Use with Field to access all functionalities

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-select />

</div>
<div class="vp-example">

## Class props

<inspector-select-viewer />

</div>

<div class="vp-doc">

## Select component

```html
<o-select></o-select>
```

### Props

| Prop name          | Description                                                 | Type                                   | Values                                                                          | Default                                                                                                                                               |
| ------------------ | ----------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Native options to use in HTML5 validation                   | string                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>  |
| expanded           | Makes input full width when inside a grouped or addon field | boolean                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| icon               | Icon name to be shown                                       | string                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>      |
| iconClickable      | Makes the icon clickable                                    | boolean                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| iconPack           | Icon pack to use                                            | string                                 | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>  |
| iconRight          | Icon name to be added on the right side                     | string                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code> |
| iconRightClickable | Make the icon right clickable                               | boolean                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| iconRightVariant   | Variant of right icon                                       | string                                 | -                                                                               |                                                                                                                                                       |
| multiple           | Allow multiple selection                                    | boolean                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| nativeSize         | Same as native size                                         | string\|number                         | -                                                                               |                                                                                                                                                       |
| placeholder        | Text when nothing is selected                               | string                                 | -                                                                               |                                                                                                                                                       |
| rounded            | Makes the element rounded                                   | boolean                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| size               | Vertical size of input, optional                            | string                                 | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;size: undefined<br>}</code>      |
| statusIcon         | Show status icon using field and variant prop               | boolean                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;statusIcon: true<br>}</code>             |
| useHtml5Validation | Enable html 5 native validation                             | boolean                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>     |
| v-model            |                                                             | string\|number\|boolean\|object\|array | -                                                                               | <code style='white-space: nowrap; padding: 0;'>null</code>                                                                                            |
| validationMessage  | The message which is shown when a validation error occurs   | string                                 | -                                                                               |                                                                                                                                                       |
| variant            | Color of the control, optional                              | string                                 | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>   |

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

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                 | Default                                               |
| ----------------------------- | ----------------------------------------------------- |
| $select-background-color      | #fff                                                  |
| $select-border-color          | $grey-lighter                                         |
| $select-border-width          | 1px                                                   |
| $select-border-style          | solid                                                 |
| $select-border-radius         | $base-border-radius                                   |
| $select-rounded-border-radius | $base-rounded-border-radius                           |
| $select-box-shadow            | none                                                  |
| $select-color                 | #363636                                               |
| $select-icon-zindex           | 4                                                     |
| $select-height                | $control-height                                       |
| $select-arrow-size            | 1rem                                                  |
| $select-line-height           | $base-line-height                                     |
| $select-margin                | 0                                                     |
| $select-max-width             | 100%                                                  |
| $select-width                 | 100%                                                  |
| $select-placeholder-opacity   | $base-disabled-opacity                                |
| $select-padding               | $control-padding-vertical $control-padding-horizontal |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_select.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                 | Default                                               |
| ----------------------------- | ----------------------------------------------------- |
| $select-background-color      | #fff                                                  |
| $select-border-color          | $grey-lighter                                         |
| $select-border-width          | 1px                                                   |
| $select-border-style          | solid                                                 |
| $select-border-radius         | $base-border-radius                                   |
| $select-rounded-border-radius | $base-rounded-border-radius                           |
| $select-box-shadow            | none                                                  |
| $select-color                 | #363636                                               |
| $select-icon-zindex           | 4                                                     |
| $select-height                | $control-height                                       |
| $select-arrow-size            | 1rem                                                  |
| $select-line-height           | $base-line-height                                     |
| $select-margin                | 0                                                     |
| $select-max-width             | 100%                                                  |
| $select-width                 | 100%                                                  |
| $select-placeholder-opacity   | $base-disabled-opacity                                |
| $select-padding               | $control-padding-vertical $control-padding-horizontal |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_select.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>

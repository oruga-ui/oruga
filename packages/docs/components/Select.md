# Select

<section class="odocs-head">

The **Select** input component uses [HTML's native select input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select).
Select inputs can be single value selections, or multi-value selections by using the `multiple` attribute.
Use it with the [Field](/components/Field) component to access all the functionalities.

</section>

<section class="odocs-examples">

## Examples

<example-select />

</section>

<section class="odocs-specs">

## Select component

> Select an item in a list. Use with Field to access all functionalities.

```html
<o-select></o-select>
```

### Props

| Prop name          | Description                                                                           | Type                                                                   | Values                                                                          | Default                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Same as native autocomplete options to use in HTML5 validation                        | string                                                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>  |
| customValidity     | Custom HTML 5 validation error to set on the form control                             | string \| ((currentValue: unknown, state: ValidityState) =&gt; string) | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                |
| disabled           | Disable the input - same as native disabled                                           | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| expanded           | Makes input full width when inside a grouped or addon field                           | boolean                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;expanded: false<br>}</code>      |
| icon               | Icon to be shown                                                                      | string                                                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>      |
| iconClickable      | Makes the icon clickable                                                              | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| iconPack           | Icon pack to use                                                                      | string                                                                 | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>  |
| iconRight          | Icon to be added on the right side                                                    | string                                                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code> |
| iconRightClickable | Make the icon right clickable                                                         | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| iconRightVariant   | Variant of right icon                                                                 | string                                                                 | -                                                                               |                                                                                                                                                       |
| id                 | Same as native id. Also set the `for` label for o-field wrapper - default is an uuid. | string                                                                 | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                         |
| v-model            | The input value state                                                                 | unknown                                                                | -                                                                               |                                                                                                                                                       |
| multiple           | Allow multiple selection - converts the `modelValue` into an array                    | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                |
| nativeSize         | Same as native size                                                                   | number \| string                                                       | -                                                                               |                                                                                                                                                       |
| options            | Select options, unnecessary when default slot is used                                 | OptionsPropWithGroups&lt;unknown&gt;                                   | -                                                                               |                                                                                                                                                       |
| override           | Override existing theme classes completely                                            | boolean                                                                | -                                                                               |                                                                                                                                                       |
| placeholder        | Text when nothing is selected                                                         | string                                                                 | -                                                                               |                                                                                                                                                       |
| required           | Same as native required                                                               | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| rounded            | Makes the element rounded                                                             | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| size               | Vertical size of input                                                                | string                                                                 | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;size: undefined<br>}</code>      |
| statusIcon         | Show status icon using field and variant prop                                         | boolean                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;statusIcon: true<br>}</code>             |
| useHtml5Validation | Enable HTML 5 native validation                                                       | boolean                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>     |
| variant            | Color of the control                                                                  | string                                                                 | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>   |

### Events

| Event name         | Properties                                     | Description                     |
| ------------------ | ---------------------------------------------- | ------------------------------- |
| update:model-value | **value** `T \| T[]` - updated modelValue prop | modelValue prop two-way binding |
| focus              | **event** `Event` - native event               | on input focus event            |
| blur               | **event** `Event` - native event               | on input blur event             |
| invalid            | **event** `Event` - native event               | on input invalid event          |
| icon-click         | **event** `Event` - native event               | on icon click event             |
| icon-right-click   | **event** `Event` - native event               | on icon right click event       |

### Slots

| Name        | Description                                   | Bindings |
| ----------- | --------------------------------------------- | -------- |
| placeholder | Override the placeholder                      |          |
| default     | Override the options, default is options prop |          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-select-viewer />

</section>

<section class="odocs-style">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                 | Default                                               |
| ----------------------------- | ----------------------------------------------------- |
| $select-background-color      | #fff                                                  |
| $select-border-color          | var(--#{$prefix}grey-lighter)                         |
| $select-border-style          | solid                                                 |
| $select-border-width          | 1px                                                   |
| $select-border-radius         | var(--#{$prefix}base-border-radius)                   |
| $select-rounded-border-radius | var( --#{$prefix}base-border-radius-rounded)          |
| $select-box-shadow            | $control-box-shadow                                   |
| $select-color                 | #363636                                               |
| $select-icon-zindex           | 4                                                     |
| $select-height                | $control-height                                       |
| $select-line-height           | var(--#{$prefix}base-line-height)                     |
| $select-margin                | 0                                                     |
| $select-padding               | $control-padding-vertical $control-padding-horizontal |
| $select-arrow-color           | $select-color                                         |
| $select-arrow-size            | 1rem                                                  |
| $select-placeholder-opacity   | var(--#{$prefix}base-disabled-opacity)                |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_select.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</section>

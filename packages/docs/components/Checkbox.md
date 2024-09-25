# Checkbox

<div class="vp-doc">

> Select a single or grouped options

</div>

<div class="vp-example">

## Examples

<example-checkbox />

</div>
<div class="vp-example">

## Class props

<inspector-checkbox-viewer />

</div>

<div class="vp-doc">

## Checkbox component

> Select a single or grouped options

```html
<o-checkbox></o-checkbox>
```

### Props

| Prop name          | Description                                                                         | Type                                                                   | Values                                                                          | Default                                                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| autocomplete       | Same as native autocomplete options to use in HTML5 validation                      | string                                                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>checkbox: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code> |
| customValidity     | Custom HTML 5 validation error to set on the form control                           | string \| ((currentValue: boolean, state: ValidityState) =&gt; string) | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                               |
| disabled           | Same as native disabled                                                             | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                            |
| falseValue         | Overrides the returned value when it's not checked                                  | string\|number\|boolean\|object                                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                            |
| id                 | Same as native id. Also set the for label for o-field wrapper - default is an uuid. | string                                                                 | -                                                                               | Default function (see source code)                                                                                                                     |
| indeterminate      | Same as native indeterminate                                                        | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                            |
| label              | Input label, unnecessary when default slot is used                                  | string                                                                 | -                                                                               |                                                                                                                                                        |
| v-model            | The input value state                                                               | string\|number\|boolean\|object\|array                                 | -                                                                               |                                                                                                                                                        |
| name               | Same as native name                                                                 | string                                                                 | -                                                                               |                                                                                                                                                        |
| nativeValue        | Same as native value                                                                | string\|number\|boolean\|object                                        | -                                                                               |                                                                                                                                                        |
| override           | Override existing theme classes completely                                          | boolean                                                                | -                                                                               |                                                                                                                                                        |
| required           | Same as native required                                                             | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                            |
| size               | Size of the control                                                                 | string                                                                 | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>checkbox: {<br>&nbsp;&nbsp;size: undefined<br>}</code>     |
| trueValue          | Overrides the returned value when it's checked                                      | string\|number\|boolean\|object                                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                             |
| useHtml5Validation | Enable HTML 5 native validation                                                     | boolean                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>      |
| variant            | Color of the control                                                                | string                                                                 | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>checkbox: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |

### Events

| Event name           | Properties                                                                                                    | Description                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| update:modelValue    | **value** `string \| number \| boolean \| object \| array` - updated modelValue prop                          | modelValue prop two-way binding    |
| input                | **value** `string \| number \| boolean \| object \| array` - input value<br/>**event** `Event` - native event | on input change event              |
| update:indeterminate | **value** `boolean` - updated indeterminate prop                                                              | indeterminate prop two-way binding |
| focus                | **event** `Event` - native event                                                                              | on input focus event               |
| blur                 | **event** `Event` - native event                                                                              | on input blur event                |
| invalid              | **event** `Event` - native event                                                                              | on input invalid event             |

### Slots

| Name    | Description                         | Bindings |
| ------- | ----------------------------------- | -------- |
| default | Content slot, default is label prop |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                        | Default                                |
| ------------------------------------ | -------------------------------------- |
| $checkbox-active-background-color    | var(--#{$prefix}primary)               |
| $checkbox-background-color           | var(--#{$prefix}primary)               |
| $checkbox-box-shadow                 | $control-box-shadow                    |
| $checkbox-border-color               | var(--#{$prefix}primary)               |
| $checkbox-border-style               | solid                                  |
| $checkbox-border-radius              | var(--#{$prefix}base-border-radius)    |
| $checkbox-border-width               | 2px                                    |
| $checkbox-checked-box-shadow-length  | 0 0 0.5em                              |
| $checkbox-checked-box-shadow-opacity | 0.8                                    |
| $checkbox-checkmark-color            | $primary-invert                        |
| $checkbox-disabled-opacity           | var(--#{$prefix}base-disabled-opacity) |
| $checkbox-label-padding              | 0 0 0 0.5em                            |
| $checkbox-margin-sibiling            | 0.5em                                  |
| $checkbox-size                       | 1rem                                   |
| $checkbox-line-height                | 1.5                                    |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_checkbox.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                     | Default                                                               |
| --------------------------------- | --------------------------------------------------------------------- |
| $checkbox-size                    | 1.25em                                                                |
| $checkbox-colors                  | var.$colors                                                           |
| $checkbox-background-color        | transparent                                                           |
| $checkbox-border-color            | css.getVar("grey")                                                    |
| $checkbox-border-radius           | css.getVar("radius")                                                  |
| $checkbox-border-width            | 2px                                                                   |
| $checkbox-checkmark-color         | css.getVar("primary-invert")                                          |
| $checkbox-focus-color             | hsl(from css.getVar("grey") h s l / 80%)                              |
| $checkbox-active-focus-color      | hsl( from css.getVar("checkbox-active-background-color") h s l / 80%) |
| $checkbox-active-background-color | css.getVar("primary")                                                 |
| $checkbox-shadow                  | css.getVar("shadow")                                                  |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_checkbox.scss)

</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>

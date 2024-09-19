# Input

<div class="vp-doc">

> Get user Input. Use with Field to access all functionalities

</div>

<div class="vp-example">

## Examples

<example-input />

</div>
<div class="vp-example">

## Class props

<inspector-input-viewer />

</div>

<div class="vp-doc">

## Input component

> Get user Input. Use with Field to access all functionalities

```html
<o-input></o-input>
```

### Props

| Prop name          | Description | Type | Values | Default                                                                                                                                                   |
| ------------------ | ----------- | ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>       |
| autosize           |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| clearIcon          |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;clearIcon: "close-circle"<br>}</code> |
| clearable          |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;clearable: false<br>}</code>          |
| counter            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;counter: false<br>}</code>            |
| customValidity     |             |      | -      | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                  |
| debounce           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;debounce: 400<br>}</code>      |
| disabled           |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| expanded           |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| icon               |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>           |
| iconClickable      |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| iconPack           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>       |
| iconRight          |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>      |
| iconRightClickable |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| iconRightVariant   |             |      | -      |                                                                                                                                                           |
| id                 |             |      | -      | <code style='white-space: nowrap; padding: 0;'>uuid()</code>                                                                                              |
| maxlength          |             |      | -      |                                                                                                                                                           |
| v-model            |             |      | -      |                                                                                                                                                           |
| override           |             |      | -      |                                                                                                                                                           |
| passwordReveal     |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| placeholder        |             |      | -      |                                                                                                                                                           |
| rounded            |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| size               |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| statusIcon         |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;statusIcon: true<br>}</code>                 |
| type               |             |      | -      | <code style='white-space: nowrap; padding: 0;'>"text"</code>                                                                                              |
| useHtml5Validation |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>         |
| variant            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>        |

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

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                | Default                                               |
| ---------------------------- | ----------------------------------------------------- |
| $input-background-color      | #ffffff                                               |
| $input-border-color          | var(--#{$prefix}grey-lighter)                         |
| $input-border-style          | solid                                                 |
| $input-border-width          | 1px                                                   |
| $input-border-radius         | var(--#{$prefix}base-border-radius)                   |
| $input-rounded-border-radius | var( --#{$prefix}base-border-radius-rounded)          |
| $input-box-shadow            | $control-box-shadow                                   |
| $input-color                 | #363636                                               |
| $input-icon-zindex           | 4                                                     |
| $input-height                | $control-height                                       |
| $input-line-height           | var(--#{$prefix}base-line-height)                     |
| $input-margin                | 0                                                     |
| $input-padding               | $control-padding-vertical $control-padding-horizontal |
| $input-counter-font-size     | 0.75rem                                               |
| $input-counter-margin        | 0.25rem 0 0 0.5rem                                    |
| $input-textarea-max-height   | 600px                                                 |
| $input-textarea-min-height   | 120px                                                 |
| $input-textarea-padding      | 0.625em                                               |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_input.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable          | Default      |
| ---------------------- | ------------ |
| $input-icon-color      | $input-color |
| $input-icon-spacer     | 0.75rem      |
| $input-icon-padding-sm | 2rem         |
| $input-icon-padding    | 2.5rem       |
| $input-icon-padding-lg | 3rem         |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_input.scss)

</div>

</div>

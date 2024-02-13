---
title: Input
---

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

| Prop name          | Description                                                                          | Type           | Values                                                                          | Default                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------ | -------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaLabelledby     | Accessibility label to establish relationship between the checkbox and control label | string         | -                                                                               | Default function (see source code)                                                                                                                        |
| autocomplete       | Native options to use in HTML5 validation                                            | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>       |
| autosize           | Automatically adjust height in textarea                                              | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| clearIcon          | Icon name to be added on the clear button                                            | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;clearIcon: "close-circle"<br>}</code> |
| clearable          | Add a button/icon to clear the inputed text                                          | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;clearable: false<br>}</code>          |
| counter            | Show character counter when maxlength prop is passed                                 | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;counter: false<br>}</code>            |
| disabled           | Same as native disabled                                                              | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| expanded           | Makes input full width when inside a grouped or addon field                          | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| icon               | Icon to be shown                                                                     | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>           |
| iconClickable      | Makes the icon clickable                                                             | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| iconPack           | Icon pack to use                                                                     | string         | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>       |
| iconRight          | Icon to be added on the right side                                                   | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>      |
| iconRightClickable | Make the icon right clickable                                                        | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| iconRightVariant   | Variant of right icon                                                                | string         | -                                                                               |                                                                                                                                                           |
| maxlength          | Same as native maxlength, plus character counter                                     | number\|string | -                                                                               |                                                                                                                                                           |
| override           | Override existing theme classes completely                                           | boolean        | -                                                                               |                                                                                                                                                           |
| passwordReveal     | Adds the reveal password functionality                                               | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| placeholder        | Input placeholder                                                                    | string         | -                                                                               |                                                                                                                                                           |
| rounded            | Makes the element rounded                                                            | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| size               | Size of the control                                                                  | string         | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| statusIcon         | Show status icon using field and variant prop                                        | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;statusIcon: true<br>}</code>                 |
| type               | Input type, like native                                                              | string         | `Any native input type`, `and textarea`                                         | <code style='white-space: nowrap; padding: 0;'>"text"</code>                                                                                              |
| useHtml5Validation | Enable html 5 native validation                                                      | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>         |
| v-model            |                                                                                      | string\|number | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                  |
| validationMessage  | The message which is shown when a validation error occurs                            | string         | -                                                                               |                                                                                                                                                           |
| variant            | Color of the control                                                                 | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>        |

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

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                | Default                                               |
| ---------------------------- | ----------------------------------------------------- |
| $input-background-color      | #ffffff                                               |
| $input-border-color          | $grey-lighter                                         |
| $input-border-style          | solid                                                 |
| $input-border-width          | 1px                                                   |
| $input-border-radius         | $base-border-radius                                   |
| $input-rounded-border-radius | $base-rounded-border-radius                           |
| $input-box-shadow            | inset 0 1px 2px hsla(0, 0%, 4%, 0.1)                  |
| $input-color                 | #363636                                               |
| $input-icon-zindex           | 4                                                     |
| $input-counter-font-size     | 0.75rem                                               |
| $input-counter-margin        | 0.25rem 0 0 0.5rem                                    |
| $input-height                | $control-height                                       |
| $input-line-height           | $base-line-height                                     |
| $input-margin                | 0                                                     |
| $input-padding               | $control-padding-vertical $control-padding-horizontal |
| $input-textarea-max-height   | 600px                                                 |
| $input-textarea-min-height   | 120px                                                 |
| $input-textarea-padding      | 0.625em                                               |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_input.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                | Default                                               |
| ---------------------------- | ----------------------------------------------------- |
| $input-background-color      | #ffffff                                               |
| $input-border-color          | $grey-lighter                                         |
| $input-border-style          | solid                                                 |
| $input-border-width          | 1px                                                   |
| $input-border-radius         | $base-border-radius                                   |
| $input-rounded-border-radius | $base-rounded-border-radius                           |
| $input-box-shadow            | inset 0 1px 2px hsla(0, 0%, 4%, 0.1)                  |
| $input-color                 | #363636                                               |
| $input-icon-zindex           | 4                                                     |
| $input-counter-font-size     | 0.75rem                                               |
| $input-counter-margin        | 0.25rem 0 0 0.5rem                                    |
| $input-height                | $control-height                                       |
| $input-line-height           | $base-line-height                                     |
| $input-margin                | 0                                                     |
| $input-padding               | $control-padding-vertical $control-padding-horizontal |
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

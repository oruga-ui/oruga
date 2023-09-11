---
title: Input
---

# Input

<div class="vp-doc">

> Get user Input. Use with Field to access all functionalities

<Carbon />
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

```html
<o-input></o-input>
```

### Props

| Prop name          | Description                                                 | Type           | Values                                                                          | Default                                                                                                                                                    |
| ------------------ | ----------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Native options to use in HTML5 validation                   | string         | -                                                                               |                                                                                                                                                            |
| autosize           | Automatically adjust height in textarea                     | boolean        | -                                                                               | false                                                                                                                                                      |
| clearIcon          | Icon name to be added on the clear button                   | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> input: {<br>&nbsp;&nbsp;clearIcon: 'close-circle'<br>}</code> |
| clearable          | Add a button/icon to clear the inputed text                 | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> input: {<br>&nbsp;&nbsp;clearable: false<br>}</code>          |
| expanded           | Makes input full width when inside a grouped or addon field | boolean        | -                                                                               |                                                                                                                                                            |
| hasCounter         | Show character counter when maxlength prop is passed        | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> input: {<br>&nbsp;&nbsp;counter: false<br>}</code>            |
| icon               | Icon name to be added                                       | string         | -                                                                               |                                                                                                                                                            |
| iconClickable      | Makes the icon clickable                                    | boolean        | -                                                                               |                                                                                                                                                            |
| iconPack           | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                                                                                                                            |
| iconRight          | Icon name to be added on the right side                     | string         | -                                                                               |                                                                                                                                                            |
| iconRightClickable | Make the icon right clickable                               | boolean        | -                                                                               |                                                                                                                                                            |
| iconRightVariant   | Variant of right icon                                       | string         | -                                                                               |                                                                                                                                                            |
| maxlength          | Same as native maxlength, plus character counter            | number\|string | -                                                                               |                                                                                                                                                            |
| override           |                                                             | boolean        | -                                                                               |                                                                                                                                                            |
| passwordReveal     | Adds the reveal password functionality                      | boolean        | -                                                                               |                                                                                                                                                            |
| rounded            | Makes the element rounded                                   | boolean        | -                                                                               |                                                                                                                                                            |
| size               | Vertical size of input, optional                            | string         | `small`, `medium`, `large`                                                      |                                                                                                                                                            |
| statusIcon         | Show status icon using field and variant prop               | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>               |
| type               | Input type, like native                                     | string         | `Any native input type`, `and textarea`                                         | 'text'                                                                                                                                                     |
| useHtml5Validation | Enable html 5 native validation                             | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>       |
| v-model            |                                                             | number\|string | -                                                                               |                                                                                                                                                            |
| validationMessage  | The message which is shown when a validation error occurs   | string         | -                                                                               |                                                                                                                                                            |
| variant            | Color of the control, optional                              | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                            |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| blur              |            |
| focus             |            |
| invalid           |            |
| update:modelValue |            |
| input             |            |
| icon-click        |            |
| icon-right-click  |            |

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

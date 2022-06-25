---
title: Input
---

# Input

> Get user Input. Use with Field to access all functionalities

---

## Examples

 <example-input />

## Class props

<br />

<inspector-input-viewer />

<br />
<br />

## Props

| Prop name          | Description                                                 | Type           | Values                                                                          | Default                                                                                                                                  |
| ------------------ | ----------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Native options to use in HTML5 validation                   | string         | -                                                                               |                                                                                                                                          |
| autosize           | Automatically adjust height in textarea                     | boolean        | -                                                                               | false                                                                                                                                    |
| clearable          | Add a button/icon to clear the inputed text                 | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> input: {<br>&nbsp;&nbsp;clearable: false<br>}</code>    |
| expanded           | Makes input full width when inside a grouped or addon field | boolean        | -                                                                               |                                                                                                                                          |
| hasCounter         | Show character counter when maxlength prop is passed        | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> input: {<br>&nbsp;&nbsp;counter: false<br>}</code>      |
| icon               | Icon name to be added                                       | string         | -                                                                               |                                                                                                                                          |
| iconClickable      | Makes the icon clickable                                    | boolean        | -                                                                               |                                                                                                                                          |
| iconPack           | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                                                                                                          |
| iconRight          | Icon name to be added on the right side                     | string         | -                                                                               |                                                                                                                                          |
| iconRightClickable | Make the icon right clickable                               | boolean        | -                                                                               |                                                                                                                                          |
| iconRightVariant   | Variant of right icon                                       | string         | -                                                                               |                                                                                                                                          |
| maxlength          | Same as native maxlength, plus character counter            | number\|string | -                                                                               |                                                                                                                                          |
| override           |                                                             | boolean        | -                                                                               |                                                                                                                                          |
| passwordReveal     | Adds the reveal password functionality                      | boolean        | -                                                                               |                                                                                                                                          |
| rounded            | Makes the element rounded                                   | boolean        | -                                                                               |                                                                                                                                          |
| size               | Vertical size of input, optional                            | string         | `small`, `medium`, `large`                                                      |                                                                                                                                          |
| statusIcon         | Show status icon using field and variant prop               | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>         |
| type               | Input type, like native                                     | string         | `Any native input type`, `and textarea`                                         | 'text'                                                                                                                                   |
| useHtml5Validation | Enable html 5 native validation                             | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code> |
| v-model            |                                                             | number\|string | -                                                                               |                                                                                                                                          |
| validationMessage  | The message which is shown when a validation error occurs   | string         | -                                                                               |                                                                                                                                          |
| variant            | Color of the control, optional                              | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                          |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| blur              |            |
| focus             |            |
| update:modelValue |            |
| icon-click        |            |
| icon-right-click  |            |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__input.scss.scss)

| CSS Variable                        | SASS Variable                 | Default                                               |
| ----------------------------------- | ----------------------------- | ----------------------------------------------------- |
| --oruga-input-background-color      | \$input-background-color      | #ffffff                                               |
| --oruga-input-border-color          | \$input-border-color          | \$grey-lighter                                        |
| --oruga-input-border-style          | \$input-border-style          | solid                                                 |
| --oruga-input-border-width          | \$input-border-width          | 1px                                                   |
| --oruga-input-border-radius         | \$input-border-radius         | \$base-border-radius                                  |
| --oruga-input-rounded-border-radius | \$input-rounded-border-radius | \$base-rounded-border-radius                          |
| --oruga-input-box-shadow            | \$input-box-shadow            | inset 0 1px 2px hsla(0,0%,4%,.1)                      |
| --oruga-input-color                 | \$input-color                 | #363636                                               |
| --oruga-input-icon-zindex           | \$input-icon-zindex           | 4                                                     |
| --oruga-input-counter-font-size     | \$input-counter-font-size     | .75rem                                                |
| --oruga-input-counter-margin        | \$input-counter-margin        | .25rem 0 0 .5rem                                      |
| --oruga-input-height                | \$input-height                | \$control-height                                      |
| --oruga-input-line-height           | \$input-line-height           | \$base-line-height                                    |
| --oruga-input-margin                | \$input-margin                | 0                                                     |
| --oruga-input-padding               | \$input-padding               | $control-padding-vertical $control-padding-horizontal |
| --oruga-input-textarea-max-height   | \$input-textarea-max-height   | 600px                                                 |
| --oruga-input-textarea-min-height   | \$input-textarea-min-height   | 120px                                                 |
| --oruga-input-textarea-padding      | \$input-textarea-padding      | 0.625em                                               |
| --oruga-input-width                 | \$input-width                 | 100%                                                  |
| --oruga-input-max-width             | \$input-max-width             | 100%                                                  |

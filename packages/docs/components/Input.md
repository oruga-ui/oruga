# Input

<section class="odocs-head">

The **Input** component uses [HTML's native text input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text).
It allows a user to enter a single line of text.
Combine it with the [Field](/components/Field) component to access all functionalities.

</section>

<section class="odocs-examples">

## Examples

<example-input />

</section>

<section class="odocs-specs">

## Input component

> Get user Input. Use with Field to access all functionalities.

```html
<o-input></o-input>
```

### Props

| Prop name          | Description                                                                         | Type                                                                                                  | Values                                                                          | Default                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Native options to use in HTML5 validation                                           | string                                                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>       |
| autosize           | Automatically adjust height in textarea                                             | boolean                                                                                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| clearIcon          | Icon name to be added on the clear button                                           | string                                                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;clearIcon: "close-circle"<br>}</code> |
| clearable          | Add a button/icon to clear the inputed text                                         | boolean                                                                                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;clearable: false<br>}</code>          |
| counter            | Show character counter when maxlength prop is passed                                | boolean                                                                                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;counter: false<br>}</code>            |
| customValidity     | Custom HTML 5 validation error to set on the form control                           | string \| ((currentValue: string \| number \| null , state: ValidityState) =&gt; string) \| undefined | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                  |
| debounce           | Number of milliseconds to delay before to emit input event                          | number                                                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;debounce: 400<br>}</code>      |
| disabled           | Same as native disabled                                                             | boolean                                                                                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| expanded           | Makes input full width when inside a grouped or addon field                         | boolean                                                                                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;expanded: false<br>}</code>           |
| icon               | Icon to be shown                                                                    | string                                                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>           |
| iconClickable      | Makes the icon clickable                                                            | boolean                                                                                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| iconPack           | Icon pack to use                                                                    | string                                                                                                | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>       |
| iconRight          | Icon to be added on the right side                                                  | string                                                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>      |
| iconRightClickable | Make the icon right clickable                                                       | boolean                                                                                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| iconRightVariant   | Variant of right icon                                                               | string                                                                                                | -                                                                               |                                                                                                                                                           |
| id                 | Same as native id. Also set the for label for o-field wrapper - default is an uuid. | string                                                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                             |
| maxlength          | Same as native maxlength, plus character counter                                    | number \| string                                                                                      | -                                                                               |                                                                                                                                                           |
| modelModifiers     |                                                                                     | Partial&lt;Record&lt;string, true&gt;&gt;                                                             | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                    |
| v-model            | The input value state                                                               | number \| string                                                                                      | -                                                                               |                                                                                                                                                           |
| number             | Convert the ´modelValue`into type`number`                                           | boolean                                                                                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                    |
| override           | Override existing theme classes completely                                          | boolean                                                                                               | -                                                                               |                                                                                                                                                           |
| passwordReveal     | Adds the reveal password functionality                                              | boolean                                                                                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| placeholder        | Input placeholder                                                                   | string                                                                                                | -                                                                               |                                                                                                                                                           |
| rounded            | Makes the element rounded                                                           | boolean                                                                                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                               |
| size               | Size of the control                                                                 | string                                                                                                | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| statusIcon         | Show status icon using field and variant prop                                       | boolean                                                                                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;statusIcon: true<br>}</code>                 |
| type               | Input type, like native                                                             | string                                                                                                | `Any native input type`, `and textarea`                                         | <code style='white-space: nowrap; padding: 0;'>"text"</code>                                                                                              |
| useHtml5Validation | Enable HTML 5 native validation                                                     | boolean                                                                                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>         |
| variant            | Color of the control                                                                | string                                                                                                | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>input: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>        |

### Events

| Event name         | Properties                                                            | Description                     |
| ------------------ | --------------------------------------------------------------------- | ------------------------------- |
| update:model-value | **value** `string \| number` - updated modelValue prop                | modelValue prop two-way binding |
| input              | **value** `string` - input value<br/>**event** `Event` - native event | on input change event           |
| focus              | **event** `Event` - native event                                      | on input focus event            |
| blur               | **event** `Event` - native event                                      | on input blur event             |
| invalid            | **event** `Event` - native event                                      | on input invalid event          |
| icon-click         | **event** `Event` - native event                                      | on icon click event             |
| icon-right-click   | **event** `Event` - native event                                      | on icon right click event       |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-input-viewer />

</section>

<section class="odocs-style">

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
| $input-counter-margin        | 0.25rem 0.5rem                                        |
| $input-textarea-max-height   | 600px                                                 |
| $input-textarea-min-height   | 120px                                                 |
| $input-textarea-padding      | 0.625em                                               |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_input.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable | Default    |
| ------------- | ---------- |
| $input-colors | dv.$colors |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_input.scss)

</div>
<div class="theme-bootstrap">

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

</section>

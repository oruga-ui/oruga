# Radio

<section class="odocs-head">

The **Radio** input component uses [HTML's native radio inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) to allow a user to select one value from a set of options.
The component supports the W3C ARIA APG [Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).
Use it with the [Field](/components/Field) component to access all the functionalities.

</section>

<section class="odocs-examples">

## Examples

<example-radio />

</section>

<section class="odocs-specs">

## Radio Component

> Select an option from a set of options.

```html
<o-radio></o-radio>
```

### Props

| Prop name          | Description                                                                                  | Type                                                                   | Values                                                                          | Default                                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Same as native autocomplete options to use in HTML5 validation                               | string                                                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>radio: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code> |
| customValidity     | Custom HTML 5 validation error to set on the form control                                    | string \| ((currentValue: unknown, state: ValidityState) =&gt; string) | -                                                                               |                                                                                                                                                     |
| disabled           | Same as native disabled                                                                      | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| id                 | Same as native id. Also pass the id to an wrapping `o-field` component - default is an uuid. | string                                                                 | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                       |
| label              | Input label, unnecessary when default slot is used                                           | string                                                                 | -                                                                               |                                                                                                                                                     |
| v-model            | The input value state, use v-model to make it two-way binding                                | unknown                                                                | -                                                                               |                                                                                                                                                     |
| name               | Same as native name                                                                          | string                                                                 | -                                                                               |                                                                                                                                                     |
| nativeValue        | Same as native value                                                                         | unknown                                                                | -                                                                               |                                                                                                                                                     |
| override           | Override existing theme classes completely                                                   | boolean                                                                | -                                                                               |                                                                                                                                                     |
| required           | Same as native required                                                                      | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| size               | Size of the control                                                                          | string                                                                 | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>radio: {<br>&nbsp;&nbsp;size: undefined<br>}</code>     |
| useHtml5Validation | Enable html 5 native validation                                                              | boolean                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>   |
| variant            | Color variant of the control                                                                 | string                                                                 | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>radio: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |

### Events

| Event name         | Properties                                                             | Description                     |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------- |
| update:model-value | **value** `unknown` - updated modelValue prop                          | modelValue prop two-way binding |
| input              | **value** `unknown` - input value<br/>**event** `Event` - native event | on input change event           |
| focus              | **event** `Event` - native event                                       | on input focus event            |
| blur               | **event** `Event` - native event                                       | on input blur event             |
| invalid            | **event** `Event` - native event                                       | on input invalid event          |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-radio-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                                     |
| --------------------------------- | ------------------------------------------- |
| $radio-spacer                     | h.useVar("control-spacer")                  |
| $radio-disabled-opacity           | h.useVar("control-disabled-opacity")        |
| $radio-width                      | 1em                                         |
| $radio-height                     | 1em                                         |
| $radio-color                      | h.useVar("font-color")                      |
| $radio-font-size                  | h.useVar("font-size")                       |
| $radio-font-weight                | h.useVar("font-weight")                     |
| $radio-line-height                | h.useVar("line-height")                     |
| $radio-box-shadow                 | h.useVar("control-box-shadow-inset")        |
| $radio-border-color               | h.useVar("primary")                         |
| $radio-border-style               | solid                                       |
| $radio-border-radius              | h.useVar("border-radius-rounded")           |
| $radio-border-width               | calc(2 \* h.useVar("control-border-width")) |
| $radio-background-color           | h.useVar("white")                           |
| $radio-active-background-color    | h.useVar("primary")                         |
| $radio-checked-box-shadow-length  | 0 0 0.5em                                   |
| $radio-checked-box-shadow-opacity | 0.8                                         |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_radio.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                  | Default               |
| ------------------------------ | --------------------- |
| $radio-size                    | 1.25em                |
| $radio-colors                  | dv.$colors            |
| $radio-active-background-color | css.getVar("primary") |
| $radio-border-color            | css.getVar("grey")    |
| $radio-shadow                  | css.getVar("shadow")  |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_radio.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</section>

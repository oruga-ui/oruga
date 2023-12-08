---
title: Switch
---

# Switch

<div class="vp-doc">

> Switch between two opposing states

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">
</div>

<div class="vp-doc">

## Switch component

> Switch between two opposing states

```html
<o-switch></o-switch>
```

### Props

| Prop name          | Description                                                                         | Type                    | Values                                                                          | Default                                                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaLabelledby     | Accessibility label to establish relationship between the switch and control label' | string                  | -                                                                               | Default function (see source code)                                                                                                                         |
| autocomplete       | Same as native autocomplete options to use in HTML5 validation                      | string                  | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>       |
| disabled           | Same as native disabled                                                             | boolean                 | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| falseValue         | Overrides the returned value when it's not checked                                  | string\|number\|boolean | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| label              | Input label, unnecessary when default slot is used                                  | string                  | -                                                                               |                                                                                                                                                            |
| name               | Name attribute on native checkbox                                                   | string                  | -                                                                               |                                                                                                                                                            |
| nativeValue        | Same as native value                                                                | string\|number\|boolean | -                                                                               |                                                                                                                                                            |
| passiveVariant     | Color of the switch when is passive                                                 | string                  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;passiveVariant: undefined<br>}</code> |
| position           | Label position                                                                      | string                  | -                                                                               | <code style='white-space: nowrap; padding: 0;'>"right"</code>                                                                                              |
| required           | Same as native required                                                             | boolean                 | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| rounded            | Rounded style                                                                       | boolean                 | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                 |
| size               | Size of the control                                                                 | string                  | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| trueValue          | Overrides the returned value when it's checked                                      | string\|number\|boolean | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                 |
| useHtml5Validation | Enable html 5 native validation                                                     | boolean                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>          |
| v-model            |                                                                                     | string\|number\|boolean | -                                                                               |                                                                                                                                                            |
| variant            | Color of the control                                                                | string                  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>        |

### Events

| Event name        | Properties                                                                             | Description                     |
| ----------------- | -------------------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `string \| number \| boolean` - updated modelValue prop                      | modelValue prop two-way binding |
| input             | **value** `string, number, boolean` - input value<br/>**event** `Event` - native event | on input change event           |
| focus             | **event** `Event` - native event                                                       | on input focus event            |
| blur              | **event** `Event` - native event                                                       | on input blur event             |
| invalid           | **event** `Event` - native event                                                       | on input invalid event          |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</div>

<div class="vp-doc">
</div>

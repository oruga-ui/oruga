# Collapse

<section class="odocs-head">

The **Collapse** component is a disclosure widget that displ information only when toggled to the open state.
The component is implemented based on the [HTML \<details\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) and consists of two elements: a disclosure label (trigger) and a section of content whose visibility it controls.
This component also implements the W3C ARIA APG [Disclosure (Show/Hide) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) and also supports the W3C ARIA APG [Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

</section>

<section class="odocs-examples">

## Examples

<example-collapse />

</section>

<section class="odocs-specs">

## Collapse Component

> An easy disclosure widget to toggle content visability.

```html
<o-collapse></o-collapse>
```

### Props

| Prop name | Description                                                                                                                                                                    | Type              | Values          | Default                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| contentId | Id property of the content container - default is an uuid                                                                                                                      | string            | -               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                         |
| expanded  | Expand the trigger to fullwidth                                                                                                                                                | boolean           | -               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| label     | Some label displayed in the summary element - unnecessary when trigger slot is used                                                                                            | string            | -               |                                                                                                                                                       |
| name      | Setting the same name to multiple collapse elements connects them together,<br/>with only one open at a time.<br/>This allows to easily create UI features such as accordions. | string            | -               |                                                                                                                                                       |
| open      | Whether collapse is open or not, use v-model:open to make it two-way binding                                                                                                   | boolean           | -               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| override  | Override existing theme classes completely                                                                                                                                     | boolean           | -               |                                                                                                                                                       |
| position  | Trigger position                                                                                                                                                               | "bottom" \| "top" | `top`, `bottom` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>collapse: {<br>&nbsp;&nbsp;position: "bottom"<br>}</code> |
| triggerId | Id property of the trigger container - default is an uuid                                                                                                                      | string            | -               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                         |

### Events

| Event name  | Properties                                        | Description               |
| ----------- | ------------------------------------------------- | ------------------------- |
| update:open | **value** `boolean` - updated open prop           | open prop two-way binding |
| open        | **event** `ToggleEvent` - the native toggle event | on collapse opened        |
| close       | **event** `ToggleEvent` - the native toggle event | on collapse closed        |

### Slots

| Name    | Description                         | Bindings                                 |
| ------- | ----------------------------------- | ---------------------------------------- |
| trigger | Define the collapse trigger element | **open** `boolean` - collapse open state |
| default | Content to collapse                 |                                          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-collapse-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable | Default |
| ------------- | ------- |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_collapse.scss)

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

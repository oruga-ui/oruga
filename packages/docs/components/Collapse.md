# Collapse

<section class="odocs-head">

The **Collapse** component is an easy way to toggle the visibility of content with show/hide functionality.
It has two elements: a disclosure button and a section of content whose visibility is controlled by the button.
The component implements the W3C ARIA APG [Disclosure (Show/Hide) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) and also supports the W3C ARIA APG [Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

</section>

<section class="odocs-examples">

## Examples

<example-collapse />

</section>

<section class="odocs-specs">

## Collapse component

> An easy way to toggle what you want.

```html
<o-collapse></o-collapse>
```

### Props

| Prop name | Description                                                                  | Type              | Values          | Default                                                                                                                                              |
| --------- | ---------------------------------------------------------------------------- | ----------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation | Custom animation (transition name)                                           | string            | -               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>collapse: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code> |
| contentId | Id property of the content container - default is an uuid                    | string            | -               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                        |
| expanded  | Expand the trigger to fullwidth                                              | boolean           | -               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| open      | Whether collapse is open or not, use v-model:open to make it two-way binding | boolean           | -               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                           |
| override  | Override existing theme classes completely                                   | boolean           | -               |                                                                                                                                                      |
| position  | Trigger position                                                             | "bottom" \| "top" | `top`, `bottom` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>collapse: {<br>&nbsp;&nbsp;position: "top"<br>}</code>   |
| triggerId | Id property of the trigger container - default is an uuid                    | string            | -               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                        |

### Events

| Event name  | Properties                              | Description               |
| ----------- | --------------------------------------- | ------------------------- |
| update:open | **value** `boolean` - updated open prop | open prop two-way binding |
| open        |                                         | on collapse opened        |
| close       |                                         | on collapse closed        |

### Slots

| Name    | Description                 | Bindings                                 |
| ------- | --------------------------- | ---------------------------------------- |
| trigger | Define the collapse trigger | **open** `boolean` - collapse open state |
| default | Default content             |                                          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-collapse-viewer />

</section>

<section class="odocs-style">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable | Default |
| ------------- | ------- |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_collapse.scss)

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

# Breadcrumb

<div class="vp-doc">

</div>

<div class="vp-example">

## Examples

<example-breadcrumb />

</div>

<div class="vp-example">

## Class props

<inspector-breadcrumb-viewer />

</div>

<div class="vp-doc">

## Breadcrumb component

> The classic breadcrumb, in different colors, sizes, and states

```html
<o-breadcrumb></o-breadcrumb>
```

### Props

| Prop name | Description                                       | Type             | Values                                                                                                                                        | Default                                                                                                                                                               |
| --------- | ------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| align     | Position of the breadcrumb                        | string           | `left`, `centered`, `right`                                                                                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;align: "left"<br>}</code>                    |
| override  | Override existing theme classes completely        | boolean          | -                                                                                                                                             |                                                                                                                                                                       |
| separator | The breadcrumb separator between breadcrumb items | string           | ` has-arrow-separator`, `has-dot-separator`, `has-slash-separator`, `has-bullet-separator`, `has-succeeds-separator`, `has-chevron-separator` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;separator: "has-slash-separator"<br>}</code> |
| size      | Size of the breadcrumb                            | string           | `small`, `medium`, `large`                                                                                                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;size: "small"<br>}</code>                    |
| tag       | Tag of the breadcrumb                             | DynamicComponent | `div`, `section ...`                                                                                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;tag: "section"<br>}</code>                   |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>

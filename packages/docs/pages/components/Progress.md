[//]: # "This file is generated and should not be edited by hand!"

# Progress

<section class="odocs-head">

The **Progress** component displays the completion progress of a task, such as a download, a file upload or a page load. When the progress value is unknown, it can be displayed in an indeterminate state.

</section>

<section class="odocs-examples">

## Examples

<example-progress />

</section>

<section class="odocs-specs">

## Progress Component

> A bar showing the completion progress of a task.

```html
<o-progress></o-progress>
```

### Props

| Prop name | Description                                                                     | Type                           | Values                                                                          | Default                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| format    | Define the label format                                                         | "percent" \| "raw"             | `raw`, `percent`                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>progress: {<br>&nbsp;&nbsp;format: "raw"<br>}</code>      |
| formatter | Function to format the progress value for display, replaces the `format` prop   | ((value: number) =&gt; string) | -                                                                               |                                                                                                                                                       |
| locale    | Number format locale                                                            | string \| string[]             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;locale: undefined<br>}</code>            |
| max       | Maximum value                                                                   | number                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>100</code>                                                                                             |
| min       | Minimum value                                                                   | number                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                               |
| override  | Override existing theme classes completely                                      | boolean                        | -                                                                               |                                                                                                                                                       |
| rounded   | Enable rounded style                                                            | boolean                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>progress: {<br>&nbsp;&nbsp;rounded: false<br>}</code>     |
| showValue | Show the formatted progress value as a label                                    | boolean                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| size      | Size of the control                                                             | string                         | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>progress: {<br>&nbsp;&nbsp;size: undefined<br>}</code>    |
| value     | Current progress value, leave it undefined to display an indeterminate progress | number                         | -                                                                               |                                                                                                                                                       |
| variant   | Color variant of the control                                                    | string                         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>progress: {<br>&nbsp;&nbsp;variant: undefined<br>}</code> |

### Slots

| Name    | Description        | Bindings                                                                                                                                         |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| default | Override the label | **value** `number \| undefined` - the current progress value, undefined when indeterminate<br/>**label** `string` - the formatted progress value |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-progress />

</section>

<section class="odocs-style">

## Sass Variables

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
<div class="theme-tailwind">

> Current theme ➜ _[Tailwind](https://github.com/oruga-ui/theme-tailwind)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</section>

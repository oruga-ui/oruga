# Tag

<section class="odocs-head">

The **Tag** component (also known as _Badge_) is a small but versatile element. It's very useful as a way to attach information to a block or other components. Its size makes it also easy to display in numbers, making it appropriate for long lists of items.

</section>

<section class="odocs-examples">

## Examples

<example-tag />

</section>

<section class="odocs-specs">

## Tag Component

> Small tag labels to insert anywhere.

```html
<o-tag></o-tag>
```

### Props

| Prop name      | Description                                      | Type    | Values                                                                          | Default                                                                                                                                                |
| -------------- | ------------------------------------------------ | ------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ariaCloseLabel | Accessibility label for the close button         | string  | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tag: {<br>&nbsp;&nbsp;ariaCloseLabel: "Close"<br>}</code>  |
| badge          | Enable badge style                               | boolean | -                                                                               |                                                                                                                                                        |
| closeIcon      | Close icon name                                  | string  | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tag: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>       |
| closeIconSize  | Size of close icon                               | string  | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tag: {<br>&nbsp;&nbsp;closeIconSize: undefined<br>}</code> |
| closeable      | Add close button to close the item               | boolean | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                            |
| icon           | Adds an icon to the left of the tag              | string  | -                                                                               |                                                                                                                                                        |
| iconPack       | Icon pack to use                                 | string  | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tag: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>      |
| label          | Tag label, unnecessary when default slot is used | string  | -                                                                               |                                                                                                                                                        |
| override       | Override existing theme classes completely       | boolean | -                                                                               |                                                                                                                                                        |
| rounded        | Enable rounded style                             | boolean | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tag: {<br>&nbsp;&nbsp;rounded: false<br>}</code>           |
| size           | Size of the control                              | string  | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tag: {<br>&nbsp;&nbsp;size: undefined<br>}</code>          |
| variant        | Color variant of the breadcrumb                  | string  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tag: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>       |

### Events

| Event name | Properties                       | Description               |
| ---------- | -------------------------------- | ------------------------- |
| close      | **event** `Event` - native event | on close icon click event |

### Slots

| Name    | Description             | Bindings |
| ------- | ----------------------- | -------- |
| default | Override the tag label  |          |
| close   | Override the close icon |          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-tag-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable              | Default                           |
| -------------------------- | --------------------------------- |
| $tag-padding               | 0 0.75em                          |
| $tag-color                 | h.useVar("font-color")            |
| $tag-font-size             | h.useVar("font-size")             |
| $tag-font-weight           | h.useVar("font-weight")           |
| $tag-line-height           | h.useVar("line-height")           |
| $tag-height                | h.useVar("control-height")        |
| $tag-icon-spacer           | h.useVar("control-spacer")        |
| $tag-close-color           | h.useVar("font-color")            |
| $tag-box-shadow            | unset                             |
| $tag-background-color      | h.useVar("grey-lightest")         |
| $tag-border-color          | transparent                       |
| $tag-border-style          | solid                             |
| $tag-border-width          | h.useVar("control-border-width")  |
| $tag-border-radius         | h.useVar("border-radius")         |
| $tag-border-radius-rounded | h.useVar("border-radius-rounded") |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_tag.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable       | Default     |
| ------------------- | ----------- |
| $badge-bg           | $light      |
| $badge-color        | $dark       |
| $badge-icon-space   | 0.25em      |
| $badge-border-color | transparent |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_tag.scss)

</div>

</section>

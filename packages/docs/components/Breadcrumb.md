---
title: Breadcrumb
---

# Breadcrumb

> Breadcrumb component in different styles, colors, sizes

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/breadcrumb/examples/Breadcrumb.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<!-- code here -->
```

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_breadcrumb.scss)

<br />
<br />

## Props

| Prop name  | Description                              | Type    | Values                                                                          | Default                                                                                                                              |
| ---------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| disabled   | Button will be disabled                  | boolean | -                                                                               |                                                                                                                                      |
| expanded   | Button will be expanded (full-width)     | boolean | -                                                                               |                                                                                                                                      |
| iconLeft   | Icon name to show on the left            | string  | -                                                                               |                                                                                                                                      |
| iconPack   | Icon pack to use                         | string  | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                                                                                                      |
| iconRight  | Icon name to show on the right           | string  | -                                                                               |                                                                                                                                      |
| inverted   |                                          | boolean | -                                                                               |                                                                                                                                      |
| label      | Button label, optional when default slot | string  | -                                                                               |                                                                                                                                      |
| nativeType | Button type, like native                 | string  | -                                                                               | 'button'                                                                                                                             |
| outlined   | Outlined style                           | boolean | -                                                                               |                                                                                                                                      |
| override   | Override classes                         | boolean | -                                                                               | false                                                                                                                                |
| rounded    | Rounded style                            | boolean | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> button: {<br>&nbsp;&nbsp;rounded: false<br>}</code> |
| size       | Size of button, optional                 | string  | `small`, `medium`, `large`                                                      |                                                                                                                                      |
| tag        | Button tag name                          | string  | `button`, `a`, `input`, `router-link`, `nuxt-link (or other nuxt alias)`        | 'button'                                                                                                                             |
| variant    | Color of the control, optional           | string  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                      |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                         | SASS Variable                  | Default                             |
| ------------------------------------ | ------------------------------ | ----------------------------------- |
| --oruga-button-background-color      | \$button-background-color      | \$primary                           |
| --oruga-button-color                 | \$button-color                 | \$primary-invert                    |
| --oruga-button-border-radius         | \$button-border-radius         | \$base-border-radius                |
| --oruga-button-border                | \$button-border                | 1px solid \$button-background-color |
| --oruga-button-box-shadow            | \$button-box-shadow            | none                                |
| --oruga-button-font-weight           | \$button-font-weight           | 400                                 |
| --oruga-button-line-height           | \$button-line-height           | \$base-line-height                  |
| --oruga-button-margin-icon-to-text   | \$button-margin-icon-to-text   | .1875em                             |
| --oruga-button-margin                | \$button-margin                | 0                                   |
| --oruga-button-height                | \$button-height                | \$control-height                    |
| --oruga-button-padding               | \$button-padding               | \$control-padding-vertical .75em    |
| --oruga-button-rounded-border-radius | \$button-rounded-border-radius | \$base-rounded-border-radius        |
| --oruga-button-disabled-opacity      | \$button-disabled-opacity      | \$base-disabled-opacity             |

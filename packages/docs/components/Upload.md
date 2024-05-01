---
title: Upload
---

# Upload

<div class="vp-doc">

> Upload one or more files

</div>

<div class="vp-example">

## Examples

<example-upload />

</div>
<div class="vp-example">

## Class props

<inspector-upload-viewer />

</div>

<div class="vp-doc">

## Upload component

> Upload one or more files

```html
<o-upload></o-upload>
```

### Props

| Prop name          | Description                                                           | Type                                                 | Values                                                                          | Default                                                                                                                                             |
| ------------------ | --------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept             | Same as native accept                                                 | string                                               | -                                                                               |                                                                                                                                                     |
| disabled           | Same as native disabled                                               | boolean                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| dragDrop           | Accepts drag & drop and change its style                              | boolean                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| expanded           | Upload will be expanded (full-width)                                  | boolean                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| multiple           | Same as native, also push new item to v-model instead of replacing    | boolean                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| native             | Replace last chosen files every time (like native file input element) | boolean                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                          |
| override           | Override existing theme classes completely                            | boolean                                              | -                                                                               |                                                                                                                                                     |
| useHtml5Validation | Enable html 5 native validation                                       | boolean                                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>   |
| v-model            |                                                                       | object \| typeof File \| object[] \| (typeof File)[] | -                                                                               |                                                                                                                                                     |
| validationMessage  | The message which is shown when a validation error occurs             | string                                               | -                                                                               |                                                                                                                                                     |
| variant            | Color of the control                                                  | string                                               | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>upload: {<br>&nbsp;&nbsp;variant: undefined<br>}</code> |

### Events

| Event name        | Properties                                                                 | Description                     |
| ----------------- | -------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `Object \| Object[] \| File \| File[]` - updated modelValue prop | modelValue prop two-way binding |
| focus             | **event** `Event` - native event                                           | on input focus event            |
| blur              | **event** `Event` - native event                                           | on input blur event             |
| invalid           | **event** `Event` - native event                                           | on input invalid event          |

### Slots

| Name    | Description     | Bindings                                                                           |
| ------- | --------------- | ---------------------------------------------------------------------------------- |
| default | Default content | **onclick** `(event:Event): void` - click handler, only needed if a button is used |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                        | Default                |
| ------------------------------------ | ---------------------- |
| $upload-draggable-border             | 1px dashed $grey-light |
| $upload-draggable-border-radius      | $base-border-radius    |
| $upload-draggable-disabled-opacity   | $base-disabled-opacity |
| $upload-draggable-hover-border-color | $grey                  |
| $upload-draggable-padding            | 0.25em                 |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_upload.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                        | Default                |
| ------------------------------------ | ---------------------- |
| $upload-draggable-border             | 1px dashed $grey-light |
| $upload-draggable-border-radius      | $base-border-radius    |
| $upload-draggable-disabled-opacity   | $base-disabled-opacity |
| $upload-draggable-hover-border-color | $grey                  |
| $upload-draggable-padding            | 0.25em                 |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_upload.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                        | Default                         |
| ------------------------------------ | ------------------------------- |
| $upload-draggable-bg                 | transparent                     |
| $upload-draggable-bg-hover           | transparent                     |
| $upload-draggable-border-color       | var(--#{$prefix}border-color)   |
| $upload-draggable-border-color-hover | var(--#{$prefix}dark-bg-subtle) |
| $upload-draggable-border-width       | var(--#{$prefix}border-width)   |
| $upload-draggable-border-radius      | var(--#{$prefix}border-radius)  |
| $upload-draggable-padding            | 2em                             |
| $upload-disabled-opacity             | 0.5                             |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_upload.scss)

</div>

</div>

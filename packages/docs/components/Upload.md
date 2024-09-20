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

| Prop name          | Description | Type | Values | Default                                                                                                                                             |
| ------------------ | ----------- | ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept             |             |      | -      |                                                                                                                                                     |
| customValidity     |             |      | -      | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                            |
| disabled           |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| dragDrop           |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| expanded           |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| v-model            |             |      | -      |                                                                                                                                                     |
| native             |             |      | -      | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                          |
| override           |             |      | -      |                                                                                                                                                     |
| useHtml5Validation |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>   |
| variant            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>upload: {<br>&nbsp;&nbsp;variant: undefined<br>}</code> |

### Events

| Event name        | Properties                                                                 | Description                     |
| ----------------- | -------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `object \| object[] \| File \| File[]` - updated modelValue prop | modelValue prop two-way binding |
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

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                        | Default                                 |
| ------------------------------------ | --------------------------------------- |
| $upload-draggable-border             | 1px dashed var(--#{$prefix}grey-light)  |
| $upload-draggable-border-radius      | var(--#{$prefix}base-border-radius)     |
| $upload-draggable-disabled-opacity   | var( --#{$prefix}base-disabled-opacity) |
| $upload-draggable-hover-border-color | var(--#{$prefix}grey)                   |
| $upload-draggable-padding            | 0.25em                                  |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_upload.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable             | Default                  |
| ------------------------- | ------------------------ |
| $upload-colors            | file.$file-colors        |
| $upload-bg                | transparent              |
| $upload-draggable-padding | 0.5rem                   |
| $upload-border-color      | css.getVar("grey-light") |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_upload.scss)

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

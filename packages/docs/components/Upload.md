# Upload

<section class="odocs-head">

The **Upload** input component uses [HTML's native file input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file). It allows users to select files from their device for upload. In addition to native input features, it adds support for Drag and drop and clearing the input.
Use it with the [Field](/components/field.html) component to access all the functionalities.

</section>

<section class="odocs-examples">

## Examples

<example-upload />

</section>

<section class="odocs-specs">

## Upload component

> Upload one or more files.

```html
<o-upload></o-upload>
```

### Props

| Prop name          | Description                                                           | Type                                                                                                                                                                                                                                                                             | Values                                                                          | Default                                                                                                                                             |
| ------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept             | Same as native accept                                                 | string                                                                                                                                                                                                                                                                           | -                                                                               |                                                                                                                                                     |
| customValidity     | Custom HTML 5 validation error to set on the form control             | string \| ((currentValue: object \| ObjectConstructor \| { new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag ): File; prototype: File; } \| (object \| ... 1 more ... \| { ...; })[] \| null \| undefined, state: ValidityState) =&gt; string) \| undefined | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                            |
| disabled           | Same as native disabled                                               | boolean                                                                                                                                                                                                                                                                          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| dragDrop           | Accepts drag & drop and change its style                              | boolean                                                                                                                                                                                                                                                                          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| expanded           | Upload will be expanded (full-width)                                  | boolean                                                                                                                                                                                                                                                                          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| v-model            | The input value state                                                 | File \| object                                                                                                                                                                                                                                                                   | -                                                                               |                                                                                                                                                     |
| multiple           | Same as native, also push new item to v-model instead of replacing    | boolean                                                                                                                                                                                                                                                                          | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                              |
| native             | Replace last chosen files every time (like native file input element) | boolean                                                                                                                                                                                                                                                                          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                          |
| override           | Override existing theme classes completely                            | boolean                                                                                                                                                                                                                                                                          | -                                                                               |                                                                                                                                                     |
| useHtml5Validation | Enable HTML 5 native validation                                       | boolean                                                                                                                                                                                                                                                                          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>   |
| variant            | Color of the control                                                  | string                                                                                                                                                                                                                                                                           | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>upload: {<br>&nbsp;&nbsp;variant: undefined<br>}</code> |

### Events

| Event name         | Properties                                                                 | Description                     |
| ------------------ | -------------------------------------------------------------------------- | ------------------------------- |
| update:model-value | **value** `object \| object[] \| File \| File[]` - updated modelValue prop | modelValue prop two-way binding |
| focus              | **event** `Event` - native event                                           | on input focus event            |
| blur               | **event** `Event` - native event                                           | on input blur event             |
| invalid            | **event** `Event` - native event                                           | on input invalid event          |

### Slots

| Name    | Description     | Bindings                                                                           |
| ------- | --------------- | ---------------------------------------------------------------------------------- |
| default | Default content | **onclick** `(event:Event): void` - click handler, only needed if a button is used |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-upload-viewer />

</section>

<section class="odocs-style">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                        | Default                                 |
| ------------------------------------ | --------------------------------------- |
| $upload-draggable-border             | 1px dashed var(--#{$prefix}grey-light)  |
| $upload-draggable-border-radius      | var(--#{$prefix}base-border-radius)     |
| $upload-draggable-disabled-opacity   | var( --#{$prefix}base-disabled-opacity) |
| $upload-draggable-hover-border-color | var(--#{$prefix}grey)                   |
| $upload-draggable-padding            | 2em                                     |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_upload.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable             | Default                  |
| ------------------------- | ------------------------ |
| $upload-bg                | transparent              |
| $upload-draggable-padding | 2em                      |
| $upload-colors            | file.$file-colors        |
| $upload-border-color      | css.getVar("grey-light") |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_upload.scss)

</div>
<div class="theme-bootstrap">

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

</section>

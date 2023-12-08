---
title: Upload
---

# Upload

<div class="vp-doc">

> Upload one or more files

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">

## Class props

<inspector-Upload-viewer />

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

| Name    | Description     | Bindings |
| ------- | --------------- | -------- |
| default | Default content |          |

</div>

<div class="vp-doc">
</div>

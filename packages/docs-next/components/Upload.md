---
title: Upload
---

# Upload

<div class="vp-doc">

> Upload one or more files

</div>
<example-upload />

## Class props

<br />

<inspector-upload-viewer />

<br />
<br />

<div class="vp-doc">

## Props

| Prop name          | Description                                                           | Type                | Values                                                                          | Default                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| accept             | Same as native accept                                                 | string              | -                                                                               |                                                                                                                                          |
| autocomplete       | Native options to use in HTML5 validation                             | string              | -                                                                               |                                                                                                                                          |
| disabled           | Same as native disabled                                               | boolean             | -                                                                               |                                                                                                                                          |
| dragDrop           | Accepts drag & drop and change its style                              | boolean             | -                                                                               |                                                                                                                                          |
| expanded           | Upload will be expanded (full-width)                                  | boolean             | -                                                                               | false                                                                                                                                    |
| icon               | Icon name to be added                                                 | string              | -                                                                               |                                                                                                                                          |
| iconPack           | Icon pack to use                                                      | string              | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                                                                                                          |
| maxlength          | Same as native maxlength, plus character counter                      | number\|string      | -                                                                               |                                                                                                                                          |
| multiple           | Same as native, also push new item to v-model instead of replacing    | boolean             | -                                                                               |                                                                                                                                          |
| native             | Replace last chosen files every time (like native file input element) | boolean             | -                                                                               | false                                                                                                                                    |
| override           |                                                                       | boolean             | -                                                                               |                                                                                                                                          |
| rounded            | Makes the element rounded                                             | boolean             | -                                                                               |                                                                                                                                          |
| statusIcon         | Show status icon using field and variant prop                         | boolean             | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>         |
| useHtml5Validation | Enable html 5 native validation                                       | boolean             | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code> |
| v-model            |                                                                       | object\|File\|array | -                                                                               |                                                                                                                                          |
| validationMessage  | The message which is shown when a validation error occurs             | string              | -                                                                               |                                                                                                                                          |
| variant            | Color of the control, optional                                        | string              | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                          |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| blur              |            |
| focus             |            |
| update:modelValue |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_upload.scss)

| CSS Variable                                | SASS Variable                         | Default                 |
| ------------------------------------------- | ------------------------------------- | ----------------------- |
| --oruga-upload-draggable-border             | \$upload-draggable-border             | 1px dashed \$grey-light |
| --oruga-upload-draggable-border-radius      | \$upload-draggable-border-radius      | \$base-border-radius    |
| --oruga-upload-draggable-disabled-opacity   | \$upload-draggable-disabled-opacity   | \$base-disabled-opacity |
| --oruga-upload-draggable-hover-border-color | \$upload-draggable-hover-border-color | \$grey                  |
| --oruga-upload-draggable-padding            | \$upload-draggable-padding            | 0.25em                  |

</div>

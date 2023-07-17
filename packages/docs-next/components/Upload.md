---
title: Upload
---

# Upload

<div class="vp-doc">

> Upload one or more files

<Carbon />
</div>

<div class="vp-doc">

## Examples

  <example-upload />
  
</div>
<div class="vp-doc">

## Class props

<inspector-upload-viewer />

</div>

<div class="vp-doc">

## Upload Component

### Props

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
| invalid           |            |
| update:modelValue |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $upload-draggable-border | 1px dashed $grey-light !default |
| $upload-draggable-border-radius | $base-border-radius !default |
| $upload-draggable-disabled-opacity | $base-disabled-opacity !default |
| $upload-draggable-hover-border-color | $grey !default |
| $upload-draggable-padding | 0.25em !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_upload.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $upload-draggable-border | 1px dashed $grey-light !default |
| $upload-draggable-border-radius | $base-border-radius !default |
| $upload-draggable-disabled-opacity | $base-disabled-opacity !default |
| $upload-draggable-hover-border-color | $grey !default |
| $upload-draggable-padding | 0.25em !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_upload.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $upload-draggable-bg | transparent !default |
| $upload-draggable-bg-hover | transparent !default |
| $upload-draggable-border-color | var(--#{$prefix}border-color) !default |
| $upload-draggable-border-color-hover | var(--#{$prefix}dark-bg-subtle) !default |
| $upload-draggable-border-width | var(--#{$prefix}border-width) !default |
| $upload-draggable-border-radius | var(--#{$prefix}border-radius) !default |
| $upload-draggable-padding | 2em !default |
| $upload-disabled-opacity | 0.5 !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_upload.scss)

</div>

</div>

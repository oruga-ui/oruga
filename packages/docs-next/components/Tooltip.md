---
title: Tooltip
---

# Tooltip

<div class="vp-doc">

> Display a brief helper text to your user

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">

## Class props

<inspector-Tooltip-viewer />

</div>

<div class="vp-doc">

## Tooltip component

> Display a brief helper text to your user

```html
<o-tooltip></o-tooltip>
```

### Props

| Prop name  | Description                                                                                                                                                                      | Type                    | Values                                                                                           | Default                                                                                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active     | Whether tooltip is active or not, use v-model:active to make it two-way binding                                                                                                  | boolean                 | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                 |
| always     | Tooltip will be always active                                                                                                                                                    | boolean                 | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                 |
| animation  | Tooltip default animation                                                                                                                                                        | string                  | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>                         |
| closeable  | Tooltip auto close options (pressing escape, clicking the content or outside)                                                                                                    | string[] \| boolean     | `true`, `false`, `content`, `outside`, `escape`                                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;closeable: ["escape","outside","content"]<br>}</code> |
| delay      | Tooltip delay before it appears (number in ms)                                                                                                                                   | number                  | -                                                                                                |                                                                                                                                                                             |
| disabled   | Tooltip will be disabled                                                                                                                                                         | boolean                 | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                 |
| label      | Tooltip text, unnecessary when content slot is used                                                                                                                              | string                  | -                                                                                                |                                                                                                                                                                             |
| multiline  | Tooltip will be multilined                                                                                                                                                       | boolean                 | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                 |
| position   | Position of the Tooltip relative to the trigger                                                                                                                                  | string                  | `auto`, `top`, `bottom`, `left`, `right`, `top-right`, `top-left`, `bottom-left`, `bottom-right` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;position: "auto"<br>}</code>                          |
| teleport   | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean\|string\|object | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                          |
| triggerTag | Tooltip trigger tag name                                                                                                                                                         | DynamicComponent        | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;triggerTag: "div"<br>}</code>                         |
| triggers   | Tooltip trigger events                                                                                                                                                           | string[]                | `hover`, `click`, `focus`, `contextmenu`                                                         | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;triggers: ["hover"]<br>}</code>                       |
| variant    | Color of the tooltip                                                                                                                                                             | string                  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color`                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>                        |

### Events

| Event name    | Properties                                | Description                     |
| ------------- | ----------------------------------------- | ------------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding     |
| close         |                                           | on active change to false event |
| open          |                                           | on active change to true event  |

### Slots

| Name    | Description                            | Bindings                                    |
| ------- | -------------------------------------- | ------------------------------------------- |
| content | Tooltip content, default is label prop |                                             |
| default | Tooltip trigger slot                   | **active** `boolean` - tooltip active state |

</div>

<div class="vp-doc">
</div>

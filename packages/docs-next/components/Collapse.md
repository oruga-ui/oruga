---
title: Collapse
---

# Collapse

<div class="vp-doc">

> An easy way to toggle what you want

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">
</div>

<div class="vp-doc">

## Collapse component

> An easy way to toggle what you want

```html
<o-collapse></o-collapse>
```

### Props

| Prop name | Description                                                                  | Type    | Values          | Default                                                                                                                                              |
| --------- | ---------------------------------------------------------------------------- | ------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation | Custom animation (transition name)                                           | string  | -               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>collapse: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code> |
| contentId | Id property of the content container                                         | string  | -               | Default function (see source code)                                                                                                                   |
| open      | Whether collapse is open or not, use v-model:open to make it two-way binding | boolean | -               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                           |
| position  | Trigger position                                                             | string  | `top`, `bottom` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>collapse: {<br>&nbsp;&nbsp;position: "top"<br>}</code>   |

### Events

| Event name  | Properties                              | Description               |
| ----------- | --------------------------------------- | ------------------------- |
| update:open | **value** `boolean` - updated open prop | open prop two-way binding |
| open        |                                         | on collapse opened        |
| close       |                                         | on collapse closed        |

### Slots

| Name    | Description                 | Bindings                                 |
| ------- | --------------------------- | ---------------------------------------- |
| trigger | Define the collapse trigger | **open** `boolean` - collapse open state |
| default | Default content             |                                          |

</div>

<div class="vp-doc">
</div>

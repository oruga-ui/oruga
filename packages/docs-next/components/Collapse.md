---
title: Collapse
---

# Collapse

<div class="vp-doc">

> An easy way to toggle what you want

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-collapse />

</div>
<div class="vp-example">

## Class props

<inspector-collapse-viewer />

</div>

<div class="vp-doc">

## Collapse component

```html
<o-collapse></o-collapse>
```

### Props

| Prop name | Description                                                              | Type    | Values          | Default                                                                                                                                               |
| --------- | ------------------------------------------------------------------------ | ------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation | Custom animation (transition name)                                       | string  | -               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> collapse: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| ariaId    |                                                                          | string  | -               | ''                                                                                                                                                    |
| open      | Whether collapse is open or not, v-model:open to make it two-way binding | boolean | -               | true                                                                                                                                                  |
| override  |                                                                          | boolean | -               |                                                                                                                                                       |
| position  | Trigger position                                                         | string  | `top`, `bottom` | 'top'                                                                                                                                                 |

### Events

| Event name  | Properties | Description |
| ----------- | ---------- | ----------- |
| update:open |            |
| open        |            |
| close       |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| default |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable | Default |
| ------------- | ------- |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_collapse.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable | Default |
| ------------- | ------- |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_collapse.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>

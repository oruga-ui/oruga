---
title: Collapse
---

# Collapse

> An easy way to toggle what you want

> <CarbonAds />

---

## Examples

 <example-collapse />

## Class props

<br />

<inspector-collapse-viewer />

<br />
<br />

## Props

| Prop name | Description                                                              | Type    | Values          | Default                                                                                                                                   |
| --------- | ------------------------------------------------------------------------ | ------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| animation | Custom animation (transition name)                                       | string  | -               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> collapse: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| ariaId    |                                                                          | string  | -               | ''                                                                                                                                        |
| open      | Whether collapse is open or not, v-model:open to make it two-way binding | boolean | -               | true                                                                                                                                      |
| override  |                                                                          | boolean | -               |                                                                                                                                           |
| position  | Trigger position                                                         | string  | `top`, `bottom` | 'top'                                                                                                                                     |

## Events

| Event name  | Properties | Description |
| ----------- | ---------- | ----------- |
| update:open |            |
| open        |            |
| close       |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| default |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__collapse.scss.scss)

| CSS Variable | SASS Variable | Default |
| ------------ | ------------- | ------- |


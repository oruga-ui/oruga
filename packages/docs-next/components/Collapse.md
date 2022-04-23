---
title: Collapse
---

# Collapse

> An easy way to toggle what you want

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/collapse/examples/Collapse.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

<ExampleViewer example="collapse/base" />

### Accordion

<ExampleViewer example="collapse/accordion" />

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_collapse.scss)

<br />

<br />
<br />

## Props

| Prop name | Description                                                                                                            | Type    | Values          | Default                                                                                                                                   |
| --------- | ---------------------------------------------------------------------------------------------------------------------- | ------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| animation | Custom animation (transition name)                                                                                     | string  | -               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> collapse: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| ariaId    |                                                                                                                        | string  | -               | ''                                                                                                                                        |
| open      | Whether collapse is open or not, use the .sync modifier (Vue 2.x) or v-model:open (Vue 3.x) to make it two-way binding | boolean | -               | true                                                                                                                                      |
| override  |                                                                                                                        | boolean | -               |                                                                                                                                           |
| position  | Trigger position                                                                                                       | string  | `top`, `bottom` | 'top'                                                                                                                                     |

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

| CSS Variable | SASS Variable | Default |
| ------------ | ------------- | ------- |


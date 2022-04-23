---
title: Loading
---

# Loading

> A simple loading overlay

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/loading/examples/Loading.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

<ExampleViewer example="loading/base" />

### Slot

<ExampleViewer example="loading/slot" />

### Programmatically

<ExampleViewer example="loading/programmatically" />

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_loading.scss)

<br />

<br />
<br />

## Props

| Prop name    | Description                                                                                                             | Type                      | Values | Default                                                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| active       | Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding | boolean                   | -      |                                                                                                                                          |
| animation    |                                                                                                                         | string                    | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> loading: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| canCancel    | Can close Loading by pressing escape or clicking outside                                                                | boolean                   | -      | false                                                                                                                                    |
| container    |                                                                                                                         | object\|func\|HTMLElement | -      |                                                                                                                                          |
| fullPage     | Loader will overlay the full page                                                                                       | boolean                   | -      | true                                                                                                                                     |
| icon         | Icon name                                                                                                               | string                    | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> loading: {<br>&nbsp;&nbsp;icon: 'loading'<br>}</code>   |
| iconSize     |                                                                                                                         | string                    | -      | 'medium'                                                                                                                                 |
| iconSpin     | Enable spin effect on icon                                                                                              | boolean                   | -      | true                                                                                                                                     |
| onCancel     | Callback function to call after user canceled (pressed escape / clicked outside)                                        | func                      | -      | Default function (see source code)                                                                                                       |
| override     |                                                                                                                         | boolean                   | -      |                                                                                                                                          |
| programmatic |                                                                                                                         | boolean                   | -      |                                                                                                                                          |

## Events

| Event name       | Properties | Description |
| ---------------- | ---------- | ----------- |
| update:active    |            |
| close            |            |
| update:full-page |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                    | SASS Variable             | Default               |
| ------------------------------- | ------------------------- | --------------------- |
| --oruga-loading-overlay-legacy  | \$loading-overlay-legacy  | #7f7f7f               |
| --oruga-loading-overlay         | \$loading-overlay         | rgba(255,255,255,0.5) |
| --oruga-loading-zindex          | \$loading-zindex          | 29                    |
| --oruga-loading-fullpage-zindex | \$loading-fullpage-zindex | 999                   |

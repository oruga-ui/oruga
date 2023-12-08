---
title: Tabs
---

# Tabs

<div class="vp-doc">

> Responsive horizontal navigation tabs, switch between contents with ease

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">

## Class props

inspector-Tabs-viewer /
Tabs

</div>

<div class="vp-doc">

## Tabs component

> Responsive horizontal navigation tabs, switch between contents with ease

```html
<o-tabs></o-tabs>
```

### Props

| Prop name | Description                                     | Type           | Values                                                                          | Default                                                                                                                                           |
| --------- | ----------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| animated  | Tab will have an animation                      | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;animated: true<br>}</code>     |
| expanded  | Tabs will be expanded (full-width)              | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| multiline | Show tab items multiline when there is no space | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| position  | Position of the tabs                            | string         | `left`, `centered`, `right`                                                     |                                                                                                                                                   |
| size      | Tab size                                        | string         | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;size: undefined<br>}</code>    |
| type      | Tab type                                        | string         | `boxed`, `toggle`                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;type: "default"<br>}</code>    |
| v-model   |                                                 | string\|number | -                                                                               | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                           |
| variant   | Color of the control                            | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;variant: undefined<br>}</code> |
| vertical  | Show tab in vertical layout                     | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;vertical: false<br>}</code>    |

### Events

| Event name        | Properties                                                                                    | Description                     |
| ----------------- | --------------------------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `string \| number` - updated modelValue prop                                        | modelValue prop two-way binding |
| change            | **value** `string \| number` - new tab value<br/>**value** `string \| number` - old tab value | on tab change event             |

### Slots

| Name    | Description                 | Bindings |
| ------- | --------------------------- | -------- |
| start   | Additional slot before tabs |          |
| end     | Additional slot after tabs  |          |
| default | Place tab items here        |          |

</div>

<div class="vp-doc">

## TabItem component

```html
<o-tab-item></o-tab-item>
```

### Props

| Prop name | Description                                                              | Type             | Values | Default                                                                                                                                            |
| --------- | ------------------------------------------------------------------------ | ---------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaRole  | Role attribute to be passed to the div wrapper for better accessibility. | string           | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;ariaRole: "tab"<br>}</code>     |
| disabled  | Item will be disabled                                                    | boolean          | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| icon      | Icon on the left                                                         | string           | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>     |
| iconPack  | Icon pack                                                                | string           | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| label     | Item label                                                               | string           | -      |                                                                                                                                                    |
| tag       | Tabs item tag name                                                       | DynamicComponent | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;itemTag: "button"<br>}</code>   |
| value     | Item value (it will be used as v-model of wrapper component)             | string\|number   | -      | Default function (see source code)                                                                                                                 |
| visible   | Show/hide item                                                           | boolean          | -      | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                         |

### Events

| Event name | Properties | Description                  |
| ---------- | ---------- | ---------------------------- |
| activate   |            | on tab item activate event   |
| deactivate |            | on tab item deactivate event |

### Slots

| Name    | Description      | Bindings |
| ------- | ---------------- | -------- |
| default | Tab item content |          |

</div>

<div class="vp-doc">
</div>
<div class="vp-doc">
</div>

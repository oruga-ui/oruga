---
title: OLoading
---

# OLoading

## Props

| Prop name       | Description | Type                      | Values | Default                                                                                                                                                                                                                     |
| --------------- | ----------- | ------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active          |             | boolean                   | -      |                                                                                                                                                                                                                             |
| programmatic    |             | boolean                   | -      |                                                                                                                                                                                                                             |
| container       |             | object\|func\|HTMLElement | -      |                                                                                                                                                                                                                             |
| fullPage        |             | boolean                   | -      | true                                                                                                                                                                                                                        |
| animation       |             | string                    | -      | 'fade'                                                                                                                                                                                                                      |
| canCancel       |             | boolean                   | -      | false                                                                                                                                                                                                                       |
| onCancel        |             | func                      | -      | () => {}                                                                                                                                                                                                                    |
| icon            |             | string                    | -      | 'spin'                                                                                                                                                                                                                      |
| iconSpin        |             | boolean                   | -      | true                                                                                                                                                                                                                        |
| rootClass       |             | string                    | -      | () => {<br> const override = getValueByPath(config, 'loading.override', false)<br> const clazz = getValueByPath(config, 'loading.rootClass', '')<br> return getCssClass(clazz, override, 'o-loading-overlay')<br>}          |
| backgroundClass |             | string                    | -      | () => {<br> const override = getValueByPath(config, 'loading.override', false)<br> const clazz = getValueByPath(config, 'loading.backgroundClass', '')<br> return getCssClass(clazz, override, 'o-loading-background')<br>} |
| iconClass       |             | string                    | -      | () => {<br> const override = getValueByPath(config, 'loading.override', false)<br> const clazz = getValueByPath(config, 'loading.iconClass', '')<br> return getCssClass(clazz, override, 'o-loading-icon')<br>}             |

## Events

| Event name       | Type      | Description |
| ---------------- | --------- | ----------- |
| close            |           |
| update:active    | undefined |
| update:full-page | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

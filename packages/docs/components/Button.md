---
title: OButton
---

# OButton

> The classic button, in different colors, sizes, and states

## Props

| Prop name     | Description | Type           | Values | Default                                                                                                                                                                                                              |
| ------------- | ----------- | -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variant       |             | string\|object | -      |                                                                                                                                                                                                                      |
| size          |             | string         | -      |                                                                                                                                                                                                                      |
| label         |             | string         | -      |                                                                                                                                                                                                                      |
| iconPack      |             | string         | -      |                                                                                                                                                                                                                      |
| iconLeft      |             | string         | -      |                                                                                                                                                                                                                      |
| iconRight     |             | string         | -      |                                                                                                                                                                                                                      |
| rounded       |             | boolean        | -      | () => getValueByPath(config, 'button.rounded', false)                                                                                                                                                                |
| outlined      |             | boolean        | -      |                                                                                                                                                                                                                      |
| expanded      |             | boolean        | -      |                                                                                                                                                                                                                      |
| inverted      |             | boolean        | -      |                                                                                                                                                                                                                      |
| nativeType    |             | string         | -      | 'button'                                                                                                                                                                                                             |
| tag           |             | string         | -      | 'button'                                                                                                                                                                                                             |
| rootClass     |             | string         | -      | () => {<br> const override = getValueByPath(config, 'button.override', false)<br> const clazz = getValueByPath(config, 'button.rootClass', '')<br> return getCssClass(clazz, override, 'o-button')<br>}              |
| outlinedClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'button.override', false)<br> const clazz = getValueByPath(config, 'button.outlinedClass', '')<br> return getCssClass(clazz, override, 'o-button-outlined')<br>} |
| invertedClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'button.override', false)<br> const clazz = getValueByPath(config, 'button.invertedClass', '')<br> return getCssClass(clazz, override, 'o-button-inverted')<br>} |
| expandedClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'button.override', false)<br> const clazz = getValueByPath(config, 'button.expandedClass', '')<br> return getCssClass(clazz, override, 'o-button-expanded')<br>} |
| roundedClass  |             | string         | -      | () => {<br> const override = getValueByPath(config, 'button.override', false)<br> const clazz = getValueByPath(config, 'button.roundedClass', '')<br> return getCssClass(clazz, override, 'o-button-rounded')<br>}   |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

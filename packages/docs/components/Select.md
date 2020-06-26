---
title: OSelect
---

# OSelect

## Props

| Prop name          | Description | Type                                   | Values | Default                                                                                                                                                                                                              |
| ------------------ | ----------- | -------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| size               |             | string                                 | -      |                                                                                                                                                                                                                      |
| expanded           |             | boolean                                | -      |                                                                                                                                                                                                                      |
| loading            |             | boolean                                | -      |                                                                                                                                                                                                                      |
| rounded            |             | boolean                                | -      |                                                                                                                                                                                                                      |
| icon               |             | string                                 | -      |                                                                                                                                                                                                                      |
| iconPack           |             | string                                 | -      |                                                                                                                                                                                                                      |
| autocomplete       |             | string                                 | -      |                                                                                                                                                                                                                      |
| maxlength          |             | number\|string                         | -      |                                                                                                                                                                                                                      |
| useHtml5Validation |             | boolean                                | -      | () => getValueByPath(config, 'useHtml5Validation', true)                                                                                                                                                             |
| validationMessage  |             | string                                 | -      |                                                                                                                                                                                                                      |
| value              |             | string\|number\|boolean\|object\|array | -      | null                                                                                                                                                                                                                 |
| iconRight          |             | string                                 | -      | 'caret-down'                                                                                                                                                                                                         |
| placeholder        |             | string                                 | -      |                                                                                                                                                                                                                      |
| multiple           |             | boolean                                | -      |                                                                                                                                                                                                                      |
| nativeSize         |             | string\|number                         | -      |                                                                                                                                                                                                                      |
| rootClass          |             | string                                 | -      | () => {<br> const override = getValueByPath(config, 'select.override', false)<br> const clazz = getValueByPath(config, 'select.inputClass', '')<br> return getCssClass(clazz, override, 'o-control-select')<br>}     |
| selectClass        |             | string                                 | -      | () => {<br> const override = getValueByPath(config, 'select.override', false)<br> const clazz = getValueByPath(config, 'select.selectClass', '')<br> return getCssClass(clazz, override, 'o-select')<br>}            |
| roundedClass       |             | string                                 | -      | () => {<br> const override = getValueByPath(config, 'select.override', false)<br> const clazz = getValueByPath(config, 'select.roundedClass', '')<br> return getCssClass(clazz, override, 'o-select-rounded')<br>}   |
| multipleClass      |             | string                                 | -      | () => {<br> const override = getValueByPath(config, 'select.override', false)<br> const clazz = getValueByPath(config, 'select.multipleClass', '')<br> return getCssClass(clazz, override, 'o-select-multiple')<br>} |
| emptyClass         |             | string                                 | -      | () => {<br> const override = getValueByPath(config, 'select.override', false)<br> const clazz = getValueByPath(config, 'select.emptyClass', '')<br> return getCssClass(clazz, override, 'o-select-empty')<br>}       |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| blur       | undefined |
| focus      | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

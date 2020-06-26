---
title: OInput
---

# OInput

## Props

| Prop name          | Description | Type           | Values | Default                                                                                                                                                                                                      |
| ------------------ | ----------- | -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| size               |             | string         | -      |                                                                                                                                                                                                              |
| expanded           |             | boolean        | -      |                                                                                                                                                                                                              |
| loading            |             | boolean        | -      |                                                                                                                                                                                                              |
| rounded            |             | boolean        | -      |                                                                                                                                                                                                              |
| icon               |             | string         | -      |                                                                                                                                                                                                              |
| iconPack           |             | string         | -      |                                                                                                                                                                                                              |
| autocomplete       |             | string         | -      |                                                                                                                                                                                                              |
| maxlength          |             | number\|string | -      |                                                                                                                                                                                                              |
| useHtml5Validation |             | boolean        | -      | () => getValueByPath(config, 'useHtml5Validation', true)                                                                                                                                                     |
| validationMessage  |             | string         | -      |                                                                                                                                                                                                              |
| value              |             | number\|string | -      |                                                                                                                                                                                                              |
| type               |             | string         | -      | 'text'                                                                                                                                                                                                       |
| passwordReveal     |             | boolean        | -      |                                                                                                                                                                                                              |
| iconClickable      |             | boolean        | -      |                                                                                                                                                                                                              |
| hasCounter         |             | boolean        | -      | () => getValueByPath(config, 'input.counter', false)                                                                                                                                                         |
| iconRight          |             | string         | -      |                                                                                                                                                                                                              |
| iconRightClickable |             | boolean        | -      |                                                                                                                                                                                                              |
| rootClass          |             | string         | -      | () => {<br> const override = getValueByPath(config, 'input.override', false)<br> const clazz = getValueByPath(config, 'input.rootClass', '')<br> return getCssClass(clazz, override, 'o-control-input')<br>} |
| inputClass         |             | string         | -      | () => {<br> const override = getValueByPath(config, 'input.override', false)<br> const clazz = getValueByPath(config, 'input.inputClass', '')<br> return getCssClass(clazz, override, 'o-input')<br>}        |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| blur       | undefined |
| focus      | undefined |
| input      | undefined |

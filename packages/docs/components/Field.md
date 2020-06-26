---
title: OField
---

# OField

## Props

| Prop name              | Description | Type           | Values | Default                                                                                                                                                                                                                              |
| ---------------------- | ----------- | -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| variant                |             | string\|object | -      |                                                                                                                                                                                                                                      |
| label                  |             | string         | -      |                                                                                                                                                                                                                                      |
| labelFor               |             | string         | -      |                                                                                                                                                                                                                                      |
| message                |             | string         | -      |                                                                                                                                                                                                                                      |
| grouped                |             | boolean        | -      |                                                                                                                                                                                                                                      |
| groupMultiline         |             | boolean        | -      |                                                                                                                                                                                                                                      |
| expanded               |             | boolean        | -      |                                                                                                                                                                                                                                      |
| horizontal             |             | boolean        | -      |                                                                                                                                                                                                                                      |
| addons                 |             | boolean        | -      | true                                                                                                                                                                                                                                 |
| rootClass              |             | string         | -      | () => {<br> const override = getValueByPath(config, 'field.override', false)<br> const clazz = getValueByPath(config, 'field.rootClass', '')<br> return getCssClass(clazz, override, 'o-field')<br>}                                 |
| horizontalClass        |             | string         | -      | () => {<br> const override = getValueByPath(config, 'field.override', false)<br> const clazz = getValueByPath(config, 'field.horizontalClass', '')<br> return getCssClass(clazz, override, 'o-field-horizontal')<br>}                |
| labelClass             |             | string         | -      | () => {<br> const override = getValueByPath(config, 'field.override', false)<br> const clazz = getValueByPath(config, 'field.labelClass', '')<br> return getCssClass(clazz, override, 'o-field-label')<br>}                          |
| labelHorizontalClass   |             | string         | -      | () => {<br> const override = getValueByPath(config, 'field.override', false)<br> const clazz = getValueByPath(config, 'field.labelHorizontalClass', '')<br> return getCssClass(clazz, override, 'o-field-horizontal-label')<br>}     |
| contentHorizontalClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'field.override', false)<br> const clazz = getValueByPath(config, 'field.contentHorizontalClass', '')<br> return getCssClass(clazz, override, 'o-field-horizontal-content')<br>} |
| messageClass           |             | string         | -      | () => {<br> const override = getValueByPath(config, 'field.override', false)<br> const clazz = getValueByPath(config, 'field.messageClass', '')<br> return getCssClass(clazz, override, 'o-field-message')<br>}                      |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| label   |             |          |
| default |             |          |
| message |             |          |

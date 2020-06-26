---
title: OCheckbox
---

# OCheckbox

## Props

| Prop name     | Description | Type                    | Values | Default                                                                                                                                                                                                                    |
| ------------- | ----------- | ----------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value         |             | string\|number\|boolean | -      |                                                                                                                                                                                                                            |
| nativeValue   |             | string\|number\|boolean | -      |                                                                                                                                                                                                                            |
| variant       |             | string                  | -      |                                                                                                                                                                                                                            |
| disabled      |             | boolean                 | -      |                                                                                                                                                                                                                            |
| required      |             | boolean                 | -      |                                                                                                                                                                                                                            |
| name          |             | string                  | -      |                                                                                                                                                                                                                            |
| size          |             | string                  | -      |                                                                                                                                                                                                                            |
| indeterminate |             | boolean                 | -      |                                                                                                                                                                                                                            |
| trueValue     |             | string\|number\|boolean | -      | true                                                                                                                                                                                                                       |
| falseValue    |             | string\|number\|boolean | -      | false                                                                                                                                                                                                                      |
| rootClass     |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'checkbox.override', false)<br> const clazz = getValueByPath(config, 'checkbox.rootClass', '')<br> return getCssClass(clazz, override, 'o-checkbox')<br>}              |
| disabledClass |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'checkbox.override', false)<br> const clazz = getValueByPath(config, 'checkbox.disabledClass', '')<br> return getCssClass(clazz, override, 'o-checkbox-disabled')<br>} |
| checkClass    |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'checkbox.override', false)<br> const clazz = getValueByPath(config, 'checkbox.checkClass', '')<br> return getCssClass(clazz, override, 'o-checkbox-check')<br>}       |
| labelClass    |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'checkbox.override', false)<br> const clazz = getValueByPath(config, 'checkbox.labelClass', '')<br> return getCssClass(clazz, override, 'o-checkbox-label')<br>}       |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| input      | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---
title: ORadio
---

# ORadio

## Props

| Prop name     | Description | Type                    | Values | Default                                                                                                                                                                                                             |
| ------------- | ----------- | ----------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value         |             | string\|number\|boolean | -      |                                                                                                                                                                                                                     |
| nativeValue   |             | string\|number\|boolean | -      |                                                                                                                                                                                                                     |
| variant       |             | string                  | -      |                                                                                                                                                                                                                     |
| disabled      |             | boolean                 | -      |                                                                                                                                                                                                                     |
| required      |             | boolean                 | -      |                                                                                                                                                                                                                     |
| name          |             | string                  | -      |                                                                                                                                                                                                                     |
| size          |             | string                  | -      |                                                                                                                                                                                                                     |
| rootClass     |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'radio.override', false)<br> const clazz = getValueByPath(config, 'radio.rootClass', '')<br> return getCssClass(clazz, override, 'o-radio')<br>}                |
| disabledClass |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'radio.override', false)<br> const clazz = getValueByPath(config, 'radio.disabledClass', '')<br> return getCssClass(clazz, override, 'o-radio-disabled')<br>}   |
| checkClass    |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'radio.override', false)<br> const clazz = getValueByPath(config, 'radio.o-radio-checkClass', '')<br> return getCssClass(clazz, override, 'o-radio-check')<br>} |
| labelClass    |             | string                  | -      | () => {<br> const override = getValueByPath(config, 'radio.override', false)<br> const clazz = getValueByPath(config, 'radio.labelClass', '')<br> return getCssClass(clazz, override, 'o-radio-label')<br>}         |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| input      | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

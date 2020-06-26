---
title: OTooltip
---

# OTooltip

## Props

| Prop name      | Description | Type           | Values                           | Default                                                                                                                                                                                                                   |
| -------------- | ----------- | -------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active         |             | boolean        | -                                | true                                                                                                                                                                                                                      |
| label          |             | string         | -                                |                                                                                                                                                                                                                           |
| delay          |             | number         | -                                |                                                                                                                                                                                                                           |
| position       |             | string         | `top`, `bottom`, `left`, `right` | 'top'                                                                                                                                                                                                                     |
| triggers       |             | array          | -                                | ['hover']                                                                                                                                                                                                                 |
| always         |             | boolean        | -                                |                                                                                                                                                                                                                           |
| animated       |             | boolean        | -                                | true                                                                                                                                                                                                                      |
| animation      |             | string         | -                                | 'fade'                                                                                                                                                                                                                    |
| autoClose      |             | array\|boolean | -                                | true                                                                                                                                                                                                                      |
| multiline      |             | boolean        | -                                |                                                                                                                                                                                                                           |
| appendToBody   |             | boolean        | -                                |                                                                                                                                                                                                                           |
| variant        |             | string         | -                                |                                                                                                                                                                                                                           |
| rootClass      |             | string         | -                                | () => {<br> const override = getValueByPath(config, 'tooltip.override', false)<br> const clazz = getValueByPath(config, 'tooltip.rootClass', '')<br> return getCssClass(clazz, override, 'o-tooltip')<br>}                |
| contentClass   |             | string         | -                                | () => {<br> const override = getValueByPath(config, 'tooltip.override', false)<br> const clazz = getValueByPath(config, 'tooltip.contentClass', '')<br> return getCssClass(clazz, override, 'o-tooltip-content')<br>}     |
| triggerClass   |             | string         | -                                | () => {<br> const override = getValueByPath(config, 'tooltip.override', false)<br> const clazz = getValueByPath(config, 'tooltip.triggerClass', '')<br> return getCssClass(clazz, override, 'o-tooltip-trigger')<br>}     |
| multilineClass |             | string         | -                                | () => {<br> const override = getValueByPath(config, 'tooltip.override', false)<br> const clazz = getValueByPath(config, 'tooltip.multilineClass', '')<br> return getCssClass(clazz, override, 'o-tooltip-multiline')<br>} |
| alwaysClass    |             | string         | -                                | () => {<br> const override = getValueByPath(config, 'tooltip.override', false)<br> const clazz = getValueByPath(config, 'tooltip.alwaysClass', '')<br> return getCssClass(clazz, override, 'o-tooltip-always')<br>}       |

## Slots

| Name    | Description | Bindings                             |
| ------- | ----------- | ------------------------------------ |
| content |             |                                      |
| default |             | [<br> {<br> "name": "ref"<br> }<br>] |

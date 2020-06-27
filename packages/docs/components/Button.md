---
title: Button
---

# Button

> The classic button, in different colors, sizes, and states

---

## Examples

### Base

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

## Style

| CSS Variable                         | SASS Variable                  | Default                      |
| ------------------------------------ | ------------------------------ | ---------------------------- |
| --oruga-button-background-color      | \$button-background-color      | #ffffff                      |
| --oruga-button-border-radius         | \$button-border-radius         | \$base-border-radius         |
| --oruga-button-border                | \$button-border                | 1px solid #000000            |
| --oruga-button-box-shadow            | \$button-box-shadow            | none                         |
| --oruga-button-color                 | \$button-color                 | #000000                      |
| --oruga-button-font-size             | \$button-font-size             | \$base-font-size             |
| --oruga-button-line-height           | \$button-line-height           | \$base-line-height           |
| --oruga-button-margin-border-to-icon | \$button-margin-border-to-icon | calc(-.375em - 1px)          |
| --oruga-button-margin-icon-to-text   | \$button-margin-icon-to-text   | .1875em                      |
| --oruga-button-margin                | \$button-margin                | 0                            |
| --oruga-button-padding               | \$button-padding               | calc(.375em - 1px) .75em     |
| --oruga-button-rounded-border-radius | \$button-rounded-border-radius | \$base-rounded-border-radius |

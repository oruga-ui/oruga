---
title: OIcon
---

# OIcon

## Props

| Prop name      | Description | Type           | Values | Default                                                                                                                                                                                                          |
| -------------- | ----------- | -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variant        |             | string\|object | -      |                                                                                                                                                                                                                  |
| component      |             | string         | -      |                                                                                                                                                                                                                  |
| pack           |             | string         | -      |                                                                                                                                                                                                                  |
| icon           |             | string         | -      |                                                                                                                                                                                                                  |
| size           |             | string         | -      |                                                                                                                                                                                                                  |
| customSize     |             | string         | -      |                                                                                                                                                                                                                  |
| customClass    |             | string         | -      |                                                                                                                                                                                                                  |
| clickable      |             | boolean        | -      |                                                                                                                                                                                                                  |
| spin           |             | boolean        | -      |                                                                                                                                                                                                                  |
| rootClass      |             | string         | -      | () => {<br> const override = getValueByPath(config, 'icon.override', false)<br> const clazz = getValueByPath(config, 'icon.rootClass', '')<br> return getCssClass(clazz, override, 'o-icon')<br>}                |
| clickableClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'icon.override', false)<br> const clazz = getValueByPath(config, 'icon.clickableClass', '')<br> return getCssClass(clazz, override, 'o-icon-clickable')<br>} |
| spinClass      |             | string         | -      | () => {<br> const override = getValueByPath(config, 'icon.override', false)<br> const clazz = getValueByPath(config, 'icon.spinClass', '')<br> return getCssClass(clazz, override, 'o-icon-spin')<br>}           |
| both           |             | boolean        | -      |                                                                                                                                                                                                                  |

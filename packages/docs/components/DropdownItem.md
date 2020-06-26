---
title: ODropdownItem
---

# ODropdownItem

## Props

| Prop name         | Description | Type                                         | Values | Default                                                                                                                                                                                                                             |
| ----------------- | ----------- | -------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value             |             | string\|number\|boolean\|object\|array\|func | -      | null                                                                                                                                                                                                                                |
| itemClass         |             | string                                       | -      | () => {<br> const override = getValueByPath(config, 'dropdown.override', false)<br> const clazz = getValueByPath(config, 'dropdown.itemClass', '')<br> return getCssClass(clazz, override, 'o-dropdown-item')<br>}                  |
| itemActiveClass   |             | string                                       | -      | () => {<br> const override = getValueByPath(config, 'dropdown.override', false)<br> const clazz = getValueByPath(config, 'dropdown.itemActiveClass', '')<br> return getCssClass(clazz, override, 'o-dropdown-item-active')<br>}     |
| itemDisabledClass |             | string                                       | -      | () => {<br> const override = getValueByPath(config, 'dropdown.override', false)<br> const clazz = getValueByPath(config, 'dropdown.itemDisabledClass', '')<br> return getCssClass(clazz, override, 'o-dropdown-item-disabled')<br>} |
| disabled          |             | boolean                                      | -      |                                                                                                                                                                                                                                     |
| custom            |             | boolean                                      | -      |                                                                                                                                                                                                                                     |
| tabindex          |             | number\|string                               | -      | 0                                                                                                                                                                                                                                   |
| ariaRole          |             | string                                       | -      | ''                                                                                                                                                                                                                                  |

## Events

| Event name | Type | Description |
| ---------- | ---- | ----------- |
| click      |      |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

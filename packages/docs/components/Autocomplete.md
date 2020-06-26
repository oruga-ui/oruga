---
title: OAutocomplete
---

# OAutocomplete

## Props

| Prop name           | Description | Type           | Values | Default                                                                                                                                                                                                                                         |
| ------------------- | ----------- | -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| size                |             | string         | -      |                                                                                                                                                                                                                                                 |
| expanded            |             | boolean        | -      |                                                                                                                                                                                                                                                 |
| loading             |             | boolean        | -      |                                                                                                                                                                                                                                                 |
| rounded             |             | boolean        | -      |                                                                                                                                                                                                                                                 |
| icon                |             | string         | -      |                                                                                                                                                                                                                                                 |
| iconPack            |             | string         | -      |                                                                                                                                                                                                                                                 |
| autocomplete        |             | string         | -      |                                                                                                                                                                                                                                                 |
| maxlength           |             | number\|string | -      |                                                                                                                                                                                                                                                 |
| useHtml5Validation  |             | boolean        | -      | () => getValueByPath(config, 'useHtml5Validation', true)                                                                                                                                                                                        |
| validationMessage   |             | string         | -      |                                                                                                                                                                                                                                                 |
| value               |             | number\|string | -      |                                                                                                                                                                                                                                                 |
| data                |             | array          | -      | []                                                                                                                                                                                                                                              |
| field               |             | string         | -      | 'value'                                                                                                                                                                                                                                         |
| keepFirst           |             | boolean        | -      |                                                                                                                                                                                                                                                 |
| clearOnSelect       |             | boolean        | -      |                                                                                                                                                                                                                                                 |
| openOnFocus         |             | boolean        | -      |                                                                                                                                                                                                                                                 |
| customFormatter     |             | func           | -      |                                                                                                                                                                                                                                                 |
| checkInfiniteScroll |             | boolean        | -      |                                                                                                                                                                                                                                                 |
| keepOpen            |             | boolean        | -      |                                                                                                                                                                                                                                                 |
| clearable           |             | boolean        | -      |                                                                                                                                                                                                                                                 |
| maxHeight           |             | string\|number | -      |                                                                                                                                                                                                                                                 |
| dropdownPosition    |             | string         | -      | 'auto'                                                                                                                                                                                                                                          |
| animation           |             | string         | -      | 'fade'                                                                                                                                                                                                                                          |
| iconRight           |             | string         | -      |                                                                                                                                                                                                                                                 |
| iconRightClickable  |             | boolean        | -      |                                                                                                                                                                                                                                                 |
| appendToBody        |             | boolean        | -      |                                                                                                                                                                                                                                                 |
| rootClass           |             | string         | -      | () => {<br> const override = getValueByPath(config, 'autocomplete.override', false)<br> const clazz = getValueByPath(config, 'autocomplete.rootClass', '')<br> return getCssClass(clazz, override, 'o-autocomplete')<br>}                       |
| menuClass           |             | string         | -      | () => {<br> const override = getValueByPath(config, 'autocomplete.override', false)<br> const clazz = getValueByPath(config, 'autocomplete.menuClass', '')<br> return getCssClass(clazz, override, 'o-autocomplete-menu')<br>}                  |
| expandedClass       |             | string         | -      | () => {<br> const override = getValueByPath(config, 'autocomplete.override', false)<br> const clazz = getValueByPath(config, 'autocomplete.expandedClass', '')<br> return getCssClass(clazz, override, 'o-autocomplete-expanded')<br>}          |
| itemClass           |             | string         | -      | () => {<br> const override = getValueByPath(config, 'autocomplete.override', false)<br> const clazz = getValueByPath(config, 'autocomplete.activeClass', '')<br> return getCssClass(clazz, override, 'o-autocomplete-item')<br>}                |
| itemHoveredClass    |             | string         | -      | () => {<br> const override = getValueByPath(config, 'autocomplete.override', false)<br> const clazz = getValueByPath(config, 'autocomplete.itemHoveredClass', '')<br> return getCssClass(clazz, override, 'o-autocomplete-item-hovered')<br>}   |
| itemDisabledClass   |             | string         | -      | () => {<br> const override = getValueByPath(config, 'autocomplete.override', false)<br> const clazz = getValueByPath(config, 'autocomplete.itemDisabledClass', '')<br> return getCssClass(clazz, override, 'o-autocomplete-item-disabled')<br>} |

## Events

| Event name       | Type      | Description |
| ---------------- | --------- | ----------- |
| icon-click       |           |
| blur             | undefined |
| focus            | undefined |
| input            | undefined |
| select           | undefined |
| infinite-scroll  |           |
| typing           | undefined |
| icon-right-click | undefined |

## Slots

| Name    | Description | Bindings                                                                 |
| ------- | ----------- | ------------------------------------------------------------------------ |
| header  |             |                                                                          |
| default |             | [<br> {<br> "name": "option"<br> },<br> {<br> "name": "index"<br> }<br>] |
| empty   |             |                                                                          |
| footer  |             |                                                                          |

## Style

| CSS Variable                                     | SASS Variable                              | Default                                                              |
| ------------------------------------------------ | ------------------------------------------ | -------------------------------------------------------------------- |
| --oruga-autocomplete-item-color                  | \$autocomplete-item-color                  | #000000                                                              |
| --oruga-autocomplete-item-disabled-opacity       | \$autocomplete-item-disabled-opacity       | \$base-disabled-opacity                                              |
| --oruga-autocomplete-item-font-size              | \$autocomplete-item-font-size              | \$base-font-size                                                     |
| --oruga-autocomplete-item-hover-background-color | \$autocomplete-item-hover-background-color | grey                                                                 |
| --oruga-autocomplete-item-hover-color            | \$autocomplete-item-hover-color            | #000000                                                              |
| --oruga-autocomplete-item-line-height            | \$autocomplete-item-line-height            | \$base-line-height                                                   |
| --oruga-autocomplete-item-padding                | \$autocomplete-item-padding                | .375rem 1rem                                                         |
| --oruga-autocomplete-menu-background             | \$autocomplete-menu-background             | #ffffff                                                              |
| --oruga-autocomplete-menu-border-radius          | \$autocomplete-menu-border-radius          | \$base-border-radius                                                 |
| --oruga-autocomplete-menu-box-shadow             | \$autocomplete-menu-box-shadow             | 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02) |
| --oruga-autocomplete-menu-margin                 | \$autocomplete-menu-margin                 | 0                                                                    |
| --oruga-autocomplete-menu-max-height             | \$autocomplete-menu-max-height             | 200px                                                                |
| --oruga-autocomplete-menu-padding                | \$autocomplete-menu-padding                | .5rem 0 .5rem 0                                                      |
| --oruga-autocomplete-menu-zindex                 | \$autocomplete-menu-zindex                 | 20                                                                   |

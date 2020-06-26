---
title: OPagination
---

# OPagination

> A responsive and flexible pagination

## Props

| Prop name         | Description | Type           | Values | Default                                                                                                                                                                                                                                 |
| ----------------- | ----------- | -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| total             |             | number\|string | -      |                                                                                                                                                                                                                                         |
| perPage           |             | number\|string | -      | 20                                                                                                                                                                                                                                      |
| current           |             | number\|string | -      | 1                                                                                                                                                                                                                                       |
| rangeBefore       |             | number\|string | -      | 1                                                                                                                                                                                                                                       |
| rangeAfter        |             | number\|string | -      | 1                                                                                                                                                                                                                                       |
| size              |             | string         | -      |                                                                                                                                                                                                                                         |
| simple            |             | boolean        | -      |                                                                                                                                                                                                                                         |
| rounded           |             | boolean        | -      |                                                                                                                                                                                                                                         |
| order             |             | string         | -      |                                                                                                                                                                                                                                         |
| iconPack          |             | string         | -      |                                                                                                                                                                                                                                         |
| iconPrev          |             | string         | -      | () => getValueByPath(config, 'pagination.iconPrev', 'chevron-left')                                                                                                                                                                     |
| iconNext          |             | string         | -      | () => getValueByPath(config, 'pagination.iconNext', 'chevron-right')                                                                                                                                                                    |
| ariaNextLabel     |             | string         | -      |                                                                                                                                                                                                                                         |
| ariaPreviousLabel |             | string         | -      |                                                                                                                                                                                                                                         |
| ariaPageLabel     |             | string         | -      |                                                                                                                                                                                                                                         |
| ariaCurrentLabel  |             | string         | -      |                                                                                                                                                                                                                                         |
| rootClass         |             | string         | -      | () => {<br> const override = getValueByPath(config, 'pagination.override', false)<br> const clazz = getValueByPath(config, 'pagination.rootClass', '')<br> return getCssClass(clazz, override, 'o-pagination')<br>}                     |
| prevBtnClass      |             | string         | -      | () => {<br> const override = getValueByPath(config, 'pagination.override', false)<br> const clazz = getValueByPath(config, 'pagination.prevBtnClass', '')<br> return getCssClass(clazz, override, 'o-pagination-previous')<br>}         |
| nextBtnClass      |             | string         | -      | () => {<br> const override = getValueByPath(config, 'pagination.override', false)<br> const clazz = getValueByPath(config, 'pagination.nextBtnClass', '')<br> return getCssClass(clazz, override, 'o-pagination-next')<br>}             |
| listClass         |             | string         | -      | () => {<br> const override = getValueByPath(config, 'pagination.override', false)<br> const clazz = getValueByPath(config, 'pagination.listClass', '')<br> return getCssClass(clazz, override, 'o-pagination-list')<br>}                |
| linkClass         |             | string         | -      | () => {<br> const override = getValueByPath(config, 'pagination.override', false)<br> const clazz = getValueByPath(config, 'pagination.linkClass', '')<br> return getCssClass(clazz, override, 'o-pagination-link')<br>}                |
| linkCurrentClass  |             | string         | -      | () => {<br> const override = getValueByPath(config, 'pagination.override', false)<br> const clazz = getValueByPath(config, 'pagination.linkCurrentClass', '')<br> return getCssClass(clazz, override, 'o-pagination-link-current')<br>} |
| ellipsisClass     |             | string         | -      | () => {<br> const override = getValueByPath(config, 'pagination.override', false)<br> const clazz = getValueByPath(config, 'pagination.ellipsisClass', '')<br> return getCssClass(clazz, override, 'o-pagination-ellipsis')<br>}        |
| infoClass         |             | string         | -      | () => {<br> const override = getValueByPath(config, 'pagination.override', false)<br> const clazz = getValueByPath(config, 'pagination.infoClass', '')<br> return getCssClass(clazz, override, 'o-pagination-info')<br>}                |
| simpleClass       |             | string         | -      | () => {<br> const override = getValueByPath(config, 'pagination.override', false)<br> const clazz = getValueByPath(config, 'pagination.simpleClass', '')<br> return getCssClass(clazz, override, 'o-pagination-simple')<br>}            |
| roundedClass      |             | string         | -      | () => {<br> const override = getValueByPath(config, 'pagination.override', false)<br> const clazz = getValueByPath(config, 'pagination.roundedClass', '')<br> return getCssClass(clazz, override, 'o-pagination-rounded')<br>}          |

## Events

| Event name     | Type      | Description |
| -------------- | --------- | ----------- |
| change         | undefined |
| update:current | undefined |

## Slots

| Name     | Description | Bindings                                                                                                               |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| previous |             | [<br> {<br> "name": "linkClass"<br> },<br> {<br> "name": "linkCurrentClass"<br> },<br> {<br> "name": "page"<br> }<br>] |
| next     |             | [<br> {<br> "name": "linkClass"<br> },<br> {<br> "name": "linkCurrentClass"<br> },<br> {<br> "name": "page"<br> }<br>] |
| default  |             | [<br> {<br> "name": "page"<br> },<br> {<br> "name": "linkClass"<br> },<br> {<br> "name": "linkCurrentClass"<br> }<br>] |

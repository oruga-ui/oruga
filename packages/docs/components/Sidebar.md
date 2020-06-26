---
title: OSidebar
---

# OSidebar

## Props

| Prop name               | Description | Type           | Values | Default                                                                                                                                                                                                                                     |
| ----------------------- | ----------- | -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open                    |             | boolean        | -      |                                                                                                                                                                                                                                             |
| variant                 |             | string\|object | -      |                                                                                                                                                                                                                                             |
| overlay                 |             | boolean        | -      |                                                                                                                                                                                                                                             |
| position                |             | string         | -      | 'fixed'                                                                                                                                                                                                                                     |
| fullheight              |             | boolean        | -      |                                                                                                                                                                                                                                             |
| fullwidth               |             | boolean        | -      |                                                                                                                                                                                                                                             |
| right                   |             | boolean        | -      |                                                                                                                                                                                                                                             |
| mobile                  |             | string         | -      |                                                                                                                                                                                                                                             |
| reduce                  |             | boolean        | -      |                                                                                                                                                                                                                                             |
| expandOnHover           |             | boolean        | -      |                                                                                                                                                                                                                                             |
| expandOnHoverFixed      |             | boolean        | -      |                                                                                                                                                                                                                                             |
| canCancel               |             | array\|boolean | -      | () => ['escape', 'outside']                                                                                                                                                                                                                 |
| onCancel                |             | func           | -      | () => {}                                                                                                                                                                                                                                    |
| rootClass               |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.rootClass', '')<br> return getCssClass(clazz, override, 'o-sidebar')<br>}                                  |
| backgroundClass         |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.backgroundClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-background')<br>}                 |
| contentClass            |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.contentClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-content')<br>}                       |
| fixedClass              |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.fixedClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-fixed')<br>}                           |
| staticClass             |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.staticClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-static')<br>}                         |
| absoluteClass           |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.absoluteClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-absolute')<br>}                     |
| fullheightClass         |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.fullheightClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-fullheight')<br>}                 |
| fullwidthClass          |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.fullwidthClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-fullwidth')<br>}                   |
| rightClass              |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.rightClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-right')<br>}                           |
| reduceClass             |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.reduceClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-mini')<br>}                           |
| expandOnHoverClass      |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.expandOnHoverClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-expand-hover')<br>}            |
| expandOnHoverFixedClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.expandOnHoverFixedClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-expand-hover-fixed')<br>} |
| mobileReduceClass       |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.mobileReduceClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-mini-mobile')<br>}              |
| mobileHideClass         |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.mobileHideClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-hidden-mobile')<br>}              |
| mobileFullwidthClass    |             | string         | -      | () => {<br> const override = getValueByPath(config, 'sidebar.override', false)<br> const clazz = getValueByPath(config, 'sidebar.mobileFullwidthClass', '')<br> return getCssClass(clazz, override, 'o-sidebar-mini-fullwidth')<br>}        |

## Events

| Event name  | Type      | Description |
| ----------- | --------- | ----------- |
| close       |           |
| update:open | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

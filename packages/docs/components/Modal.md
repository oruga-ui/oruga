---
title: OModal
---

# OModal

## Props

| Prop name       | Description | Type           | Values | Default                                                                                                                                                                                                               |
| --------------- | ----------- | -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active          |             | boolean        | -      |                                                                                                                                                                                                                       |
| component       |             | object\|func   | -      |                                                                                                                                                                                                                       |
| content         |             | string         | -      |                                                                                                                                                                                                                       |
| programmatic    |             | boolean        | -      |                                                                                                                                                                                                                       |
| props           |             | object         | -      |                                                                                                                                                                                                                       |
| events          |             | object         | -      |                                                                                                                                                                                                                       |
| width           |             | string\|number | -      | 960                                                                                                                                                                                                                   |
| custom          |             | boolean        | -      |                                                                                                                                                                                                                       |
| animation       |             | string         | -      | 'zoom-out'                                                                                                                                                                                                            |
| canCancel       |             | array\|boolean | -      | () => {<br> getValueByPath(config, 'modal.canCancel', ['escape', 'x', 'outside', 'button'])<br>}                                                                                                                      |
| onCancel        |             | func           | -      | () => {}                                                                                                                                                                                                              |
| scroll          |             | string         | -      | () => {<br> return getValueByPath(config, 'modal.scroll', 'keep')<br>}                                                                                                                                                |
| fullScreen      |             | boolean        | -      |                                                                                                                                                                                                                       |
| trapFocus       |             | boolean        | -      | () => {<br> return getValueByPath(config, 'modal.trapFocus', true)<br>}                                                                                                                                               |
| ariaRole        |             | string         | -      |                                                                                                                                                                                                                       |
| ariaModal       |             | boolean        | -      |                                                                                                                                                                                                                       |
| destroyOnHide   |             | boolean        | -      | true                                                                                                                                                                                                                  |
| rootClass       |             | string         | -      | () => {<br> const override = getValueByPath(config, 'modal.override', false)<br> const clazz = getValueByPath(config, 'modal.rootClass', '')<br> return getCssClass(clazz, override, 'o-modal')<br>}                  |
| backgroundClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'modal.override', false)<br> const clazz = getValueByPath(config, 'modal.backgroundClas', '')<br> return getCssClass(clazz, override, 'o-modal-background')<br>}  |
| contentClass    |             | string         | -      | () => {<br> const override = getValueByPath(config, 'modal.override', false)<br> const clazz = getValueByPath(config, 'modal.contentClass', '')<br> return getCssClass(clazz, override, 'o-modal-content')<br>}       |
| closeClass      |             | string         | -      | () => {<br> const override = getValueByPath(config, 'modal.override', false)<br> const clazz = getValueByPath(config, 'modal.closeClass', '')<br> return getCssClass(clazz, override, 'o-modal-close')<br>}           |
| fullScreenClass |             | string         | -      | () => {<br> const override = getValueByPath(config, 'modal.override', false)<br> const clazz = getValueByPath(config, 'modal.fullScreenClass', '')<br> return getCssClass(clazz, override, 'o-modal-fullscreen')<br>} |

## Events

| Event name    | Type      | Description |
| ------------- | --------- | ----------- |
| close         |           |
| update:active | undefined |

---
title: OSlider
---

# OSlider

## Props

| Prop name              | Description | Type          | Values | Default                                                                                                                                                                                                                         |
| ---------------------- | ----------- | ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value                  |             | number\|array | -      | 0                                                                                                                                                                                                                               |
| min                    |             | number        | -      | 0                                                                                                                                                                                                                               |
| max                    |             | number        | -      | 100                                                                                                                                                                                                                             |
| step                   |             | number        | -      | 1                                                                                                                                                                                                                               |
| variant                |             | string        | -      | ''                                                                                                                                                                                                                              |
| size                   |             | string        | -      |                                                                                                                                                                                                                                 |
| ticks                  |             | boolean       | -      | false                                                                                                                                                                                                                           |
| tooltip                |             | boolean       | -      | true                                                                                                                                                                                                                            |
| tooltipVariant         |             | string        | -      |                                                                                                                                                                                                                                 |
| rounded                |             | boolean       | -      | false                                                                                                                                                                                                                           |
| disabled               |             | boolean       | -      | false                                                                                                                                                                                                                           |
| lazy                   |             | boolean       | -      | false                                                                                                                                                                                                                           |
| customFormatter        |             | func          | -      |                                                                                                                                                                                                                                 |
| ariaLabel              |             | string\|array | -      |                                                                                                                                                                                                                                 |
| biggerSliderFocus      |             | boolean       | -      | false                                                                                                                                                                                                                           |
| rootClass              |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.rootClass', '')<br> return getCssClass(clazz, override, 'o-slider')<br>}                         |
| trackClass             |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.trackClass', '')<br> return getCssClass(clazz, override, 'o-slider-track')<br>}                  |
| fillClass              |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.fillClass', '')<br> return getCssClass(clazz, override, 'o-slider-fill')<br>}                    |
| roundedClass           |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.roundedClass', '')<br> return getCssClass(clazz, override, 'o-slider-rounded')<br>}              |
| draggingClass          |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.draggingClass', '')<br> return getCssClass(clazz, override, 'o-slider-dragging')<br>}            |
| disabledClass          |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.disabledClass', '')<br> return getCssClass(clazz, override, 'o-slider-disabled')<br>}            |
| biggerSliderFocusClass |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.biggerSliderFocusClass', '')<br> return getCssClass(clazz, override, 'o-slider-focus')<br>}      |
| wrapperThumbClass      |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.wrapperThumbClass', '')<br> return getCssClass(clazz, override, 'o-slider-wrapper-thumb')<br>}   |
| thumbClass             |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.thumbClass', '')<br> return getCssClass(clazz, override, 'o-slider-thumb')<br>}                  |
| thumbDraggingClass     |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.thumbDraggingClass', '')<br> return getCssClass(clazz, override, 'o-slider-thumb-dragging')<br>} |
| tickClass              |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.tickClass', '')<br> return getCssClass(clazz, override, 'o-slider-tick')<br>}                    |
| tickHiddenClass        |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.tickHiddenClass', '')<br> return getCssClass(clazz, override, 'o-slider-tick-hidden')<br>}       |
| tickLabelClass         |             | string        | -      | () => {<br> const override = getValueByPath(config, 'slider.override', false)<br> const clazz = getValueByPath(config, 'slider.tickLabelClass', '')<br> return getCssClass(clazz, override, 'o-slider-tick-label')<br>}         |

## Events

| Event name | Type | Description |
| ---------- | ---- | ----------- |
| dragstart  |      |
| dragend    |      |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---
title: Slider
---

# Slider

> A slider to select a value or range from a given range

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/..\oruga\src\components\slider\examples\Slider.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-field label="Simple">
      <o-slider v-model="value"></o-slider>
    </o-field>

    <o-field label="Warning">
      <o-slider v-model="value" variant="warning"></o-slider>
    </o-field>

    <o-field label="Large">
      <o-slider v-model="value" size="large"></o-slider>
    </o-field>

    <o-field label="Disabled">
      <o-slider :value="30" disabled></o-slider>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        value: 5
      }
    }
  }
</script>
```

:::

### Customize

::: demo

```html
<template>
  <section>
    <o-field label="Tooltip type">
      <o-slider v-model="sliderValue" :tooltip-variant="sliderType"></o-slider>
    </o-field>

    <o-field label="Hide tooltip">
      <o-slider :tooltip="false"></o-slider>
    </o-field>

    <o-field label="Custom tooltip label">
      <o-slider :custom-formatter="val => val + '%'"></o-slider>
    </o-field>

    <o-field label="Rounded thumb">
      <o-slider rounded></o-slider>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        sliderValue: 0
      }
    },
    computed: {
      sliderType() {
        if (this.sliderValue > 25 && this.sliderValue < 75) {
          return 'warning'
        } else if (this.sliderValue >= 75) {
          return 'success'
        }
        return 'danger'
      }
    }
  }
</script>
```

:::

### Tick and label

::: demo

```html
<template>
  <section>
    <o-field label="Show ticks">
      <o-slider :min="1" :max="10" ticks></o-slider>
    </o-field>

    <o-field label="Custom tick and label">
      <o-slider size="medium" :min="0" :max="10">
        <template v-for="val in [3, 5, 8]">
          <o-slider-tick :value="val" :key="val">{{ val }}</o-slider-tick>
        </template>
      </o-slider>
    </o-field>

    <o-field label="Fan">
      <o-slider :min="0" :max="3" aria-label="Fan" :tooltip="false">
        <o-slider-tick :value="0">Off</o-slider-tick>
        <o-slider-tick :value="1">Low</o-slider-tick>
        <o-slider-tick :value="2">High</o-slider-tick>
        <o-slider-tick :value="3">Auto</o-slider-tick>
      </o-slider>
    </o-field>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Range

::: demo

```html
<template>
  <section>
    <o-field>
      <o-slider v-model="numbers" :min="1" :max="15" :step="0.5" ticks> </o-slider>
    </o-field>

    <o-field>
      <o-slider v-model="numbers2" variant="danger" :min="-2" :max="8" :step="2"> </o-slider>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        numbers: [2, 5],
        numbers2: [2, 6]
      }
    }
  }
</script>
```

:::

## Props

| Prop name              | Description                                      | Type          | Values                                                                          | Default                                             |
| ---------------------- | ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------- | --------------------------------------------------- |
| v-model                |                                                  | number\|array | -                                                                               | 0                                                   |
| min                    | Minimum value                                    | number        | -                                                                               | 0                                                   |
| max                    | Maximum value                                    | number        | -                                                                               | 100                                                 |
| step                   | Step interval of ticks                           | number        | -                                                                               | 1                                                   |
| variant                | Color of the slider                              | string        | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | Config -> <code> 'slider.variant': 'primary'</code> |
| size                   | Vertical size of slider, optional                | string        | `small`, `medium`, `large`                                                      |                                                     |
| ticks                  | Show tick marks                                  | boolean       | -                                                                               | false                                               |
| tooltip                | Show tooltip when thumb is being dragged         | boolean       | -                                                                               | true                                                |
| tooltipVariant         | Color of the tooltip                             | string        | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                     |
| rounded                | Rounded thumb                                    | boolean       | -                                                                               | Config -> <code> 'slider.rounded': false</code>     |
| disabled               |                                                  | boolean       | -                                                                               | false                                               |
| lazy                   | Update v-model only when dragging is finished    | boolean       | -                                                                               | false                                               |
| customFormatter        | Function to format the tooltip label for display | func          | -                                                                               |                                                     |
| ariaLabel              |                                                  | string\|array | -                                                                               |                                                     |
| biggerSliderFocus      | Increases slider size on focus                   | boolean       | -                                                                               | false                                               |
| indicator              |                                                  | boolean       | -                                                                               | false                                               |
| format                 |                                                  | string        | -                                                                               | 'raw'                                               |
| locale                 |                                                  | string\|array | -                                                                               | Config -> <code> 'locale':undefined</code>          |
| tooltipAlways          | Tooltip displays always                          | boolean       | -                                                                               | false                                               |
| rootClass              |                                                  | string        | -                                                                               |                                                     |
| trackClass             |                                                  | string        | -                                                                               |                                                     |
| fillClass              |                                                  | string        | -                                                                               |                                                     |
| roundedClass           |                                                  | string        | -                                                                               |                                                     |
| draggingClass          |                                                  | string        | -                                                                               |                                                     |
| disabledClass          |                                                  | string        | -                                                                               |                                                     |
| biggerSliderFocusClass |                                                  | string        | -                                                                               |                                                     |
| thumbWrapperClass      |                                                  | string        | -                                                                               |                                                     |
| thumbClass             |                                                  | string        | -                                                                               |                                                     |
| thumbDraggingClass     |                                                  | string        | -                                                                               |                                                     |

### Events

| Event name | Type | Description |
| ---------- | ---- | ----------- |
| dragstart  |      |
| dragend    |      |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

# SliderTick

## Props

| Prop name       | Description          | Type   | Values | Default |
| --------------- | -------------------- | ------ | ------ | ------- |
| value           | Value of single tick | number | -      | 0       |
| tickClass       |                      | string | -      |         |
| tickHiddenClass |                      | string | -      |         |
| tickLabelClass  |                      | string | -      |         |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable              | SASS Variable       | Default     |
| ------------------------- | ------------------- | ----------- |
| --oruga-slider-background | \$slider-background | transparent |
| \$slider-focus-margin     |

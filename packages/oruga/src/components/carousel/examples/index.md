<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import List from "./list.vue";
import ListCode from "./list.vue?raw";

import Indicators from "./indicators.vue";
import IndicatorsCode from "./indicators.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";

import Slideshow from "./slideshow.vue";
import SlideshowCode from "./slideshow.vue?raw";

import Autoplay from "./autoplay.vue";
import AutoplayCode from "./autoplay.vue?raw";
</script>

### Base

Here is a basic example of a carousel with some slides. When no `value` is set for an item, the index of the slide is used to as `v-model` value.

<ExampleViewer :component="Base" :code="BaseCode" />

### Indicators

Alongside the previous/next controls, slide indicators can be activated using the `indicators` prop. Indicators allow the user to jump directly to a particular slide. The position can be set with the `indicatorPosition` and `indicatorInside` props to display the indicators at the top or bottom and inside or outside the slide. If there is more than one style defined for the indicators in a theme, the style can be customised by using the `indicatorStyle` prop.

<ExampleViewer :component="Indicators" :code="IndicatorsCode" />

### Options

Instead of using the `<o-carousel-item>` component directly inside the default slot, an `options` prop can be set, which allows the options to be set programmatically. All `<o-carousel-item>` component props can be used as attributes of the item object in the options list.

<ExampleViewer :component="Options" :code="OptionsCode" />

### Carousel List

The component is capable of displaying and rotating more than one slide at a time. Therefore, the `items-to-show` and `items-to-list` props can be used to specify the number of items to be shown and rotated at once.

<ExampleViewer :component="List" :code="ListCode" />

### Slideshow

Using the `indicators` slot, the indicators can be further customised to create a custom style like a picture gallery slideshow. Click on the slide to open the gallery mode.

<ExampleViewer :component="Slideshow" :code="SlideshowCode" />

### Autoplay

Using the `autoplay` prop, the carousel will run automatically. The `interval` prop can be used to set the cycle speed. Moving focus to any of the carousel content, including the tab elements, pauses automatic rotation, when the `pause-hover` prop is set. If operating system preferences have been set for reduced motion or disabling animations, the auto-rotation is initially paused.

::: info Accessibility Note:
When using autoplay, users must be able to stop and start slide rotation, which is an essential aspect of carousel accessibility for a variety of people with disabilities. People with low vision or a cognitive disability that affects visual processing or reading benefit from being able to control slide rotation so that they have enough time to explore slide content.
:::

<ExampleViewer :component="Autoplay" :code="AutoplayCode" />

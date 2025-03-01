<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import List from "./list.vue";
import ListCode from "./list.vue?raw";

import Indicators from "./indicators.vue";
import IndicatorsCode from "./indicators.vue?raw";

import Custom from "./custom.vue";
import CustomCode from "./custom.vue?raw";

import Autoplay from "./autoplay.vue";
import AutoplayCode from "./autoplay.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>Here is a basic example of a carousel with some slides.</p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="indicatios">Indicators</h3>
    <p>
        Alongside the previous/next controls, slide indicators can be activated
        using the <code>indicators</code> prop. Indicators allow the user to
        jump directly to a particular slide.The position can be set with the
        <code>indicatorPosition</code> and <code>indicatorInside</code> props to
        display the indicators at the top or bottom and inside or outside the
        slide. If there is more than one style defined for the indicators in a
        theme, the style can be customised by using the
        <code>indicatorStyle</code> prop.
    </p>
    <ExampleViewer :component="Indicators" :code="IndicatorsCode" />

    <h3 id="list">Carousel List</h3>
    <p>
        The component is capable of displaying and rotating more than one slide
        at a time. Therefore, the <code>items-to-show</code> and
        <code>items-to-list</code> props can be used to specify the number of
        items to be shown and rotated at once.
    </p>
    <ExampleViewer :component="List" :code="ListCode" />

    <h3 id="slideshow">Slideshow</h3>
    <p>
        Using the <code>indicators</code> slot, the indicators can be further
        customised to create a custom style like a picture gallery slideshow.
        Click on the slide to open the gallery mode.
    </p>
    <ExampleViewer :component="Custom" :code="CustomCode" />

    <h3 id="autoplay">Autoplay</h3>
    <p>
        Using the <code>autoplay</code> prop, the carousel will run
        automatically. The <code>interval</code> prop can be used to set the
        cycle speed. Moving focus to any of the carousel content, including the
        tab elements, pauses automatic rotation, when the
        <code>pause-hover</code> prop is set. If operating system preferences
        have been set for reduced motion or disabling animations, the
        auto-rotation is initially paused.
    </p>
    <div class="info custom-block">
        <p class="custom-block-title">Accessibility Note:</p>
        <p>
            When using autoplay, users must be able to stop and start slide
            rotation, which is an essential aspect of carousel accessibility for
            a variety of people with disabilities. People with low vision or a
            cognitive disability that affects visual processing or reading
            benefit from being able to control slide rotation so that they have
            enough time to explore slide content.
        </p>
    </div>
    <ExampleViewer :component="Autoplay" :code="AutoplayCode" />
</template>

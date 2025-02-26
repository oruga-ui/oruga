<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import List from "./list.vue";
import ListCode from "./list.vue?raw";

import Indicators from "./indicators.vue";
import IndicatorsCode from "./indicators.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>Here is a basic example of a carousel with some slides.</p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="list">Carousel List</h3>
    <p>
        The <code>items-to-show</code> and <code>items-to-list</code> props can
        be used to specify the number of items to be displayed and rotated at
        once.
    </p>
    <ExampleViewer :component="List" :code="ListCode" />

    <h3 id="indicatios">Custom Indicators</h3>
    <p>
        Alongside the previous/next controls, the indicators can be customised
        by using the <code>indicators</code> slot. The indicators let users jump
        directly to a particular slide.
    </p>
    <p>Click on the slide to open the gallery mode.</p>
    <ExampleViewer :component="Indicators" :code="IndicatorsCode" />

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
    <ExampleViewer :component="Customise" :code="CustomiseCode" />
</template>

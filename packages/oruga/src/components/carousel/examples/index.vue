<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import List from "./list.vue";
import ListCode from "./list.vue?raw";

import CustomIndicators from "./custom-indicators.vue";
import CustomIndicatorsCode from "./custom-indicators.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";
</script>

<template>
    <div class="vp-doc">
        <h3 id="base">Base</h3>
        <p>Here is a basic example of a carousel with some slides.</p>
        <ExampleViewer :component="Base" :code="BaseCode" />

        <h3 id="list">Carousel List</h3>
        <p>
            The <code>items-to-show</code> and <code>items-to-list</code> props
            can be used to specify the number of items to be displayed at once.
        </p>
        <ExampleViewer :component="List" :code="ListCode" />

        <h3 id="indicatios">Custom Indicators</h3>
        <p>
            Alongside the previous/next controls, the indicators can be
            customised by using the <code>indicators</code> slot. The indicators
            let users jump directly to a particular slide.
        </p>
        <ExampleViewer
            :component="CustomIndicators"
            :code="CustomIndicatorsCode" />

        <h3 id="custom">Customise</h3>
        <p>
            Using the <code>autoplay</code> prop, the carousel will run
            automatically. The <code>interval</code> prop can be used to set the
            cycle speed.
        </p>
        <ExampleViewer :component="Customise" :code="CustomiseCode" />
    </div>
</template>

<style>
.ex-slide {
    padding: 9rem 4.5rem;
    color: #ffffff;
    text-align: center;
}
</style>

<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import MinMaxDate from "./min-max-date.vue";
import MinMaxDateCode from "./min-max-date.vue?raw";

import Slot from "./slot.vue";
import SlotCode from "./slot.vue?raw";

import Granularity from "./granularity.vue";
import GranularityCode from "./granularity.vue?raw";

import Inline from "./inline.vue";
import InlineCode from "./inline.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="inline">Inline</h3>
    <p>
        To render the component inline instead of a dropdown/modal use the
        <code>inline</code> prop.
    </p>
    <ExampleViewer :component="Inline" :code="InlineCode" />

    <h3 id="min_max">Min/Max date</h3>
    <p>
        Use the <code>min-time</code> and <code>max-time</code> props to define
        a limited time range for the user to choose from.
    </p>
    <ExampleViewer :component="MinMaxDate" :code="MinMaxDateCode" />

    <h3 id="slot">Footer Slot</h3>
    <p>
        The component has an additional <code>footer</code> slot for
        customization.
    </p>
    <ExampleViewer :component="Slot" :code="SlotCode" />

    <h3 id="granularity">Granularity</h3>
    <p>
        To define the granularity of the hours, minutes and seconds to select
        from use the <code>increment-hours</code>,
        <code>increment-minutes</code> and <code>increment-seconds</code> props.
    </p>
    <ExampleViewer :component="Granularity" :code="GranularityCode" />
</template>

<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import FooterSlot from "./footer-slot.vue";
import FooterSlotCode from "./footer-slot.vue?raw";

import Inline from "./inline.vue";
import InlineCode from "./inline.vue?raw";

import MinMax from "./min-max.vue";
import MinMaxCode from "./min-max.vue?raw";
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

    <h3 id="footer">Footer slot</h3>
    <p>
        The component has an additional <code>footer</code> slot for
        customization.
    </p>
    <ExampleViewer :component="FooterSlot" :code="FooterSlotCode" />

    <h3 id="min_max">Min/Max Datetime</h3>
    <p>
        Use the <code>min-datetime</code> and <code>max-datetime</code> props to
        define a limited date range for the user to choose from.
    </p>
    <ExampleViewer :component="MinMax" :code="MinMaxCode" />
</template>

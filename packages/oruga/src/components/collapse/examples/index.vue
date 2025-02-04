<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Accordion from "./accordion.vue";
import AccordionCode from "./accordion.vue?raw";

import AccordionButtons from "./accordion-buttons.vue";
import AccordionButtonsCode from "./accordion-buttons.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <div class="vp-doc">
        <p>Click the buttons below to show and hide the content.</p>
    </div>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="accordion">Accordion</h3>
    <div class="vp-doc">
        <p>
            Combine multiple collapse components to create an accordion
            behaviour.
        </p>
    </div>
    <ExampleViewer :component="Accordion" :code="AccordionCode" />
    <ExampleViewer :component="AccordionButtons" :code="AccordionButtonsCode" />
</template>

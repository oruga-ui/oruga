<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Accordion from "./accordion.vue";
import AccordionCode from "./accordion.vue?raw";

import AccordionButtons from "./accordion-buttons.vue";
import AccordionButtonsCode from "./accordion-buttons.vue?raw";
</script>

<template>
    <div class="vp-doc">
        <h3 id="base">Base</h3>
        <p>Click the buttons below to show and hide the content.</p>
        <ExampleViewer :component="Base" :code="BaseCode" />

        <h3 id="accordion">Accordion</h3>
        <p>
            Combine multiple collapse components to create an accordion
            behaviour.
        </p>
        <ExampleViewer :component="Accordion" :code="AccordionCode" />
        <ExampleViewer
            :component="AccordionButtons"
            :code="AccordionButtonsCode" />
    </div>
</template>

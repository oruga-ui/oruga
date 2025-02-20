<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Accordion from "./accordion.vue";
import AccordionCode from "./accordion.vue?raw";
</script>

<template>
    <div class="vp-doc">
        <h3 id="base">Base</h3>
        <p>A custom trigger can be passed in the <code>trigger</code> slot.</p>
        <div class="info custom-block">
            <p class="custom-block-title">Accessibility Note:</p>
            The trigger container is already an interactive element with the
            <code>role="button"</code> attribute. For accessibility reasons,
            prevent adding other interactive elements such as buttons to avoid
            <a
                target="_blank"
                href="https://accessibilityinsights.io/info-examples/web/nested-interactive/">
                nested-interactive
            </a>
            accessibility problems.
        </div>
        <ExampleViewer :component="Base" :code="BaseCode" />

        <h3 id="accordion">Accordion</h3>
        <p>
            Combine multiple collapse components to create an accordion
            behaviour.
        </p>
        <ExampleViewer :component="Accordion" :code="AccordionCode" />
    </div>
</template>

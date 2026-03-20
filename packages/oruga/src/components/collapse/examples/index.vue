<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";

import Accordion from "./accordion.vue";
import AccordionCode from "./accordion.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        A custom trigger can be passed in the <code>trigger</code> slot. When
        the controlled content is hidden, the trigger is often styled as a
        typical push button with a right-pointing arrow or triangle, to indicate
        that activating the trigger will display the hidden content. When the
        content is visible, the arrow or triangle usually points down.
    </p>
    <div class="info custom-block">
        <p class="custom-block-title">Accessibility Note:</p>
        The trigger container is already an interactive element with the
        <code>role="button"</code> attribute. For accessibility reasons, prevent
        adding other interactive elements such as buttons to avoid
        <a
            target="_blank"
            href="https://accessibilityinsights.io/info-examples/web/nested-interactive/">
            nested-interactive
        </a>
        accessibility problems.
    </div>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="position">Position</h3>
    <p>
        The collapse can be configured by the <code>position</code> property to
        open to top instead of bottom.
    </p>
    <ExampleViewer :component="Position" :code="PositionCode" />

    <h3 id="accordion">Accordion</h3>
    <p>
        Using the
        <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details#name">
            <code>name</code>
        </a>
        property multiple collapse components can be connected to create an
        accordion behaviour, with only one open at a time.
    </p>
    <ExampleViewer :component="Accordion" :code="AccordionCode" />
</template>

<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Slot from "./slot.vue";
import SlotCode from "./slot.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        The loading state is displayed across the entire page if the
        <code>full-page</code> prop is added. Otherwise, the overlay will be
        aligned to the next wrapper element with
        <code>style="position: relative"</code>.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="slot">Slot</h3>
    <p>Override the loading icon by passing a <code>default</code> slot.</p>
    <ExampleViewer :component="Slot" :code="SlotCode" />

    <h3 id="programmatically">Programmatically</h3>
    <p>
        This component provides a programmatic interface that can be accessed by
        the
        <a href="/documentation/composables.html"><code>useOruga()</code> </a>
        composable.
    </p>
    <ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />
</template>

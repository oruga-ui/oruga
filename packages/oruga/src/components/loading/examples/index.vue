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
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="slot">Slot</h3>
    <ExampleViewer :component="Slot" :code="SlotCode" />

    <h3 id="programmatically">Programmatically</h3>
    <div class="vp-doc">
        <p>
            This component provides a programmatic interface that can be
            accessed by the
            <a href="/documentation/composables.html"
                ><code>useOruga()</code>
            </a>
            composable.
        </p>
    </div>
    <ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />
</template>

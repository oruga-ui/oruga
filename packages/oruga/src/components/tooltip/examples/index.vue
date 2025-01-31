<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";

import Multiline from "./multiline.vue";
import MultilineCode from "./multiline.vue?raw";

import Slot from "./slot.vue";
import SlotCode from "./slot.vue?raw";

import Triggers from "./triggers.vue";
import TriggersCode from "./triggers.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="position">Position</h3>
    <ExampleViewer :component="Position" :code="PositionCode" />

    <h3 id="variants">Variants</h3>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="multiline">Multiline</h3>
    <ExampleViewer :component="Multiline" :code="MultilineCode" />

    <h3 id="slot">Slot</h3>
    <ExampleViewer :component="Slot" :code="SlotCode" />

    <h3 id="triggers">Triggers</h3>
    <ExampleViewer :component="Triggers" :code="TriggersCode" />
</template>

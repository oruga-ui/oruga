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
    <p>
        The direction in which the tooltip opens can be defined by the
        <code>position</code> prop. By default, the direction is automatically
        calculated from the distance to the edge of the window. Adding the
        <code>teleport</code> prop additionally will move the tooltip to the
        referenced DOM location instead.
    </p>
    <ExampleViewer :component="Position" :code="PositionCode" />

    <h3 id="triggers">Triggers</h3>
    <p>
        The action to trigger the tooltip can be customized using the
        <code>triggers</code> prop. The action that closes the tooltip can be
        customized using the <code>closaeble</code> prop.
    </p>
    <ExampleViewer :component="Triggers" :code="TriggersCode" />

    <h3 id="variants">Variants</h3>
    <p>Different styles can be achieved with the <code>variant</code> prop.</p>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="multiline">Multiline</h3>
    <p>
        Sometimes the tooltip label can be very long. Consider setting the
        <code>multiline</code> prop to force a line break.
    </p>
    <ExampleViewer :component="Multiline" :code="MultilineCode" />

    <h3 id="slot">Slot</h3>
    <p>
        The tooltip label can be customised using the
        <code>content</code> slot.
    </p>
    <ExampleViewer :component="Slot" :code="SlotCode" />
</template>

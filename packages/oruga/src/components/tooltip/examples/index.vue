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
    <p>
        While a tooltip can be placed on any content, they generally are tips
        for tools or controls, such as providing additional content for icons
        that have brief labels. An example of a native browser tooltip is the
        way some browsers display an element's <code>title</code> attribute on
        long mouse hover. However, this feature cannot be activated through
        either keyboard focus or touch interaction, making this feature
        inaccessible. If the information is important enough to include as a
        tooltip or title, consider including it in visible text.
    </p>
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
        The component accepts several different trigger variants, such as
        <code>openOnClick</code> or <code>openOnContextmenu</code> to only open
        on right click instead of left click. By default, only
        <code>openOnHover</code> is set. The action that close the component can
        also be customized using the <code>closeable</code>,
        <code>closeOnOutside</code> and <code>closeOnEscape</code> props.
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
    <div class="info custom-block">
        <p class="custom-block-title">Accessibility Note:</p>
        In terms of accessibility, tooltips provide additional information,
        generally with no direct interaction on the tooltip itself. Therefore,
        they should not contain any interactive elements, like links, inputs, or
        buttons; and it will never receive active focus itself. A tooltip is not
        considered to be a popup in this context.
    </div>
    <ExampleViewer :component="Slot" :code="SlotCode" />
</template>

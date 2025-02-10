<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";

import TickAndLabel from "./tick-and-label.vue";
import TickAndLabelCode from "./tick-and-label.vue?raw";

import Range from "./range.vue";
import RangeCode from "./range.vue?raw";
</script>

<template>
    <div class="vp-doc">
        <h3 id="base">Base</h3>
        <ExampleViewer :component="Base" :code="BaseCode" />

        <h3 id="sizes">Sizes</h3>
        <p>
            The component can be displayed in different sizes using the
            <code>size</code> prop.
        </p>
        <ExampleViewer :component="Sizes" :code="SizesCode" />

        <h3 id="variants">Variants</h3>
        <p>
            Different styles can be achieved with the <code>variant</code> prop.
        </p>
        <ExampleViewer :component="Variants" :code="VariantsCode" />

        <h3 id="customize">Customise</h3>
        <ExampleViewer :component="Customise" :code="CustomiseCode" />

        <h3 id="tick">Tick and label</h3>
        <p>Customise the labels using slots.</p>
        <ExampleViewer :component="TickAndLabel" :code="TickAndLabelCode" />

        <h3 id="range">Range</h3>
        <p>
            When the <code>range</code> prop is set, the
            <code>modelValue</code> property will be an array of two values
            instead of a single value.
        </p>
        <ExampleViewer :component="Range" :code="RangeCode" />
    </div>
</template>

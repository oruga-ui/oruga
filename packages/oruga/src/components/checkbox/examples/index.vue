<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Interminate from "./interminate.vue";
import InterminateCode from "./interminate.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./array.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        By default the checkbox type will renders a single checkbox and uses
        <code>boolean</code> values. In order for a single checkbox to be
        checked the current value of the input must match the
        <code>modelValue</code> of that input (by default, a single checkbox
        uses true as the <code>modelValue</code>). The true and false value can
        be modified by using the <code>true-value</code> and
        <code>false-value</code> properties.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="multiple">Multiple</h3>
    <p>
        To enable multiple checkboxes, set the <code>multiple</code> prop to
        <code>true</code>. This allows the component to accept an array for the
        <code>modelValue</code> prop. Then, if the box is checked, the value of
        the <code>native-value</code> property is added to the array.
    </p>
    <ExampleViewer :component="Multiple" :code="MultipleCode" />

    <h3 id="variants">Variants</h3>
    <p>Different styles can be achieved with the <code>variant</code> prop.</p>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="interminate">Interminate</h3>
    <p>
        Checkboxes can only have two states: checked or unchecked. Visually,
        there are actually three states a checkbox can be in: checked,
        unchecked, or indeterminate. This third state can be achieved by setting
        the
        <code>indeterminate</code> prop.
    </p>
    <ExampleViewer :component="Interminate" :code="InterminateCode" />

    <h3 id="sizes">Sizes</h3>
    <p>
        The component can be displayed in different sizes using the
        <code>size</code> prop.
    </p>
    <ExampleViewer :component="Sizes" :code="SizesCode" />
</template>

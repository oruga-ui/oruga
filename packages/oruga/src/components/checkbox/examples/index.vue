<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Interminate from "./interminate.vue";
import InterminateCode from "./interminate.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Array from "./array.vue";
import ArrayCode from "./array.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <div class="vp-doc">
        <p>
            By default the checkbox type will renders a single checkbox and uses
            <code>boolean</code> values. In order for a single checkbox to be
            checked the current value of the input must match the
            <code>modelValue</code> of that input (by default, a single checkbox
            uses true as the <code>modelValue</code>). The true and false value
            can be modified by using the <code>true-value</code> and
            <code>false-value</code> properties.
        </p>
    </div>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="multiple">Multiple</h3>
    <div class="vp-doc">
        <p>
            When passing an array as <code>modelValue</code> prop, the value of
            the <code>native-value</code> property is added to the array if the
            box is checked.
        </p>
    </div>
    <ExampleViewer :component="Array" :code="ArrayCode" />

    <h3 id="variants">Variants</h3>
    <div class="vp-doc">
        <p>
            Different styles can be achieved with the <code>variant</code> prop.
        </p>
    </div>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="interminate">Interminate</h3>
    <div class="vp-doc">
        <p>
            Checkboxes can only have two states: checked or unchecked. Visually,
            there are actually three states a checkbox can be in: checked,
            unchecked, or indeterminate. This third state can be achieved by
            setting the
            <code>indeterminate</code> prop.
        </p>
    </div>
    <ExampleViewer :component="Interminate" :code="InterminateCode" />

    <h3 id="sizes">Sizes</h3>
    <div class="vp-doc">
        <p>
            The component can be displayed in different sizes using the
            <code>size</code> prop.
        </p>
    </div>
    <ExampleViewer :component="Sizes" :code="SizesCode" />
</template>

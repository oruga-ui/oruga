<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        The default value of a checkbox is <code>false</code> when unchecked and
        <code>true</code> wenn checked. Use the <code>true-value</code> and
        <code>false-value</code> properties to specify different value that will
        be used as the <code>modelValue</code> property when the specific radio
        is checked and unchecked
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="variants">Variants</h3>
    <p>Different styles can be achieved with the <code>variant</code> prop.</p>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="sizes">Sizes</h3>
    <p>
        The component can be displayed in different sizes using the
        <code>size</code> prop.
    </p>
    <ExampleViewer :component="Sizes" :code="SizesCode" />

    <h3 id="customize">Customise</h3>
    <p>
        By default, the component supports a label which is displayed to the
        right of the toggle unless the <code>position</code> prop is set to
        "left".
    </p>
    <ExampleViewer :component="Customise" :code="CustomiseCode" />
</template>

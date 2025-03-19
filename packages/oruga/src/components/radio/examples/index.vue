<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        A radio component will render one selection at a time. Use the
        <code>native-value</code> property to specify the value that will be
        used as the <code>modelValue</code> property when the specific radio is
        checked.
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
</template>

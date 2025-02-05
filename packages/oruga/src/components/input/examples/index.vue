<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import WithIcons from "./with-icons.vue";
import WithIconsCode from "./with-icons.vue?raw";
</script>

<template>
    <div class="vp-doc">
        <h3 id="base">Base</h3>
        <ExampleViewer :component="Base" :code="BaseCode" />

        <h3 id="variants">Variants</h3>
        <p>
            Different styles can be achieved with the <code>variant</code> prop.
        </p>
        <ExampleViewer :component="Variants" :code="VariantsCode" />

        <h3 id="sizes">Sizes</h3>
        <p>
            The component can be displayed in different sizes using the
            <code>size</code> prop.
        </p>
        <ExampleViewer :component="Sizes" :code="SizesCode" />

        <h3 id="icons">With Icons</h3>
        <p>Add an icon to the input to explain its function more visually.</p>
        <ExampleViewer :component="WithIcons" :code="WithIconsCode" />
    </div>
</template>

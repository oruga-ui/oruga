<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import UseTypes from "./use-types.vue";
import UseTypesCode from "./use-types.vue?raw";

import AddCustomButtons from "./add-custom-buttons.vue";
import AddCustomButtonsCode from "./add-custom-buttons.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";
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

        <h3 id="types">Use types</h3>
        <p>
            The <code>type</code> prop in combination with the
            <code>variant</code> prop adds specific icons to the notification.
        </p>
        <ExampleViewer :component="UseTypes" :code="UseTypesCode" />

        <h3 id="custom">Add custom buttons</h3>
        <ExampleViewer
            :component="AddCustomButtons"
            :code="AddCustomButtonsCode" />

        <h3 id="programmatically">Programmatically</h3>
        <p>
            This component provides a programmatic interface that can be
            accessed by the
            <a href="/documentation/composables.html">
                <code>useOruga()</code>
            </a>
            composable.
        </p>
        <ExampleViewer
            :component="Programmatically"
            :code="ProgrammaticallyCode" />
    </div>
</template>

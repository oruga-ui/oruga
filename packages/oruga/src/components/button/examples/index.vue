<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import States from "./states.vue";
import StatesCode from "./states.vue?raw";

import Outlined from "./outlined.vue";
import OutlinedCode from "./outlined.vue?raw";

import Inverted from "./inverted.vue";
import InvertedCode from "./inverted.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Icons from "./icons.vue";
import IconsCode from "./icons.vue?raw";

import Tags from "./tags.vue";
import TagsCode from "./tags.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="styles">States</h3>
    <ExampleViewer :component="States" :code="StatesCode" />

    <h3 id="variants">Variants</h3>
    <p>Different styles can be achieved with the <code>variant</code> prop.</p>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="outlined">Outlined</h3>
    <p>
        Use the <code>outlined</code> prop in combination with the
        <code>variant</code> prop for a lightweight look.
    </p>
    <ExampleViewer :component="Outlined" :code="OutlinedCode" />

    <h3 id="inverted">Inverted</h3>
    <p>
        Use the <code>inverted</code> prop in combination with the
        <code>variant</code> prop for a clickable label look.
    </p>
    <ExampleViewer :component="Inverted" :code="InvertedCode" />

    <h3 id="sizes">Sizes</h3>
    <p>
        The component can be displayed in different sizes using the
        <code>size</code> prop.
    </p>
    <ExampleViewer :component="Sizes" :code="SizesCode" />

    <h3 id="icons">Icons</h3>
    <p>Add an icon to the button to explain its function more visually.</p>
    <ExampleViewer :component="Icons" :code="IconsCode" />

    <h3 id="tags">Tags</h3>
    <p>
        Instead of using the HTML <code>button</code> tag, the HTML tag can be
        customised using the <code>tag</code> prop.
    </p>
    <ExampleViewer :component="Tags" :code="TagsCode" />
</template>

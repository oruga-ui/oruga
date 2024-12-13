<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Styles from "./styles.vue";
import StylesCode from "./styles.vue?raw";

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

    <h3 id="styles">States and Styles</h3>
    <ExampleViewer :component="Styles" :code="StylesCode" />

    <h3 id="outlined">Outlined</h3>
    <ExampleViewer :component="Outlined" :code="OutlinedCode" />

    <h3 id="inverted">Inverted</h3>
    <ExampleViewer :component="Inverted" :code="InvertedCode" />

    <h3 id="sizes">Sizes</h3>
    <ExampleViewer :component="Sizes" :code="SizesCode" />

    <h3 id="icons">Icons</h3>
    <ExampleViewer :component="Icons" :code="IconsCode" />

    <h3 id="tags">Tags</h3>
    <ExampleViewer :component="Tags" :code="TagsCode" />
</template>

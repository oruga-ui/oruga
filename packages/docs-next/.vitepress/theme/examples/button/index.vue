<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Styles from "./styles.vue";
import StylesCode from "./styles.vue?raw";

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

    <h3 id="icons">Icons</h3>
    <ExampleViewer :component="Icons" :code="IconsCode" />

    <h3 id="tags">Tags</h3>
    <ExampleViewer :component="Tags" :code="TagsCode" />
</template>

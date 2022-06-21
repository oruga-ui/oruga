<template>

    <h2>Base</h2>

    <ExampleViewer :component="Base" :code="BaseCode" />

    <h2>States and Styles</h2>

    <ExampleViewer :component="Styles" :code="StylesCode" />

    <h2>Icons</h2>

    <ExampleViewer :component="Icons" :code="IconsCode" />

    <h2>Tags</h2>

    <ExampleViewer :component="Tags" :code="TagsCode" />

</template>

<script setup>
import Base from './base.vue';
import BaseCode from './base.vue?raw';

import Styles from './styles.vue';
import StylesCode from './styles.vue?raw';

import Icons from './icons.vue';
import IconsCode from './icons.vue?raw';

import Tags from './tags.vue';
import TagsCode from './tags.vue?raw';
</script>

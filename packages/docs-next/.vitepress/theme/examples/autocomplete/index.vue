<template>

    <h2>Base</h2>

    <ExampleViewer :component="Base" :code="BaseCode" />

    <h2>Objects array</h2>

    <ExampleViewer :component="ObjectsArray" :code="ObjectsArrayCode" />

    <h2>Groups</h2>

    <ExampleViewer :component="Groups" :code="GroupsCode" />

    <h2>Infinite Scroll</h2>

    <ExampleViewer :component="InfiniteScroll" :code="InfiniteScrollCode" />

</template>

<script setup>
import Base from './base.vue';
import BaseCode from './base.vue?raw';

import ObjectsArray from './objects-array.vue';
import ObjectsArrayCode from './objects-array.vue?raw';

import Groups from './groups.vue';
import GroupsCode from './groups.vue?raw';

import InfiniteScroll from './infinite-scroll.vue';
import InfiniteScrollCode from './infinite-scroll.vue?raw';
</script>


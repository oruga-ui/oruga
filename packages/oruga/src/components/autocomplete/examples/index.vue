<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import ObjectsArray from "./objects-array.vue";
import ObjectsArrayCode from "./objects-array.vue?raw";

import Groups from "./groups.vue";
import GroupsCode from "./groups.vue?raw";

import InfiniteScroll from "./infinite-scroll.vue";
import InfiniteScrollCode from "./infinite-scroll.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="objects">Objects array</h3>
    <ExampleViewer :component="ObjectsArray" :code="ObjectsArrayCode" />

    <h3 id="groups">Groups</h3>
    <ExampleViewer :component="Groups" :code="GroupsCode" />

    <h3 id="infinite">Infinite Scroll</h3>
    <ExampleViewer :component="InfiniteScroll" :code="InfiniteScrollCode" />
</template>

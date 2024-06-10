<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Teleport from "./teleport.vue";
import TeleportCode from "./teleport.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";

import ProgrammaticallyAsync from "./programmatically-async.vue";
import ProgrammaticallyAsyncCode from "./programmatically-async.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="base">Teleport</h3>
    <ExampleViewer :component="Teleport" :code="TeleportCode" />

    <h3 id="programmatically">Programmatically</h3>
    <ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />

    <h3 id="async">Programmatically (with promises and async/await)</h3>
    <ExampleViewer
        :component="ProgrammaticallyAsync"
        :code="ProgrammaticallyAsyncCode" />
</template>

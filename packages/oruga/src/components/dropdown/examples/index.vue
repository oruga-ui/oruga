<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Triggers from "./triggers.vue";
import TriggersCode from "./triggers.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";

import Inline from "./inline.vue";
import InlineCode from "./inline.vue?raw";

import Modal from "./modal.vue";
import ModalCode from "./modal.vue?raw";

import Selectable from "./selectable.vue";
import SelectableCode from "./selectable.vue?raw";

import Scrollable from "./scrollable.vue";
import ScrollableCode from "./scrollable.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="triggers">Triggers</h3>
    <ExampleViewer :component="Triggers" :code="TriggersCode" />

    <h3 id="options">Options</h3>
    <ExampleViewer :component="Options" :code="OptionsCode" />

    <h3 id="selectable">Selectable</h3>
    <ExampleViewer :component="Selectable" :code="SelectableCode" />

    <h3 id="inline">Inline</h3>
    <ExampleViewer :component="Inline" :code="InlineCode" />

    <h3 id="modal">Modal</h3>
    <ExampleViewer :component="Modal" :code="ModalCode" />

    <h3 id="scrollable">Scrollable</h3>
    <ExampleViewer :component="Scrollable" :code="ScrollableCode" />

    <h3 id="position">Position</h3>
    <ExampleViewer :component="Position" :code="PositionCode" />
</template>

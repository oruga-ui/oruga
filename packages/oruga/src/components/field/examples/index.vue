<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Addons from "./addons.vue";
import AddonsCode from "./addons.vue?raw";

import Grouped from "./grouped.vue";
import GroupedCode from "./grouped.vue?raw";

import Horizontal from "./horizontal.vue";
import HorizontalCode from "./horizontal.vue?raw";

import Slots from "./slots.vue";
import SlotsCode from "./slots.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="addons">Addons</h3>
    <div class="vp-doc">
        <p>
            Use the <code>addons</code> prop to attach multiple controls
            together.
        </p>
    </div>
    <ExampleViewer :component="Addons" :code="AddonsCode" />

    <h3 id="grouped">Grouped</h3>
    <div class="vp-doc">
        <p>
            Use the <code>grouped</code> prop to group several controls that
            belong together.
        </p>
    </div>
    <ExampleViewer :component="Grouped" :code="GroupedCode" />

    <h3 id="horizontal">Horizontal</h3>
    <div class="vp-doc">
        <p>
            When the <code>horizontal</code> prop is set, the component will
            align horizontally.
        </p>
    </div>
    <ExampleViewer :component="Horizontal" :code="HorizontalCode" />

    <h3 id="field-slots">Slots</h3>
    <div class="vp-doc">
        <p>
            The <code>label</code> and the <code>message</code> can be
            customised using slots if needed.
        </p>
    </div>
    <ExampleViewer :component="Slots" :code="SlotsCode" />
</template>
